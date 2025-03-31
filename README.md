# Postax

Plataforma para criação e agendamento automático de posts para redes sociais.

## Visão Geral

O Postax é uma ferramenta para criação de conteúdo e agendamento automático de posts para redes sociais. O projeto resolve o problema da complexidade e tempo necessário para manter uma presença digital consistente, especialmente para usuários com baixo conhecimento técnico e empresas de pequeno e médio porte.

## Estado Atual

O projeto está na **Fase 1** de desenvolvimento, com:

- **Sistema de Autenticação**: Registro e login de usuários com validação
- **Landing Page**: Página inicial com design moderno e responsivo
- **Dashboard Básico**: Interface inicial para usuários autenticados
- **Configurações de Usuário**: Gerenciamento de perfil e senha

## Funcionalidades Principais

- **Criação de Conteúdo**: Upload de mídias ou criação assistida
- **Aprovação de Conteúdo**: Sistema de fluxo de trabalho para revisão e aprovação
- **Redes Sociais**: Integração com múltiplas plataformas
- **Grupos de Trabalho**: Gerenciamento hierárquico de equipes

## Stack Tecnológico

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Shadcn/UI
- **Backend**: Next.js API Routes, NextAuth.js
- **Banco de Dados**: MySQL (AWS RDS)
- **Validação**: Zod
- **Armazenamento**: AWS S3

## Design Visual

O Postax adota uma interface moderna e elegante com tema escuro em tons de roxo profundo, destacada por cores vibrantes para elementos interativos e visualizações de dados. A experiência visual é caracterizada por:

- **Tema Escuro**: Fundo em tons de roxo escuro (#13001E) para reduzir fadiga visual
- **Cores Vibrantes**: Azul turquesa (#00E1FF), verde neon, rosa e outras cores de acento
- **Gradientes**: Transições suaves entre cores para elementos de destaque
- **Cartões e Painéis**: Elementos com cantos arredondados e fundos semi-transparentes
- **Tipografia Clara**: Texto em branco/cinza claro sobre fundos escuros para melhor legibilidade

Para detalhes completos sobre o sistema de design, consulte as [Diretrizes de Design](./docs/design-guidelines.md).

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/postax.git
cd postax

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# Executar em desenvolvimento
npm run dev
```

## Configuração do Ambiente

O projeto requer as seguintes variáveis de ambiente:

```
# Ambiente
NODE_ENV=development

# Banco de Dados
DATABASE_URL="mysql://usuario:senha@host:porta/database"

# NextAuth
NEXTAUTH_SECRET="seu-segredo-aqui"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3
AWS_ACCESS_KEY_ID="sua-access-key"
AWS_SECRET_ACCESS_KEY="sua-secret-key"
AWS_REGION="sua-regiao"
AWS_BUCKET_NAME="seu-bucket"
```

## Estrutura do Projeto

A estrutura de diretórios segue um padrão organizado por funcionalidade:

```
postax/
├── src/
│   ├── app/               # Rotas e páginas (Next.js App Router)
│   │   ├── auth/          # Páginas de autenticação (login, registro)
│   │   ├── dashboard/     # Dashboard e páginas protegidas
│   │   └── api/           # Rotas de API
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── ui/            # Componentes de UI básicos
│   │   └── auth/          # Componentes de autenticação
│   ├── lib/               # Bibliotecas e utilitários
│   │   └── auth.ts        # Configuração do NextAuth
│   ├── styles/            # Estilos globais
│   │   └── globals.css    # CSS global com configuração do Tailwind
│   └── validations/       # Schemas Zod para validação de dados
├── public/                # Arquivos estáticos
├── scripts/               # Scripts utilitários
└── docs/                  # Documentação adicional
    └── fase1-sistema-autenticacao.md  # Documentação da Fase 1
```

## Documentação

Para mais informações sobre o projeto, consulte:

- [Projeto Executivo](./PROJETO_EXECUTIVO.md) - Visão geral e arquitetura do projeto
- [Documentação da Fase 1](./docs/fase1-sistema-autenticacao.md) - Detalhes da implementação atual
- [Diretrizes de Design](./docs/design-guidelines.md) - Sistema de design e padrões visuais

## Próximos Passos

1. Desenvolver a funcionalidade de conectar redes sociais
2. Implementar o módulo de criação de conteúdo
3. Desenvolver o sistema de agendamento de posts
4. Implementar a estrutura de permissões para diferentes tipos de usuário

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). 