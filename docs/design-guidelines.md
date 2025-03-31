# Diretrizes de Design do Postax

Este documento descreve os padrões visuais e de interface do Postax, estabelecendo as diretrizes para manter consistência em todo o projeto.

## Paleta de Cores

### Cores Primárias
- **Fundo Principal**: `#13001E` (Roxo escuro quase preto)
- **Fundo Secundário**: `#200030` (Roxo escuro)
- **Destaque**: `#00E1FF` (Azul turquesa)
- **Texto Primário**: `#FFFFFF` (Branco)
- **Texto Secundário**: `#E0E0E0` (Cinza claro)

### Cores de Acento
- **Azul**: `#00E1FF` (Turquesa)
- **Verde**: `#23e25f` (Verde neon)
- **Rosa**: `#ff3586` (Rosa vibrante)
- **Laranja**: `#FF8933` (Laranja)
- **Amarelo**: `#FFE433` (Amarelo)
- **Roxo**: `#8833FF` (Roxo)

### Gradientes
Usar gradientes para elementos de destaque, como gráficos e ícones:
- Gradiente 1: `linear-gradient(90deg, #00E1FF, #8833FF)`
- Gradiente 2: `linear-gradient(90deg, #FF3586, #FF8933)`

## Tipografia

### Família de Fonte
- **Principal**: Sans-serif, preferencialmente Inter ou Montserrat
- **Cabeçalhos**: Peso Bold (700) ou Semi-Bold (600)
- **Corpo**: Peso Regular (400)
- **Destaques**: Peso Medium (500)

### Tamanhos
- **H1 (Título principal)**: 32px
- **H2 (Subtítulo)**: 24px
- **H3 (Cabeçalhos de seção)**: 20px
- **Corpo**: 14-16px
- **Small (Texto secundário)**: 12px

### Estilo
- Texto em maiúsculas para títulos de seções (como "DASHBOARD", "ACTIVITIES")
- Texto regular para conteúdo
- Letras espaçadas para números em destaque

## Componentes de Interface

### Cartões e Painéis
- Fundo escuro: `rgba(24, 3, 36, 0.8)`
- Borda arredondada: `border-radius: 12px`
- Sombra suave: `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)`
- Espaçamento interno: `padding: 24px`

### Botões
- Fundo principal: Gradiente ou cor de acento
- Borda arredondada: `border-radius: 8px`
- Hover: Aumentar brilho em 10%
- Padding: `padding: 8px 16px`

### Inputs e Campos de Formulário
- Fundo escuro: `rgba(30, 4, 45, 0.5)`
- Borda fina: `1px solid rgba(255, 255, 255, 0.1)`
- Foco: Borda em cor de destaque
- Texto em branco/cinza claro

### Navegação
- Menu lateral com fundo mais escuro que o conteúdo principal
- Ícone destacado para item ativo
- Hover: Mudança sutil de opacidade

## Visualização de Dados

### Gráficos
- Usar cores vibrantes da paleta de acento
- Fundo semi-transparente
- Legendas claras e concisas
- Preferir visualizações com animações suaves

### Medidores e Indicadores
- Gráficos circulares com cores vibrantes
- Valores numéricos grandes e destacados
- Usar gradientes para barras de progresso

### Calendário
- Layout grid com destaque para o dia atual
- Cores diferenciadas para dias com eventos
- Números de dias em destaque
- Cabeçalho com mês atual e navegação

## Recursos Visuais

### Ícones
- Estilo linha fina (line icons)
- Preenchimento com cor de acento para estado ativo
- Tamanho consistente: 24px para navegação, 16-20px para ações

### Imagens e Avatares
- Imagens com borda arredondada
- Avatares circulares
- Efeitos de hover sutis

### Notificações
- Indicador numérico em vermelho ou laranja vibrante
- Posição superior direita dos ícones
- Animação suave ao receber nova notificação

## Responsividade

- Design mobile-first
- Breakpoints principais: 
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1280px
- Menu lateral se transforma em menu inferior ou hamburger em telas menores
- Cartões se empilham em coluna única em mobile

## Acessibilidade

- Contraste mínimo de 4.5:1 para texto
- Foco visível em todos os elementos interativos
- Texto alternativo para imagens e ícones
- Confirmação visual para ações importantes

## Exemplo de Implementação

```tsx
// Exemplo de cartão de dados para dashboard
<div className="bg-[#180324] bg-opacity-80 rounded-xl shadow-lg p-6">
  <h3 className="text-[#00E1FF] text-lg uppercase tracking-wider mb-4">Data Text</h3>
  <div className="flex items-center justify-center">
    <div className="relative h-36 w-36">
      {/* Círculo de progresso */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold tracking-wide">1,544</span>
      </div>
    </div>
  </div>
  <p className="text-gray-300 text-sm mt-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
</div>
```

Este documento deve ser consultado durante todo o desenvolvimento para garantir consistência visual em toda a plataforma Postax. 