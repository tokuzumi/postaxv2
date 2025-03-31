import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { PostStatus } from '@/types/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/posts/[id] - Buscar um post específico
export async function GET(
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
    
    console.log(`Buscando post ${postId}`);
    
    const query = "SELECT * FROM posts WHERE id = ?";
    const results = await executeQuery(query, [postId]);
    
    if (!results || !Array.isArray(results) || results.length === 0) {
      return NextResponse.json({ message: 'Post não encontrado' }, { status: 404 });
    }
    
    const row = results[0];
    
    // Verificar se o usuário tem permissão para ver este post
    if (row.user_id !== session.user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }
    
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
    
    let socialNetworks = [];
    if (row.social_networks) {
      try {
        socialNetworks = JSON.parse(row.social_networks);
      } catch (e) {
        console.error("Erro ao parsear social_networks JSON:", e);
      }
    }
    
    const post = {
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
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return NextResponse.json({ message: 'Erro ao buscar post' }, { status: 500 });
  }
}

// PUT /api/posts/[id] - Atualizar um post
export async function PUT(
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
    
    // Verificar se o usuário tem permissão para editar este post
    if (post.user_id !== session.user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }
    
    // Verificar se o post pode ser atualizado
    if (post.status === PostStatus.PUBLISHED) {
      return NextResponse.json({ message: 'Não é possível editar um post já publicado' }, { status: 400 });
    }
    
    // Dados da atualização
    const data = await request.json();
    
    // Construir a query de atualização
    let updateFields = [];
    let values = [];
    
    if (data.title !== undefined) {
      updateFields.push("title = ?");
      values.push(data.title);
    }
    
    if (data.content !== undefined) {
      updateFields.push("content = ?");
      values.push(data.content);
    }
    
    if (data.scheduledDate !== undefined) {
      updateFields.push("scheduled_date = ?");
      values.push(new Date(data.scheduledDate).toISOString().slice(0, 19).replace('T', ' '));
    }
    
    if (data.socialNetworks !== undefined) {
      updateFields.push("social_networks = ?");
      values.push(JSON.stringify(data.socialNetworks));
    }
    
    // Adicionar sempre o updated_at
    const now = new Date();
    updateFields.push("updated_at = ?");
    values.push(now.toISOString().slice(0, 19).replace('T', ' '));
    
    // Adicionar o postId ao final dos valores
    values.push(postId);
    
    if (updateFields.length === 0) {
      return NextResponse.json({ message: 'Nenhum campo para atualizar' }, { status: 400 });
    }
    
    const updateQuery = `UPDATE posts SET ${updateFields.join(", ")} WHERE id = ?`;
    
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
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json({ message: 'Erro ao atualizar post' }, { status: 500 });
  }
}

// DELETE /api/posts/[id] - Excluir um post
export async function DELETE(
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
    
    // Verificar se o usuário tem permissão para excluir este post
    if (post.user_id !== session.user.id) {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }
    
    // Excluir o post
    const deleteQuery = "DELETE FROM posts WHERE id = ?";
    await executeQuery(deleteQuery, [postId]);
    
    return NextResponse.json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return NextResponse.json({ message: 'Erro ao excluir post' }, { status: 500 });
  }
} 