const mysql = require('mysql2/promise');

async function main() {
  try {
    // Criar conexão
    const connection = await mysql.createConnection({
      host: 'postax.cv8wmqowmifu.sa-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'UukP9cFhFjI7lewXqa1A',
      database: 'postax'
    });

    console.log('Conexão ao banco de dados estabelecida');

    // Verificar tabelas existentes
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tabelas existentes:');
    const tableNames = [];
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      tableNames.push(tableName);
      console.log(`- ${tableName}`);
    });

    // Verificar se existe Users ou users
    const hasUsers = tableNames.some(name => name.toLowerCase() === 'users');
    
    // Desativar verificação de chave estrangeira temporariamente
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Remover todas as tabelas exceto Users/users
    for (const tableName of tableNames) {
      if (tableName.toLowerCase() !== 'users') {
        try {
          console.log(`Removendo tabela: ${tableName}`);
          await connection.query(`DROP TABLE ${tableName}`);
        } catch (err) {
          console.error(`Erro ao remover tabela ${tableName}:`, err.message);
        }
      }
    }
    
    // Reativar verificação de chave estrangeira
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Verificar tabelas restantes
    const [remainingTables] = await connection.query('SHOW TABLES');
    console.log('\nTabelas restantes:');
    remainingTables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`- ${tableName}`);
    });
    
    // Caso não exista tabela Users, criar uma
    if (!hasUsers) {
      console.log('\nCriando tabela Users...');
      await connection.query(`
        CREATE TABLE Users (
          id VARCHAR(36) PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          whatsappCountry VARCHAR(5) NOT NULL,
          whatsappDDD VARCHAR(2) NOT NULL,
          whatsappNumber VARCHAR(9) NOT NULL,
          name VARCHAR(255) NOT NULL,
          role ENUM('admin', 'parent', 'child') NOT NULL,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('Tabela Users criada com sucesso!');
    }

    // Fechar conexão
    await connection.end();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

main().catch(console.error); 