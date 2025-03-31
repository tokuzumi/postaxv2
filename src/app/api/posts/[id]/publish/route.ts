import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { PostStatus } from '@/types/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/posts/[id]/publish - Publicar um post agendado
export async function POST(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
    
    const postId = params.id;
    
    if (!postId) {
      return NextResponse.json({ message: 'ID do post não fornecido' }, { status: 400 });
    }
    
    // Verificar se o post existe
    const getQuery = "SELECT * FROM posts WHERE id = ?";
    const results = await executeQuery(getQuery, [postId]);
    
    if (!results || !Array.isArray(results) || results.length === 0) {
      return NextResponse.json({ message: 'Post não encontrado' }, { status: 404 });
    }
    
    const post = results[0];
    
    // Verificar se o usuário tem permissão para publicar este post
    if (post.user_id !== session.user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }
    
    // Verificar se o post pode ser publicado
    if (post.status !== PostStatus.SCHEDULED) {
      return NextResponse.json({ message: 'Este post não está agendado para publicação' }, { status: 400 });
    }
    
    // Simular publicação nas redes sociais (em uma implementação real, isso chamaria as APIs)
    // Em uma implementação real, este código seria substituído por chamadas reais às APIs das redes sociais
    console.log(`Publicando post ${postId} nas redes sociais`);
    
    try {
      const socialNetworks = JSON.parse(post.social_networks);
      console.log(`Redes sociais: ${socialNetworks.join(', ')}`);
      
      // Simulação de publicação bem-sucedida
      console.log('Publicação simulada realizada com sucesso');
    } catch (error) {
      console.error('Erro ao parsear redes sociais:', error);
    }
    
    // Atualizar o status no banco de dados
    const now = new Date();
    const nowFormatted = now.toISOString().slice(0, 19).replace('T', ' ');
    
    const updateQuery = `
      UPDATE posts
      SET status = ?, published_at = ?, updated_at = ?
      WHERE id = ?
    `;
    
    const values = [PostStatus.PUBLISHED, nowFormatted, nowFormatted, postId];
    
    await executeQuery(updateQuery, values);
    
    // Buscar o post atualizado
    const updatedResults = await executeQuery(getQuery, [postId]);
    const updatedPost = updatedResults[0];
    
    // Parse de datas e JSON
    let scheduledDate = null;
    if (updatedPost.scheduled_date) {
      scheduledDate = new Date(updatedPost.scheduled_date).toISOString();
    }
    
    let publishedAt = null;
    if (updatedPost.published_at) {
      publishedAt = new Date(updatedPost.published_at).toISOString();
    }
    
    let media = undefined;
    if (updatedPost.media) {
      try {
        media = JSON.parse(updatedPost.media);
      } catch (e) {
        console.error("Erro ao parsear media JSON:", e);
      }
    }
    
    let socialNetworks = [];
    if (updatedPost.social_networks) {
      try {
        socialNetworks = JSON.parse(updatedPost.social_networks);
      } catch (e) {
        console.error("Erro ao parsear social_networks JSON:", e);
      }
    }
    
    const response = {
      id: updatedPost.id,
      userId: updatedPost.user_id,
      title: updatedPost.title,
      content: updatedPost.content,
      media,
      status: updatedPost.status,
      publishType: updatedPost.publish_type,
      scheduledDate,
      socialNetworks,
      createdAt: new Date(updatedPost.created_at).toISOString(),
      updatedAt: new Date(updatedPost.updated_at).toISOString(),
      publishedAt
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao publicar post:', error);
    return NextResponse.json({ message: 'Erro ao publicar post' }, { status: 500 });
  }
} 