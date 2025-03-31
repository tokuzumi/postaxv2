"use client";

import { v4 as uuidv4 } from 'uuid';
import { SocialNetworkConnection } from '@/types/post';

// Simulação de armazenamento (em produção seria banco de dados)
let connections: SocialNetworkConnection[] = [
  {
    id: uuidv4(),
    networkId: 'facebook',
    name: 'Facebook',
    accessToken: 'mock-token-fb',
    username: 'usuario.teste',
    profilePicture: 'https://via.placeholder.com/150',
    connected: true,
    lastChecked: new Date()
  },
  {
    id: uuidv4(),
    networkId: 'instagram',
    name: 'Instagram',
    accessToken: 'mock-token-ig',
    username: 'usuario.teste',
    profilePicture: 'https://via.placeholder.com/150',
    connected: true,
    lastChecked: new Date()
  },
  {
    id: uuidv4(),
    networkId: 'tiktok',
    name: 'TikTok',
    accessToken: 'mock-token-tk',
    username: 'usuario.teste',
    profilePicture: 'https://via.placeholder.com/150',
    connected: true,
    lastChecked: new Date()
  }
];

export class SocialNetworkService {
  /**
   * Obtém todas as conexões de redes sociais do usuário
   */
  async getUserConnections(userId: string): Promise<SocialNetworkConnection[]> {
    // Em produção, buscar do banco de dados
    return connections;
  }
  
  /**
   * Obtém uma conexão específica
   */
  async getConnection(connectionId: string): Promise<SocialNetworkConnection | null> {
    // Em produção, buscar do banco de dados
    const connection = connections.find(c => c.id === connectionId);
    return connection || null;
  }
  
  /**
   * Conecta uma rede social para o usuário
   */
  async connectNetwork(data: {
    userId: string;
    networkId: string;
    name: string;
    accessToken: string;
    username: string;
    profilePicture: string;
  }): Promise<SocialNetworkConnection> {
    // Em produção, salvar no banco de dados
    const connection: SocialNetworkConnection = {
      id: uuidv4(),
      networkId: data.networkId,
      name: data.name,
      accessToken: data.accessToken,
      username: data.username,
      profilePicture: data.profilePicture,
      connected: true,
      lastChecked: new Date()
    };
    
    connections.push(connection);
    return connection;
  }
  
  /**
   * Desconecta uma rede social
   */
  async disconnectNetwork(connectionId: string): Promise<boolean> {
    // Em produção, atualizar no banco de dados
    const connectionIndex = connections.findIndex(c => c.id === connectionId);
    
    if (connectionIndex === -1) {
      return false;
    }
    
    // Em vez de remover, marcar como desconectado
    connections[connectionIndex] = {
      ...connections[connectionIndex],
      connected: false,
      lastChecked: new Date()
    };
    
    return true;
  }
  
  /**
   * Retorna as redes sociais disponíveis
   */
  getAvailableNetworks() {
    return [
      { id: 'facebook', name: 'Facebook' },
      { id: 'instagram', name: 'Instagram' },
      { id: 'tiktok', name: 'TikTok' }
    ];
  }
}

// Exporta uma instância única do serviço
export const socialNetworkService = new SocialNetworkService(); 