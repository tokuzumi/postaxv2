"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { PostFormData, PublishType } from "@/types/post";
import { postService } from "@/services/postService";
import { socialNetworkService } from "@/services/socialNetworkService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { SocialNetworkSelect, FacebookLogo, InstagramLogo, TikTokLogo } from "@/components/ui/social-network-select";

// Criar um evento personalizado para atualização de posts
export const POST_UPDATED_EVENT = "postax:post_updated";

export function CreatePostForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado do formulário
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [publishType, setPublishType] = useState<PublishType>(PublishType.SCHEDULED);
  const [scheduledDate, setScheduledDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
    return date;
  });
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  
  // Redes sociais disponíveis
  const [availableNetworks, setAvailableNetworks] = useState<Array<{
    id: string;
    name: string;
    logo: React.ReactNode;
    connected: boolean;
  }>>([]);
  
  useEffect(() => {
    // Definir redes sociais disponíveis
    const networks = [
      {
        id: 'facebook',
        name: 'Facebook',
        logo: <FacebookLogo />,
        connected: true
      },
      {
        id: 'instagram',
        name: 'Instagram',
        logo: <InstagramLogo />,
        connected: true
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        logo: <TikTokLogo />,
        connected: true
      }
    ];
    
    setAvailableNetworks(networks);
    
    // Pré-selecionar as primeiras duas redes
    if (networks.length > 0) {
      setSelectedNetworks([networks[0].id, networks.length > 1 ? networks[1].id : ""].filter(Boolean));
    }
  }, []);
  
  const resetForm = () => {
    console.log('CreatePostForm: Iniciando reset do formulário');
    
    // Limpar todos os campos
    setTitle("");
    setContent("");
    setSelectedFile(undefined);
    
    // Resetar data para uma hora no futuro - importante criar uma nova instância
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + 1);
    newDate.setMinutes(0);
    setScheduledDate(new Date(newDate));
    
    // Resetar as redes sociais para o padrão (primeiras duas)
    if (availableNetworks.length > 0) {
      setSelectedNetworks([
        availableNetworks[0].id, 
        availableNetworks.length > 1 ? availableNetworks[1].id : ""
      ].filter(Boolean));
    }
    
    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Garantir que o estado de carregamento seja resetado
    setIsLoading(false);
    
    // Forçar uma limpeza completa do FileUpload
    const fileUploadElement = document.querySelector('[data-testid="file-upload"]');
    if (fileUploadElement) {
      // Disparar evento customizado para reset
      const resetEvent = new CustomEvent('fileUpload:reset');
      fileUploadElement.dispatchEvent(resetEvent);
    }
    
    // Disparar evento global também
    window.dispatchEvent(new CustomEvent('fileUpload:reset'));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      setErrorMessage("Você precisa estar autenticado para criar posts");
      return;
    }
    
    if (selectedNetworks.length === 0) {
      setErrorMessage("Selecione pelo menos uma rede social");
      return;
    }
    
    if (!title.trim()) {
      setErrorMessage("Título é obrigatório");
      return;
    }
    
    if (!content.trim()) {
      setErrorMessage("Descrição é obrigatória");
      return;
    }
    
    if (publishType === PublishType.SCHEDULED && !scheduledDate) {
      setErrorMessage("Data de agendamento é obrigatória");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const postData: PostFormData = {
        title,
        content,
        mediaFile: selectedFile,
        publishType,
        scheduledDate: publishType === PublishType.SCHEDULED ? scheduledDate : undefined,
        socialNetworks: selectedNetworks
      };
      
      const result = await postService.createPost({
        userId: session.user.id,
        ...postData
      });
      
      // Disparar evento para notificar que um novo post foi criado
      window.dispatchEvent(new CustomEvent(POST_UPDATED_EVENT, { detail: result }));
      
      setShowSuccess(true);
      resetForm();
      
      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error("Erro ao criar post:", error);
      setErrorMessage(error instanceof Error ? error.message : "Erro ao criar post");
      setIsLoading(false);
    }
  };
  
  const handleFileSelect = (file: File | undefined) => {
    console.log('CreatePostForm: Arquivo selecionado:', file?.name);
    setSelectedFile(file);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Novo Post</h2>
      
      {errorMessage && (
        <div className="p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200 mb-4">
          {errorMessage}
        </div>
      )}
      
      {showSuccess && (
        <div className="p-3 bg-green-900/50 border border-green-800 rounded-md text-green-200 mb-4">
          Post {publishType === PublishType.IMMEDIATE ? "publicado" : "agendado"} com sucesso!
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Título
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do seu post"
          className="bg-[#2B2D3A] border-gray-700 text-white"
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
          Descrição
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Descrição do seu post"
          rows={4}
          className="w-full rounded-md bg-[#2B2D3A] border border-gray-700 text-white px-3 py-2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Mídia
        </label>
        <FileUpload
          onFileSelect={handleFileSelect}
          onError={setErrorMessage}
          accept="image/*, video/*"
          fileInputRef={fileInputRef}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Tipo de Publicação
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={publishType === PublishType.SCHEDULED}
              onChange={() => setPublishType(PublishType.SCHEDULED)}
              className="mr-2"
            />
            <span>Agendada</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={publishType === PublishType.IMMEDIATE}
              onChange={() => setPublishType(PublishType.IMMEDIATE)}
              className="mr-2"
            />
            <span>Imediata</span>
          </label>
        </div>
      </div>
      
      {publishType === PublishType.SCHEDULED && (
        <DateTimePicker
          value={scheduledDate}
          onChange={setScheduledDate}
        />
      )}
      
      <SocialNetworkSelect
        networks={availableNetworks}
        selectedNetworks={selectedNetworks}
        onSelect={setSelectedNetworks}
      />
      
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white"
        >
          {isLoading ? "Processando..." : (publishType === PublishType.IMMEDIATE ? "Publicar agora" : "Agendar publicação")}
        </Button>
      </div>
    </form>
  );
} 