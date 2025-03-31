const mysql = require('mysql2/promise');
require('dotenv').config();

async function parseEnvFile() {
  const envConfig = {};
  
  if (process.env.DATABASE_URL) {
    envConfig.DATABASE_URL = process.env.DATABASE_URL;
  }
  
  return envConfig;
}

async function main() {
  try {
    const envConfig = await parseEnvFile();
    
    let dbConfig;
    if (envConfig.DATABASE_URL) {
      try {
        const url = new URL(envConfig.DATABASE_URL);
        dbConfig = {
          host: url.hostname,
          port: url.port ? parseInt(url.port) : 3306,
          user: url.username,
          password: url.password,
          database: url.pathname.substring(1),
          ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
          } : undefined
        };
      } catch (error) {
        console.error("Erro ao processar DATABASE_URL:", error);
        throw new Error("Configuração de banco de dados inválida");
      }
    } else {
      dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false
        } : undefined
      };
    }
    
    console.log("Tentando conectar ao banco de dados...");
    console.log("Configuração utilizada:", {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      ssl: dbConfig.ssl ? "Ativado" : "Desativado"
    });
    
    const connection = await mysql.createConnection(dbConfig);
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    
    // Verificar se a tabela users existe
    const [tables] = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [dbConfig.database]);
    
    const tableNames = tables.map(t => t.TABLE_NAME || t.table_name);
    console.log('Tabelas no banco de dados:', tableNames);
    
    // Limpar tabela de usuários
    if (tableNames.includes('users')) {
      // Fazer backup dos usuários antes de excluir (opcional)
      const [users] = await connection.query('SELECT * FROM users');
      console.log(`Fazendo backup de ${users.length} usuários antes de excluir...`);
      
      // Excluir todos os registros
      await connection.query('DELETE FROM users');
      console.log('Todos os usuários foram removidos da tabela users');
      
      // Resetar o auto incremento para 1
      await connection.query('ALTER TABLE users AUTO_INCREMENT = 1');
      console.log('Auto incremento da tabela users foi resetado para 1');
      
      console.log('Operação concluída com sucesso!');
    } else {
      console.log('A tabela users não existe no banco de dados');
    }
    
    // Fechar conexão
    await connection.end();
    console.log('Conexão com o banco de dados fechada');
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

main(); 