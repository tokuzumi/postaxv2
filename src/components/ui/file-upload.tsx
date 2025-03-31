"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "./button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onError?: (message: string) => void;
  accept?: string;
  maxSize?: number; // em bytes
  className?: string;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

export function FileUpload({ 
  onFileSelect, 
  onError, 
  accept = "image/*, video/*", 
  maxSize = 10 * 1024 * 1024, // 10MB default
  className = "",
  fileInputRef: externalRef
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const internalFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = externalRef || internalFileInputRef;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Validar tamanho
    if (file.size > maxSize) {
      onError?.(`Arquivo muito grande. Máximo de ${maxSize / (1024 * 1024)}MB.`);
      return false;
    }

    // Validar tipo
    if (accept !== "*" && !accept.split(",").some(type => {
      if (type.trim() === "image/*" && file.type.startsWith("image/")) return true;
      if (type.trim() === "video/*" && file.type.startsWith("video/")) return true;
      return file.type === type.trim();
    })) {
      onError?.("Tipo de arquivo não suportado");
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    // Gerar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Informar ao componente pai que nenhum arquivo está selecionado
    onFileSelect(undefined as unknown as File);
  };

  return (
    <div className={`
      border-2 border-dashed rounded-lg p-4 transition-colors
      ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}
      ${className}
    `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        className="hidden"
      />
      
      {preview ? (
        <div className="space-y-2">
          <div className="relative rounded-md overflow-hidden">
            {preview.startsWith('data:image') ? (
              <img src={preview} alt={fileName || "Preview"} className="max-h-[200px] w-auto mx-auto" />
            ) : preview.startsWith('data:video') ? (
              <video controls className="max-h-[200px] w-auto mx-auto">
                <source src={preview} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            ) : (
              <div className="p-4 bg-muted text-center">
                {fileName || "Arquivo"}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm truncate max-w-[200px]">{fileName}</span>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleRemoveFile}
              type="button"
            >
              Remover
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Arraste e solte ou
          </p>
          <Button 
            variant="outline" 
            onClick={handleButtonClick}
            type="button"
          >
            Selecione um arquivo
          </Button>
        </div>
      )}
    </div>
  );
}