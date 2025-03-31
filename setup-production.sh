#!/bin/bash

# Script de instalação para o ambiente de produção do Postax
# Para uso em uma instância EC2 Ubuntu

# Configurações
APP_NAME="postax"
REPO_URL="https://github.com/tokuzumi/postaxv2.git"
APP_DIR="/home/ubuntu/$APP_NAME"
NODE_VERSION="20.11.1"  # Versão do Node compatível com Next.js 14
PM2_INSTANCES=2         # Número de instâncias PM2 para balanceamento de carga

# Função para exibir mensagens de progresso
log() {
  echo "$(date +'%Y-%m-%d %H:%M:%S') - $1"
}

# Atualizar sistema
log "Atualizando pacotes do sistema..."
sudo apt-get update && sudo apt-get upgrade -y

# Instalar dependências essenciais
log "Instalando dependências essenciais..."
sudo apt-get install -y build-essential curl git nginx

# Instalar Node.js via NVM (Node Version Manager)
log "Instalando NVM e Node.js $NODE_VERSION..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Carregar NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

# Instalar Node.js na versão específica
nvm install $NODE_VERSION
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION

# Instalar PM2 globalmente para gerenciamento de processos
log "Instalando PM2..."
npm install -g pm2

# Clonar o repositório
log "Clonando o repositório $REPO_URL..."
if [ -d "$APP_DIR" ]; then
  log "O diretório $APP_DIR já existe. Atualizando..."
  cd $APP_DIR
  git pull origin master
else
  git clone $REPO_URL $APP_DIR
  cd $APP_DIR
fi

# Instalar dependências do projeto
log "Instalando dependências do projeto..."
npm ci

# Gerar arquivos Prisma (se aplicável)
log "Gerando arquivos Prisma..."
npx prisma generate

# Construir a aplicação
log "Construindo a aplicação Next.js..."
npm run build

# Configurar PM2 para execução persistente
log "Configurando PM2 para execução persistente..."
cat > ecosystem.config.js << 'EOL'
module.exports = {
  apps: [{
    name: 'postax',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: process.env.PM2_INSTANCES || 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOL

# Iniciar a aplicação com PM2
log "Iniciando a aplicação com PM2..."
PM2_INSTANCES=$PM2_INSTANCES pm2 start ecosystem.config.js
pm2 save

# Configurar PM2 para iniciar automaticamente na inicialização do sistema
log "Configurando PM2 para iniciar automaticamente..."
pm2 startup
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v$NODE_VERSION/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Configurar Nginx como proxy reverso
log "Configurando Nginx como proxy reverso..."
sudo tee /etc/nginx/sites-available/postax << 'EOL'
server {
    listen 80;
    server_name _;  # Configurar com o domínio real em produção

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Configuração para permitir uploads de arquivos grandes
    client_max_body_size 50M;
}
EOL

# Ativar o site e reiniciar o Nginx
log "Ativando configuração do Nginx..."
sudo ln -sf /etc/nginx/sites-available/postax /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

# Configurar firewall (se necessário)
log "Configurando firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable

# Criar script de atualização
log "Criando script de atualização..."
cat > /home/ubuntu/update-postax.sh << 'EOL'
#!/bin/bash
cd /home/ubuntu/postax
git pull origin master
npm ci
npx prisma generate
npm run build
pm2 reload all
EOL

chmod +x /home/ubuntu/update-postax.sh

log "==================================================="
log "Instalação concluída! A aplicação Postax está rodando."
log "Acesse através do IP ou domínio do servidor."
log "Para atualizar a aplicação, execute: ./update-postax.sh"
log "===================================================" 