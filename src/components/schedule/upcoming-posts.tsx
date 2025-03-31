"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Post, PostStatus } from "@/types/post";
import { postService } from "@/services/postService";
import { POST_UPDATED_EVENT } from "./create-post-form";

export function UpcomingPosts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Função para carregar posts
  const loadPosts = async () => {
    if (!session?.user?.id) return;
    
    try {
      setIsLoading(true);
      const userPosts = await postService.getUserPosts(session.user.id);
      // Filtrar para mostrar apenas posts agendados
      const scheduledPosts = userPosts.filter(post => post.status === PostStatus.SCHEDULED);
      // Ordenar por data de agendamento (mais próximos primeiro)
      scheduledPosts.sort((a, b) => {
        if (!a.scheduledDate || !b.scheduledDate) return 0;
        return a.scheduledDate.getTime() - b.scheduledDate.getTime();
      });
      
      setPosts(scheduledPosts);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
      setError("Não foi possível carregar os posts agendados");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Carregar posts na montagem do componente
  useEffect(() => {
    loadPosts();
  }, [session]);
  
  // Ouvir o evento de atualização de posts
  useEffect(() => {
    const handlePostUpdated = () => {
      loadPosts();
    };
    
    window.addEventListener(POST_UPDATED_EVENT, handlePostUpdated);
    
    return () => {
      window.removeEventListener(POST_UPDATED_EVENT, handlePostUpdated);
    };
  }, [session]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400">Carregando...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200">
        {error}
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <p className="text-gray-400">Nenhum post agendado</p>
        <p className="text-sm text-gray-500 mt-2">
          Os posts agendados aparecerão aqui
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Data não definida";
    
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    
    return new Intl.DateTimeFormat("pt-BR", options).format(date);
  };
  
  // Extrair a primeira rede social para exibição
  const primaryNetwork = post.socialNetworks[0] || "";
  const networkName = getNetworkName(primaryNetwork);
  const additionalNetworks = post.socialNetworks.length > 1 
    ? `+${post.socialNetworks.length - 1}` 
    : "";
  
  return (
    <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-white truncate">{post.title}</h3>
      </div>
      
      <div className="mt-2 text-sm text-gray-400 line-clamp-2">
        {post.content}
      </div>
      
      <div className="mt-3 flex justify-between items-center text-xs">
        <div className="text-purple-400">
          {networkName} {additionalNetworks && <span className="text-gray-500">{additionalNetworks}</span>}
        </div>
        <div className="text-gray-500">
          {formatDate(post.scheduledDate)}
        </div>
      </div>
    </div>
  );
}

function getNetworkName(networkId: string): string {
  switch (networkId) {
    case 'facebook':
      return 'Facebook';
    case 'instagram':
      return 'Instagram';
    case 'twitter':
      return 'Twitter';
    case 'linkedin':
      return 'LinkedIn';
    default:
      return networkId;
  }
} 