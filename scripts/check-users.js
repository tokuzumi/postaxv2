// Script para verificar usuários no banco de dados
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Função simples para parsear o arquivo .env
function parseEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  const envConfig = {};
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (match) {
        envConfig[match[1]] = match[2];
      }
    });
  }
  
  return envConfig;
}

async function checkUsers() {
  // Carregar variáveis de ambiente
  const env = parseEnvFile();
  
  // Extrair credenciais do DATABASE_URL
  let dbConfig = {};
  
  if (env.DATABASE_URL) {
    try {
      const url = new URL(env.DATABASE_URL);
      dbConfig = {
        host: url.hostname,
        port: url.port || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1),
        ssl: env.NODE_ENV === 'production'
      };
    } catch (error) {
      console.error('Erro ao parsear DATABASE_URL:', error);
    }
  } else {
    // Configuração padrão
    dbConfig = {
      host: env.DB_HOST || 'localhost',
      user: env.DB_USER || 'root',
      password: env.DB_PASSWORD || '',
      database: env.DB_NAME || 'postax',
      ssl: env.DB_SSL === 'true'
    };
  }

  console.log('Tentando conectar ao banco de dados...');
  console.log('Configuração utilizada:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    ssl: dbConfig.ssl ? 'Ativado' : 'Desativado'
  });

  try {
    // Criar conexão
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    // Verificar se a tabela Users existe
    const [tables] = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [dbConfig.database]);

    const tableNames = tables.map(t => t.TABLE_NAME || t.table_name);
    console.log('Tabelas no banco de dados:', tableNames);

    // Verificar usuários
    if (tableNames.includes('Users') || tableNames.includes('users')) {
      const tableName = tableNames.includes('Users') ? 'Users' : 'users';
      console.log(`Verificando usuários na tabela ${tableName}...`);
      
      const [users] = await connection.query(`
        SELECT id, name, email, whatsapp, created_at FROM ${tableName}
      `);

      if (users.length === 0) {
        console.log('Nenhum usuário encontrado no banco de dados.');
      } else {
        console.log(`Total de usuários: ${users.length}`);
        console.log('Lista de usuários:');
        users.forEach((user, index) => {
          console.log(`\nUsuário #${index + 1}:`);
          console.log(`ID: ${user.id}`);
          console.log(`Nome: ${user.name}`);
          console.log(`Email: ${user.email}`);
          console.log(`WhatsApp: ${user.whatsapp || 'Não informado'}`);
          console.log(`Criado em: ${user.created_at}`);
        });
      }
    } else {
      console.log('A tabela de usuários não foi encontrada no banco de dados.');
    }

    // Fechar conexão
    await connection.end();
    console.log('\nConexão com o banco de dados fechada.');
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
  }
}

checkUsers(); 