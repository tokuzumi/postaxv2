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
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`- ${tableName}`);
    });

    // Verificar estrutura da tabela Users (ou users)
    try {
      const [userColumns] = await connection.query('DESCRIBE users');
      console.log('\nEstrutura da tabela "users":');
      userColumns.forEach(col => {
        console.log(`${col.Field} (${col.Type}) ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
      });
    } catch (err) {
      try {
        const [userColumns] = await connection.query('DESCRIBE Users');
        console.log('\nEstrutura da tabela "Users":');
        userColumns.forEach(col => {
          console.log(`${col.Field} (${col.Type}) ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
        });
      } catch (err) {
        console.log('\nNão foi encontrada uma tabela Users ou users no banco de dados');
      }
    }

    // Fechar conexão
    await connection.end();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

main().catch(console.error); 