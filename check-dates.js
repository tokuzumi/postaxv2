const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  let connection;
  try {
    // Configuração do banco de dados
    const dbConfig = {
      host: 'postax.cv8wmqowmifu.sa-east-1.rds.amazonaws.com',
      port: 3306,
      user: 'admin',
      password: 'UukP9cFhFjI7lewXqa1A',
      database: 'postax'
    };

    console.log('Conectando ao banco de dados...');
    console.log('Configuração utilizada:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database
    });

    // Criar conexão
    connection = await mysql.createConnection(dbConfig);
    console.log('Conexão estabelecida com sucesso!');

    // 1. Consultar posts agendados
    console.log("\n--- POSTS AGENDADOS (ANTES) ---");
    const [posts] = await connection.execute(
      'SELECT id, title, scheduled_date FROM posts WHERE scheduled_date IS NOT NULL ORDER BY scheduled_date DESC'
    );

    if (posts.length === 0) {
      console.log('Nenhum post agendado encontrado.');
    } else {
      console.log(`\nPosts agendados (${posts.length} encontrados):`);
      posts.forEach((post, index) => {
        console.log(`\nPost #${index + 1}:`);
        console.log(`ID: ${post.id}`);
        console.log(`Título: ${post.title}`);
        console.log(`Data agendada (MySQL): ${post.scheduled_date}`);
        
        // Exibir componentes da data
        if (post.scheduled_date) {
          const date = new Date(post.scheduled_date);
          console.log(`Data como objeto JS: ${date.toString()}`);
          console.log(`Componentes da data:`);
          console.log(`  Ano: ${date.getFullYear()}`);
          console.log(`  Mês: ${date.getMonth() + 1} (${date.getMonth()} no JavaScript)`);
          console.log(`  Dia: ${date.getDate()}`);
          console.log(`  Hora: ${date.getHours()}`);
          console.log(`  Minutos: ${date.getMinutes()}`);
        }
      });
    }

    // 2. Corrigir as datas (mudar mês de maio para abril)
    console.log("\n--- CORRIGINDO DATAS ---");
    for (const post of posts) {
      const currentDate = new Date(post.scheduled_date);
      
      // Se o mês é maio (4 no JavaScript, 5 no formato de exibição)
      if (currentDate.getMonth() === 4) { // 4 = maio em JavaScript
        // Criar uma nova data com mês de abril (3 no JavaScript, 4 no formato de exibição)
        const correctedDate = new Date(currentDate);
        correctedDate.setMonth(3); // 3 = abril em JavaScript
        
        // Formato para MySQL
        const mysqlDate = correctedDate.toISOString().slice(0, 19).replace('T', ' ');
        
        console.log(`Corrigindo post ${post.id} - "${post.title}"`);
        console.log(`  De: ${post.scheduled_date} (mês ${currentDate.getMonth() + 1})`);
        console.log(`  Para: ${mysqlDate} (mês ${correctedDate.getMonth() + 1})`);
        
        // Atualizar no banco
        await connection.execute(
          'UPDATE posts SET scheduled_date = ? WHERE id = ?',
          [mysqlDate, post.id]
        );
        
        console.log(`  Post atualizado com sucesso!`);
      } else {
        console.log(`Post ${post.id} - "${post.title}" já está com mês correto: ${currentDate.getMonth() + 1}`);
      }
    }

    // 3. Verificar novamente após as correções
    console.log("\n--- POSTS AGENDADOS (DEPOIS) ---");
    const [updatedPosts] = await connection.execute(
      'SELECT id, title, scheduled_date FROM posts WHERE scheduled_date IS NOT NULL ORDER BY scheduled_date DESC'
    );

    if (updatedPosts.length > 0) {
      console.log(`\nPosts agendados após correção (${updatedPosts.length} encontrados):`);
      updatedPosts.forEach((post, index) => {
        console.log(`\nPost #${index + 1}:`);
        console.log(`ID: ${post.id}`);
        console.log(`Título: ${post.title}`);
        console.log(`Data agendada (MySQL): ${post.scheduled_date}`);
        
        const date = new Date(post.scheduled_date);
        console.log(`Data como objeto JS: ${date.toString()}`);
        console.log(`Componentes da data:`);
        console.log(`  Ano: ${date.getFullYear()}`);
        console.log(`  Mês: ${date.getMonth() + 1} (${date.getMonth()} no JavaScript)`);
        console.log(`  Dia: ${date.getDate()}`);
      });
    }

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nConexão com o banco de dados fechada.');
    }
  }
}

main(); 