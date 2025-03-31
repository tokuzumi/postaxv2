// Definição dos tipos para posts e agendamentos

export enum PostStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  FAILED = 'failed'
}

export enum PublishType {
  IMMEDIATE = 'immediate',
  SCHEDULED = 'scheduled'
}

export interface MediaFile {
  id: string;
  url: string;
  s3Key: string;
  type: 'image' | 'video';
  fileName: string;
  createdAt: Date;
}

export interface SocialNetworkConnection {
  id: string;
  networkId: string;  // 'facebook', 'instagram', etc
  name: string;
  accessToken: string;
  username: string;
  profilePicture: string;
  connected: boolean;
  lastChecked: Date;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  media?: MediaFile;
  status: PostStatus;
  publishType: PublishType;
  scheduledDate?: Date;
  socialNetworks: string[];  // IDs das redes sociais
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// Modelo do formulário para criação/edição de post
export interface PostFormData {
  title: string;
  content: string;
  mediaFile?: File;
  publishType: PublishType;
  scheduledDate?: Date;
  socialNetworks: string[];
}

// Interface para o hook de agendamento de posts
export interface UseSchedulePostOptions {
  onSuccess?: (post: Post) => void;
  onError?: (error: Error) => void;
} 