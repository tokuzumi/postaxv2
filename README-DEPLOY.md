# Guia de Deploy para Servidor de Produção

Este documento contém as instruções para implantar o Postax em um servidor EC2 da AWS com Ubuntu.

## Pré-requisitos

- Instância EC2 da AWS (recomendado t2.medium ou superior)
- Ubuntu Server 20.04 LTS ou mais recente
- Banco de dados MySQL configurado (pode ser no RDS da AWS)
- Acesso SSH à instância
- Grupo de segurança configurado para permitir tráfego nas portas 22 (SSH), 80 (HTTP) e 443 (HTTPS)

## Processo de Deploy

### 1. Conectar à instância EC2

```bash
ssh -i sua-chave.pem ubuntu@ip-da-instancia
```

### 2. Clonar o repositório

```bash
git clone https://github.com/tokuzumi/postaxv2.git
cd postaxv2
```

### 3. Executar o script de instalação

```bash
# Tornar o script executável
chmod +x setup-production.sh

# Executar o script
./setup-production.sh
```

O script irá:
- Atualizar o sistema
- Instalar dependências (Node.js, Nginx, etc.)
- Configurar o Nginx como proxy reverso
- Instalar e configurar o PM2 para gerenciamento de processos
- Construir e iniciar a aplicação

### 4. Configurar as variáveis de ambiente

Após a execução do script, você precisa configurar as variáveis de ambiente:

```bash
cd /home/ubuntu/postax
nano .env.production
```

Preencha as variáveis com os valores corretos:

```
# Configurações do Banco de Dados
DATABASE_URL="mysql://usuario:senha@host:3306/banco"

# Configurações de Autenticação
NEXTAUTH_SECRET="string-aleatoria-secreta"
NEXTAUTH_URL="http://seu-ip-ou-dominio"

# AWS S3 (para upload de arquivos)
AWS_ACCESS_KEY_ID="sua-access-key"
AWS_SECRET_ACCESS_KEY="sua-secret-key"
AWS_REGION="sa-east-1"
AWS_S3_BUCKET="nome-do-seu-bucket"
```

### 5. Reiniciar a aplicação

```bash
pm2 reload all
```

## Verificação do Deploy

Após o deploy, você pode verificar o status da aplicação:

```bash
# Verificar status do PM2
pm2 status

# Verificar logs da aplicação
pm2 logs postax

# Verificar status do Nginx
sudo systemctl status nginx
```

A aplicação estará acessível através do IP da instância ou domínio configurado.

## Atualizações Futuras

Para atualizar a aplicação com novas versões:

```bash
# Execute o script de atualização criado
./update-postax.sh
```

## Configuração de Domínio (opcional)

Se você tiver um domínio, atualize a configuração do Nginx:

```bash
sudo nano /etc/nginx/sites-available/postax
```

Altere a linha `server_name _;` para `server_name seudominio.com.br www.seudominio.com.br;`

```bash
sudo systemctl restart nginx
```

## Configuração SSL/HTTPS com Let's Encrypt (opcional)

Para configurar HTTPS:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

Siga as instruções na tela para completar a configuração.

## Solução de Problemas

### Logs da Aplicação
```bash
pm2 logs postax
```

### Logs do Nginx
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Reiniciar Serviços
```bash
pm2 restart all
sudo systemctl restart nginx
``` 