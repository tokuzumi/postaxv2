"use client";

import { v4 as uuidv4 } from 'uuid';
import { Post, PostStatus, PublishType, MediaFile } from '@/types/post';
import { s3Service } from '@/lib/s3';

// Simulação de armazenamento (em produção seria banco de dados)
let posts: Post[] = [];

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
        // Aqui vamos simular que o upload foi feito
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
      const post: Post = {
        id: uuidv4(),
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
      
      // Em produção, salvar no banco de dados
      // Aqui vamos apenas adicionar ao array em memória
      posts.push(post);
      
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
    // Em produção, buscar do banco de dados
    return posts.filter(post => post.userId === userId);
  }
  
  /**
   * Obtém um post específico
   */
  async getPost(postId: string): Promise<Post | null> {
    // Em produção, buscar do banco de dados
    const post = posts.find(p => p.id === postId);
    return post || null;
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
    // Em produção, atualizar no banco de dados
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return null;
    }
    
    // Verificar se o post pode ser atualizado
    if (posts[postIndex].status === PostStatus.PUBLISHED) {
      throw new Error("Não é possível editar um post já publicado");
    }
    
    // Atualizar os campos
    const updatedPost = {
      ...posts[postIndex],
      ...data,
      updatedAt: new Date()
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  }
  
  /**
   * Exclui um post
   */
  async deletePost(postId: string): Promise<boolean> {
    // Em produção, deletar do banco de dados
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== postId);
    
    return posts.length < initialLength;
  }
  
  /**
   * Simula a publicação de um post (em produção, integraria com as APIs das redes sociais)
   */
  async publishPost(postId: string): Promise<Post | null> {
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return null;
    }
    
    // Verificar se o post pode ser publicado
    if (posts[postIndex].status !== PostStatus.SCHEDULED) {
      throw new Error("Este post não está agendado para publicação");
    }
    
    // Simular publicação
    console.log(`Simulando publicação do post ${postId} nas redes sociais:`, 
      posts[postIndex].socialNetworks.join(', '));
    
    // Atualizar status
    const updatedPost = {
      ...posts[postIndex],
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      updatedAt: new Date()
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  }
}

// Exporta uma instância única do serviço
export const postService = new PostService(); 