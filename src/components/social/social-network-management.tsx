"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SocialNetworkConnection } from "@/types/post";
import { socialNetworkService } from "@/services/socialNetworkService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function SocialNetworkManagement() {
  const { data: session } = useSession();
  const [connections, setConnections] = useState<SocialNetworkConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const availableNetworks = socialNetworkService.getAvailableNetworks();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchConnections() {
      if (!session?.user?.id) return;
      
      try {
        setLoading(true);
        const userConnections = await socialNetworkService.getUserConnections(session.user.id);
        setConnections(userConnections);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar conexões:", err);
        setError("Não foi possível carregar suas conexões. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchConnections();
  }, [session]);

  const handleConnect = async (networkId: string, networkName: string) => {
    if (!session?.user?.id) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para conectar uma rede social.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Em um ambiente real, isso redirecionaria para a autenticação OAuth
      // Aqui estamos simulando com dados mock
      const mockData = {
        userId: session.user.id,
        networkId,
        name: networkName,
        accessToken: `mock-token-${networkId}-${Date.now()}`,
        username: session.user.name || "usuario",
        profilePicture: session.user.image || "https://via.placeholder.com/150"
      };

      const newConnection = await socialNetworkService.connectNetwork(mockData);
      setConnections([...connections, newConnection]);
      
      toast({
        title: "Conectado com sucesso",
        description: `Sua conta ${networkName} foi conectada com sucesso.`,
      });
    } catch (err) {
      console.error("Erro ao conectar rede social:", err);
      toast({
        title: "Erro",
        description: "Não foi possível conectar sua conta. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const handleDisconnect = async (connectionId: string, networkName: string) => {
    // Confirmar com o usuário
    if (!confirm(`Tem certeza que deseja desconectar sua conta ${networkName}?`)) {
      return;
    }

    try {
      const success = await socialNetworkService.disconnectNetwork(connectionId);
      
      if (success) {
        // Atualizar o estado localmente
        setConnections(connections.map(conn => 
          conn.id === connectionId ? { ...conn, connected: false } : conn
        ));
        
        toast({
          title: "Desconectado com sucesso",
          description: `Sua conta ${networkName} foi desconectada.`,
        });
      } else {
        throw new Error("Falha ao desconectar");
      }
    } catch (err) {
      console.error("Erro ao desconectar rede social:", err);
      toast({
        title: "Erro",
        description: "Não foi possível desconectar sua conta. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Carregando suas conexões...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-300">
        <h3 className="font-medium text-lg mb-2">Ocorreu um erro</h3>
        <p>{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="destructive"
          className="mt-3"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableNetworks.map((network) => {
          const connection = connections.find(
            c => c.networkId === network.id && c.connected
          );
          
          return (
            <Card key={network.id} className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{network.name}</h3>
                  {getNetworkIcon(network.id)}
                </div>
                
                {connection ? (
                  <div className="mt-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                        <img 
                          src={connection.profilePicture} 
                          alt={connection.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{connection.username}</div>
                        <div className="text-xs text-green-400">Conectado</div>
                      </div>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="w-full mt-2"
                      onClick={() => handleDisconnect(connection.id, network.name)}
                    >
                      Desconectar
                    </Button>
                  </div>
                ) : (
                  <div className="mt-5">
                    <p className="text-gray-400 mb-3 text-sm">
                      Conecte sua conta {network.name} para começar a agendar publicações.
                    </p>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => handleConnect(network.id, network.name)}
                    >
                      Conectar
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function getNetworkIcon(networkId: string) {
  switch (networkId) {
    case 'facebook':
      return (
        <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="h-6 w-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.4 5.4s-.36.64 0 0zm-1.98 2.122A4.308 4.308 0 0015.8 5.82a4.358 4.358 0 01-.22-1.3h-3.35v8.56l-.01 2.42a2.507 2.507 0 01-2.511 2.51c-.98 0-1.85-.56-2.24-1.43a2.504 2.504 0 011.92-3.56v-3.38a5.864 5.864 0 00-3.88 5.52A5.87 5.87 0 0011.37 20a5.87 5.87 0 005.87-5.87v-3.04h1.74a4.288 4.288 0 01-4.36 3.193v-3.19a4.278 4.278 0 004.36-3.193z" />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
  }
} 