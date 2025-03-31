import mysql from "mysql2/promise";

let connection;

// Configurar conexão usando DATABASE_URL
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    const dbConfig = {
      host: url.hostname,
      port: url.port ? parseInt(url.port) : 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : undefined
    };
    
    console.log("Conectando ao banco de dados com:", {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      ssl: dbConfig.ssl ? "Ativado" : "Desativado"
    });
    
    connection = mysql.createPool(dbConfig);
  } catch (error) {
    console.error("Erro ao processar DATABASE_URL:", error);
    throw new Error("Configuração de banco de dados inválida");
  }
} else {
  // Fallback para configuração separada
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : undefined
  };
  
  console.log("Conectando ao banco de dados com configuração secundária:", {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    ssl: dbConfig.ssl ? "Ativado" : "Desativado"
  });
  
  connection = mysql.createPool(dbConfig);
}

export const db = connection; 