/**
 * Definição das cores padrão do Postax
 * Este arquivo define as constantes de cores a serem utilizadas em todo o projeto
 * para garantir consistência visual
 */

export const colors = {
  // Cores primárias
  primary: {
    background: '#13001E',     // Fundo principal (roxo escuro quase preto)
    secondary: '#200030',      // Fundo secundário (roxo escuro)
    accent: '#00E1FF',         // Destaque (azul turquesa)
    text: '#FFFFFF',           // Texto primário (branco)
    textSecondary: '#E0E0E0',  // Texto secundário (cinza claro)
  },
  
  // Cores de acento
  accent: {
    blue: '#00E1FF',           // Azul turquesa
    green: '#23e25f',          // Verde neon
    pink: '#ff3586',           // Rosa vibrante
    orange: '#FF8933',         // Laranja
    yellow: '#FFE433',         // Amarelo
    purple: '#8833FF',         // Roxo
  },
  
  // Cores de estado
  state: {
    success: '#23e25f',        // Verde
    error: '#ff3586',          // Rosa/vermelho
    warning: '#FF8933',        // Laranja
    info: '#00E1FF',           // Azul
  },
  
  // Gradientes
  gradients: {
    blue: 'linear-gradient(90deg, #00E1FF, #8833FF)',  // Gradiente azul para roxo
    pink: 'linear-gradient(90deg, #FF3586, #FF8933)',  // Gradiente rosa para laranja
    multi: 'linear-gradient(90deg, #00E1FF, #FF3586, #FFE433)', // Gradiente multi-cor
  },
  
  // Cores utilitárias
  chart: {
    background: 'rgba(24, 3, 36, 0.8)',      // Fundo para cartões e gráficos
    gridLines: 'rgba(255, 255, 255, 0.1)',   // Linhas de grade para gráficos
    tooltip: 'rgba(13, 0, 30, 0.9)',         // Tooltips em gráficos
  },
  
  // Transparências
  alpha: {
    light: 'rgba(255, 255, 255, 0.1)',       // Branco com baixa opacidade
    medium: 'rgba(255, 255, 255, 0.2)',      // Branco com média opacidade
    dark: 'rgba(0, 0, 0, 0.5)',              // Preto com média opacidade
  },
  
  // Mapear para Tailwind (classes personalizadas)
  tailwind: {
    'bg-primary': '#13001E',
    'bg-secondary': '#200030',
    'bg-card': 'rgba(24, 3, 36, 0.8)',
    'text-primary': '#FFFFFF',
    'text-secondary': '#E0E0E0',
    'text-accent': '#00E1FF',
  }
}; 