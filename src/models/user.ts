/**
 * Modelo User para representação dos usuários do sistema
 */
export enum UserRole {
  ADMIN = 'admin',
  PARENT = 'parent',
  CHILD = 'child'
}

export interface User {
  id: string;
  email: string;
  password: string;
  whatsappCountry: string;
  whatsappDDD: string;
  whatsappNumber: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  whatsapp: string;
  role: UserRole;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export type LoginInput = {
  email: string;
  password: string;
}; 