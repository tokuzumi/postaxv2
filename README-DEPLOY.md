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

## Problemas Conhecidos e Validação

### Sistema de Agendamento de Posts

Durante os testes no ambiente de desenvolvimento, identificamos os seguintes problemas que precisam ser validados após o deploy:

1. **Erro "Failed to fetch" após submissão do formulário de agendamento**:
   - O formulário mostra uma mensagem de sucesso após o envio, mas em seguida ocorre um erro de runtime no Next.js
   - O erro específico é `TypeError: Failed to fetch` aparecendo no console
   - Ocorre quando o sistema tenta fazer requisições após o agendamento do post

2. **Possíveis causas**:
   - Problemas de conexão com o banco de dados MySQL (verifique logs e configurações SSL)
   - Falhas nas chamadas de API para serviços externos como AWS S3
   - Problemas de CORS ao tentar integrar com redes sociais
   - No ambiente de desenvolvimento, o Windows pode estar bloqueando conexões de saída

3. **Validação após deploy**:
   - Testar o formulário de agendamento completo
   - Verificar no console do navegador (F12) se há erros após o submit
   - Examinar os logs do servidor em tempo real durante o teste:
     ```bash
     pm2 logs postax --lines 200
     ```
   - Verificar a resposta da API no Network tab do navegador

4. **Solução temporária em desenvolvimento**:
   - A implementação atual utiliza armazenamento em memória para posts
   - Implementação final deve usar o banco de dados MySQL através do Prisma
   - As integrações com redes sociais estão sendo simuladas

### Próximos Passos

Se o erro persistir no ambiente de produção:

1. Verifique as variáveis de ambiente relacionadas ao banco de dados
2. Confirme se as credenciais do AWS S3 estão corretas
3. Verifique os logs do servidor para erros específicos
4. Considere modificar o arquivo `src/services/postService.ts` para remover chamadas de API externas temporariamente

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