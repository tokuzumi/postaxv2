"use client";

import { v4 as uuidv4 } from 'uuid';
import { Post, PostStatus, PublishType, MediaFile } from '@/types/post';
import { s3Service } from '@/lib/s3';

export class PostService {
  /**
   * Cria um novo post
   */
  async createPost(data: {
    userId: string;
    title: string;
    content: string;
    mediaFile?: File;
    publishType: PublishType;
    scheduledDate?: Date;
    socialNetworks: string[];
  }): Promise<Post> {
    try {
      // Upload da mídia se existir
      let media: MediaFile | undefined;
      
      if (data.mediaFile) {
        // Validar arquivo
        const validation = s3Service.validateFile(data.mediaFile);
        if (!validation.valid) {
          throw new Error(validation.error);
        }
        
        // Obter URL pré-assinada
        const presignedUrl = await s3Service.getPresignedUrl(
          data.mediaFile.name,
          data.mediaFile.type
        );
        
        if (!presignedUrl.success || !presignedUrl.key) {
          throw new Error("Falha ao gerar URL para upload");
        }
        
        // Em produção, faria o upload para o S3 aqui
        console.log(`Upload simulado da mídia: ${data.mediaFile.name}`);
        
        const mediaType = data.mediaFile.type.startsWith('image/') ? 'image' : 'video';
        
        media = {
          id: uuidv4(),
          url: s3Service.getPublicUrl(presignedUrl.key),
          s3Key: presignedUrl.key,
          type: mediaType,
          fileName: data.mediaFile.name,
          createdAt: new Date()
        };
      }
      
      // Definir status com base no tipo de publicação
      const status = data.publishType === PublishType.IMMEDIATE
        ? PostStatus.PUBLISHED
        : PostStatus.SCHEDULED;
      
      // Criar o post
      const now = new Date();
      const postId = uuidv4();
      
      // Preparar dados para enviar à API
      const postData = {
        id: postId,
        userId: data.userId,
        title: data.title,
        content: data.content,
        media,
        status,
        publishType: data.publishType,
        scheduledDate: data.publishType === PublishType.SCHEDULED ? data.scheduledDate : undefined,
        socialNetworks: data.socialNetworks,
        createdAt: now,
        updatedAt: now,
        publishedAt: data.publishType === PublishType.IMMEDIATE ? now : undefined
      };
      
      // Enviar para a API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar post');
      }
      
      const post = await response.json();
      console.log(`Post ${data.publishType === PublishType.IMMEDIATE ? 'publicado' : 'agendado'} com sucesso:`, post);
      
      return post;
    } catch (error) {
      console.error("Erro ao criar post:", error);
      throw error;
    }
  }
  
  /**
   * Obtém todos os posts do usuário
   */
  async getUserPosts(userId: string): Promise<Post[]> {
    try {
      console.log(`Buscando posts do usuário ${userId} via API`);
      
      const response = await fetch(`/api/posts?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar posts');
      }
      
      const posts = await response.json();
      
      // Converter as strings de data para objetos Date
      return posts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        scheduledDate: post.scheduledDate ? new Date(post.scheduledDate) : undefined,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
      }));
    } catch (error) {
      console.error("Erro ao buscar posts do usuário:", error);
      return [];
    }
  }
  
  /**
   * Obtém um post específico
   */
  async getPost(postId: string): Promise<Post | null> {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Erro ao buscar post');
      }
      
      const post = await response.json();
      
      // Converter as strings de data para objetos Date
      return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        scheduledDate: post.scheduledDate ? new Date(post.scheduledDate) : undefined,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
      };
    } catch (error) {
      console.error("Erro ao buscar post:", error);
      return null;
    }
  }
  
  /**
   * Atualiza um post
   */
  async updatePost(postId: string, data: {
    title?: string;
    content?: string;
    scheduledDate?: Date;
    socialNetworks?: string[];
  }): Promise<Post | null> {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar post');
      }
      
      const post = await response.json();
      
      // Converter as strings de data para objetos Date
      return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        scheduledDate: post.scheduledDate ? new Date(post.scheduledDate) : undefined,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
      };
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      throw error;
    }
  }
  
  /**
   * Exclui um post
   */
  async deletePost(postId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Erro ao excluir post');
      }
      
      return true;
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      return false;
    }
  }
  
  /**
   * Publica um post agendado
   */
  async publishPost(postId: string): Promise<Post | null> {
    try {
      const response = await fetch(`/api/posts/${postId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao publicar post');
      }
      
      const post = await response.json();
      
      // Converter as strings de data para objetos Date
      return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        scheduledDate: post.scheduledDate ? new Date(post.scheduledDate) : undefined,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
      };
    } catch (error) {
      console.error("Erro ao publicar post:", error);
      throw error;
    }
  }
}

// Exporta uma instância única do serviço
export const postService = new PostService(); 