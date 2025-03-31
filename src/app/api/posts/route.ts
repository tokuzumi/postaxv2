import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { PostStatus, PublishType } from '@/types/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/posts - Listar posts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Se não houver userId ou não for o mesmo do usuário logado
    if (!userId || userId !== session.user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }
    
    console.log(`Buscando posts do usuário ${userId} no banco de dados`);
    
    const query = `
      SELECT * FROM posts 
      WHERE user_id = ? 
      ORDER BY 
        CASE 
          WHEN scheduled_date IS NOT NULL THEN scheduled_date 
          ELSE created_at 
        END DESC
    `;
    
    const results = await executeQuery(query, [userId]);
    
    if (!results || !Array.isArray(results)) {
      console.log('Nenhum resultado encontrado ou formato inválido');
      return NextResponse.json([]);
    }
    
    console.log(`Encontrados ${results.length} posts para o usuário`);
    
    // Processar os resultados para o formato adequado para o cliente
    const posts = results.map((row: any) => {
      // Parse de datas e JSON
      let scheduledDate = null;
      if (row.scheduled_date) {
        scheduledDate = new Date(row.scheduled_date).toISOString();
      }
      
      let publishedAt = null;
      if (row.published_at) {
        publishedAt = new Date(row.published_at).toISOString();
      }
      
      let media = undefined;
      if (row.media) {
        try {
          media = JSON.parse(row.media);
        } catch (e) {
          console.error("Erro ao parsear media JSON:", e);
        }
      }
      
      // Converter social_networks de JSON para array se necessário
      let socialNetworks = [];
      if (row.social_networks) {
        try {
          // Se for uma string que contém vírgulas, dividir em array
          if (typeof row.social_networks === 'string' && row.social_networks.includes(',')) {
            socialNetworks = row.social_networks.split(',').map((n: string) => n.trim());
          } else {
            // Tentar fazer parse como JSON
            const parsed = JSON.parse(row.social_networks);
            socialNetworks = Array.isArray(parsed) ? parsed : [row.social_networks];
          }
        } catch (e) {
          console.error("Erro ao processar social_networks:", e);
          // Se falhar, usar a string como um único item
          socialNetworks = [row.social_networks];
        }
      }
      
      // Garantir que socialNetworks seja sempre um array
      if (!Array.isArray(socialNetworks)) {
        socialNetworks = [];
      }
      
      return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        content: row.content,
        media,
        status: row.status,
        publishType: row.publish_type,
        scheduledDate,
        socialNetworks,
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
        publishedAt
      };
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    return NextResponse.json({ message: 'Erro ao listar posts' }, { status: 500 });
  }
}

// POST /api/posts - Criar novo post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
    
    const postData = await request.json();
    
    // Validar os campos obrigatórios
    if (!postData.title || !postData.content || !postData.socialNetworks) {
      return NextResponse.json({ message: 'Campos obrigatórios não informados' }, { status: 400 });
    }
    
    // Verificar se o usuário é o mesmo da sessão
    if (postData.userId !== session.user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }
    
    // Preparar os dados para o banco
    let mediaJson = null;
    if (postData.media) {
      mediaJson = JSON.stringify(postData.media);
    }
    
    // Garantir que socialNetworks seja sempre um array e convertê-lo para JSON
    const socialNetworksArray = Array.isArray(postData.socialNetworks) 
      ? postData.socialNetworks 
      : [postData.socialNetworks];
    const socialNetworksJson = JSON.stringify(socialNetworksArray);
    
    // Preparar valores da data agendada
    let scheduledDate = null;
    if (postData.publishType === PublishType.SCHEDULED && postData.scheduledDate) {
      // Corrigir o problema de formatação da data - debugar
      const scheduledDateObj = new Date(postData.scheduledDate);
      console.log('Data original recebida:', postData.scheduledDate);
      console.log('Data convertida para objeto Date:', scheduledDateObj);
      
      // Formatar cada componente da data manualmente para evitar problemas de fuso horário
      const year = scheduledDateObj.getFullYear();
      const month = scheduledDateObj.getMonth() + 1; // +1 porque getMonth() retorna 0-11
      const day = scheduledDateObj.getDate();
      const hours = scheduledDateObj.getHours();
      const minutes = scheduledDateObj.getMinutes();
      const seconds = scheduledDateObj.getSeconds();
      
      console.log('Componentes da data:', { year, month, day, hours, minutes, seconds });
      
      // Montar string de data no formato MySQL, garantindo que cada parte tenha 2 dígitos
      // Formato: YYYY-MM-DD HH:MM:SS
      scheduledDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      console.log('Data formatada para MySQL:', scheduledDate);
      
      // Validar se a data está no futuro
      const now = new Date();
      if (scheduledDateObj <= now) {
        return NextResponse.json({ message: 'A data de agendamento deve ser no futuro' }, { status: 400 });
      }
    }
    
    // Preparar valores da data de publicação
    let publishedAt = null;
    if (postData.publishType === PublishType.IMMEDIATE) {
      publishedAt = new Date(postData.publishedAt || postData.createdAt).toISOString().slice(0, 19).replace('T', ' ');
    }
    
    // Datas de criação e atualização
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // Inserir no banco de dados
    const query = `
      INSERT INTO posts (
        id, user_id, title, content, media, status, publish_type, 
        scheduled_date, social_networks, created_at, updated_at, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      postData.id,
      postData.userId,
      postData.title,
      postData.content,
      mediaJson,
      postData.status,
      postData.publishType,
      scheduledDate,
      socialNetworksJson,
      now,
      now,
      publishedAt
    ];
    
    await executeQuery(query, values);
    
    // Formatar as datas para o cliente
    if (postData.scheduledDate) {
      postData.scheduledDate = new Date(postData.scheduledDate).toISOString();
    }
    
    if (postData.createdAt) {
      postData.createdAt = new Date(postData.createdAt).toISOString();
    }
    
    if (postData.updatedAt) {
      postData.updatedAt = new Date(postData.updatedAt).toISOString();
    }
    
    if (postData.publishedAt) {
      postData.publishedAt = new Date(postData.publishedAt).toISOString();
    }
    
    console.log(`Post ${postData.id} criado com sucesso`);
    
    return NextResponse.json(postData, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json({ message: 'Erro ao criar post' }, { status: 500 });
  }
} 