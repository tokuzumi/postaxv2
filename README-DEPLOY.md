# Guia de Deploy para Servidor de Produção

Este documento contém as instruções para implantar o Postax em um servidor EC2 da AWS com Ubuntu.

## Status Atual do Deploy

- **Servidor**: EC2 na AWS (54.207.82.244)
- **Domínio**: postax.com.br
- **Acessível via**: http://54.207.82.244 e http://postax.com.br
- **Ambiente**: Produção

## Progresso do Deploy

- ✅ Instalação de dependências do sistema
- ✅ Configuração do Node.js via NVM
- ✅ Clonagem do repositório
- ✅ Instalação das dependências do projeto
- ✅ Build da aplicação
- ✅ Configuração do PM2
- ✅ Configuração do Nginx
- ✅ Configuração de domínio
- ⬜ Configuração HTTPS/SSL
- ⬜ Configuração do banco de dados
- ⬜ Testes de integração

## Pré-requisitos

- Instância EC2 da AWS (recomendado t2.medium ou superior)
- Ubuntu Server 20.04 LTS ou mais recente
- Banco de dados MySQL configurado (pode ser no RDS da AWS)
- Acesso SSH à instância
- Grupo de segurança configurado para permitir tráfego nas portas 22 (SSH), 80 (HTTP) e 443 (HTTPS)

## Processo de Deploy

### 1. Conectar à instância EC2

```bash
ssh -i sua-chave.pem ubuntu@54.207.82.244
# ou
ssh -i sua-chave.pem ubuntu@ec2-54-207-82-244.sa-east-1.compute.amazonaws.com
```

### 2. Clonar o repositório

```bash
mkdir -p /home/ubuntu/postax
cd /home/ubuntu/postax
git clone https://github.com/tokuzumi/postaxv2.git .
```

### 3. Instalar dependências

```bash
# Atualizar sistema
sudo apt-get update
sudo apt-get upgrade -y

# Instalar dependências essenciais
sudo apt-get install -y build-essential curl git nginx

# Instalar NVM e Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20.11.1
nvm use 20.11.1
nvm alias default 20.11.1

# Instalar PM2
npm install -g pm2
```

### 4. Configurar variáveis de ambiente

```bash
cd /home/ubuntu/postax
nano .env.production
```

Conteúdo atual do arquivo .env.production:

```
# Configurações do Banco de Dados
DATABASE_URL="mysql://admin:Postax2024@postax.cv8wmqowmifu.sa-east-1.rds.amazonaws.com:3306/postax"

# Configurações de Autenticação
NEXTAUTH_SECRET="postax-production-server-secret-key-2024"
NEXTAUTH_URL="http://postax.com.br"  # Atualizado para o domínio

# AWS S3 (para upload de arquivos)
AWS_ACCESS_KEY_ID="AKIA4JGWEPXYJGVCQXBE"
AWS_SECRET_ACCESS_KEY="senha-secreta-aws"
AWS_REGION="sa-east-1"
AWS_S3_BUCKET="postax-media"

# Configurações da Aplicação
NODE_ENV="production"
```

### 5. Construir e iniciar a aplicação

```bash
# Gerar arquivos Prisma
cd /home/ubuntu/postax
npx prisma generate

# Construir a aplicação
npm run build

# Configurar PM2
cat > ecosystem.config.js << 'EOL'
module.exports = {
  apps: [{
    name: 'postax',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 2,
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
pm2 start ecosystem.config.js
pm2 save

# Configurar PM2 para iniciar automaticamente
pm2 startup
# Execute o comando sugerido pelo PM2
```

### 6. Configuração do Nginx

```bash
# Criar configuração do Nginx
sudo nano /etc/nginx/sites-available/postax
```

Conteúdo atual do arquivo de configuração:

```
server {
    listen 80;
    server_name postax.com.br www.postax.com.br;

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
```

```bash
# Ativar o site e reiniciar o Nginx
sudo ln -sf /etc/nginx/sites-available/postax /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

## Próximos Passos para o Desenvolvedor

### 1. Configurar HTTPS com Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d postax.com.br -d www.postax.com.br
```

Após a instalação do certificado, atualize o NEXTAUTH_URL em .env.production:

```
NEXTAUTH_URL="https://postax.com.br"
```

E reinicie a aplicação:

```bash
pm2 reload all
```

### 2. Finalizar a integração com o banco de dados

Atualmente, a aplicação está usando armazenamento em memória para os posts. Para completar a implementação:

1. Verifique a conexão com o RDS MySQL:
```bash
mysql -h postax.cv8wmqowmifu.sa-east-1.rds.amazonaws.com -u admin -p
```

2. Execute as migrações do Prisma:
```bash
cd /home/ubuntu/postax
npx prisma migrate deploy
```

3. Modifique os serviços para usar o banco de dados real em vez de armazenamento em memória:
- Edite os métodos em `src/services/postService.ts` para usar o Prisma
- Implemente consultas ao banco de dados nos métodos CRUD

### 3. Testar o sistema de agendamento

Teste o fluxo completo de agendamento de posts:

1. Acesse postax.com.br e faça login
2. Crie um novo post e agende-o
3. Verifique nos logs se a operação foi concluída sem erros:
```bash
pm2 logs postax --lines 100
```

Se ocorrer o erro "Failed to fetch", investigue:
- Verifique a conexão com o banco de dados nos logs
- Verifique as permissões do S3
- Monitore as requisições de rede no console do navegador

### 4. Criar script de backup

Configure backups regulares do banco de dados e arquivos de configuração:

```bash
sudo nano /home/ubuntu/backup-postax.sh
```

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d%H%M)
BACKUP_DIR="/home/ubuntu/backups"

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Backup do banco de dados
mysqldump -h postax.cv8wmqowmifu.sa-east-1.rds.amazonaws.com -u admin -p'Postax2024' postax > $BACKUP_DIR/db-$TIMESTAMP.sql

# Backup de arquivos de configuração
cp /home/ubuntu/postax/.env.production $BACKUP_DIR/env-$TIMESTAMP.backup
cp /etc/nginx/sites-available/postax $BACKUP_DIR/nginx-$TIMESTAMP.backup

# Compactar tudo
tar -czf $BACKUP_DIR/postax-backup-$TIMESTAMP.tar.gz $BACKUP_DIR/db-$TIMESTAMP.sql $BACKUP_DIR/env-$TIMESTAMP.backup $BACKUP_DIR/nginx-$TIMESTAMP.backup

# Limpar arquivos temporários
rm $BACKUP_DIR/db-$TIMESTAMP.sql $BACKUP_DIR/env-$TIMESTAMP.backup $BACKUP_DIR/nginx-$TIMESTAMP.backup

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "postax-backup-*.tar.gz" -type f -mtime +7 -delete
```

```bash
chmod +x /home/ubuntu/backup-postax.sh
```

Configure um cron job para executar o backup diariamente:

```bash
crontab -e
```

Adicione a linha:
```
0 2 * * * /home/ubuntu/backup-postax.sh
```

### 5. Monitoramento e Logs

Para monitorar a aplicação:

```bash
# Status do PM2
pm2 status

# Monitoramento em tempo real
pm2 monit

# Logs do aplicativo
pm2 logs postax

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Solução de Problemas

### Problemas com o banco de dados
```bash
# Verificar status da conexão
mysql -h postax.cv8wmqowmifu.sa-east-1.rds.amazonaws.com -u admin -p -e "SHOW STATUS LIKE 'Conn%';"

# Verificar regras de segurança
aws ec2 describe-security-groups --group-ids sg-XXXX
```

### Problemas com Nginx
```bash
sudo nginx -t
sudo systemctl status nginx
```

### Reiniciar serviços
```bash
pm2 restart all
sudo systemctl restart nginx
```

## Atualização da Aplicação

Para atualizar o código da aplicação:

```bash
cd /home/ubuntu/postax
git pull origin master
npm ci
npx prisma generate
npm run build
pm2 reload all
```

---

Última atualização: Abril 2025
Autor: Time de Desenvolvimento Postax 