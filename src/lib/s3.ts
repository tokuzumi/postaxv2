// Este arquivo implementa a integração com o AWS S3 para upload de arquivos

// Simulação da configuração do S3 (em produção, usar AWS SDK)
interface S3Config {
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

// Simulação de resposta de upload
interface UploadResponse {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

/**
 * Em um ambiente de produção, este serviço usaria o AWS SDK.
 * Para fins de demonstração, estamos simulando a API do S3.
 */
export class S3Service {
  private config: S3Config;
  
  constructor() {
    // Em produção, esses valores viriam de variáveis de ambiente
    this.config = {
      region: process.env.AWS_REGION || 'sa-east-1',
      bucket: process.env.S3_BUCKET || 'postax-media',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock-key',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'mock-secret',
    };
  }
  
  /**
   * Gera uma URL pré-assinada para upload direto para o S3
   */
  async getPresignedUrl(fileName: string, fileType: string): Promise<UploadResponse> {
    try {
      // Em produção, usaria AWS SDK para gerar URL pré-assinada
      console.log(`Gerando URL pré-assinada para: ${fileName} (${fileType})`);
      
      // Gera um ID único baseado em timestamp e nome do arquivo
      const timestamp = Date.now();
      const key = `uploads/${timestamp}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      // URL simulada
      const url = `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}`;
      
      return {
        success: true,
        url: url,
        key: key
      };
    } catch (error) {
      console.error("Erro ao gerar URL pré-assinada:", error);
      return {
        success: false,
        error: "Não foi possível gerar a URL para upload"
      };
    }
  }
  
  /**
   * Retorna a URL pública de um arquivo no S3
   */
  getPublicUrl(key: string): string {
    return `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}`;
  }
  
  /**
   * Valida um arquivo antes do upload
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    // Verificar tamanho máximo (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, error: "Arquivo muito grande. Máximo de 10MB." };
    }
    
    // Verificar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: "Tipo de arquivo não suportado. Apenas JPEG, PNG, GIF e MP4 são permitidos." 
      };
    }
    
    return { valid: true };
  }
}

// Exporta uma instância única do serviço
export const s3Service = new S3Service(); 