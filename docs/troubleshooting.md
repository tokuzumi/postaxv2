# Log de Problemas e Soluções - Postax

Este documento registra problemas significativos encontrados durante a implantação e manutenção do projeto Postax, junto com suas soluções. O objetivo é criar um registro histórico que ajude a equipe a resolver problemas semelhantes no futuro.

## Índice

1. [Erro 502 Bad Gateway - Abril 2025](#erro-502-bad-gateway---abril-2025)

---

## Erro 502 Bad Gateway - Abril 2025

### Data do incidente
31 de março de 2025

### Descrição do problema
O servidor de produção apresentou erro 502 Bad Gateway. A investigação revelou que o PM2 estava em um ciclo contínuo de reinicialização, tentando iniciar o aplicativo Next.js sem um build válido.

### Sintomas observados
- Site retornando erro 502 Bad Gateway
- PM2 em loop de reinicialização
- Erro nos logs: "Could not find a production build in the '.next' directory. Try building your app with 'next build' before starting the production server."
- Travamento durante a instalação de dependências

### Causa raiz
A causa do problema foi uma combinação de fatores:
1. O diretório `.next` não existia ou estava corrompido
2. Falha durante a instalação de dependências, possivelmente devido a limitações de recursos do servidor
3. Durante o build, o módulo `critters` (usado para otimização de CSS) não foi encontrado
4. A opção `wait_ready: true` no arquivo de configuração do PM2 estava fazendo com que o processo aguardasse indefinidamente por um sinal que a aplicação não estava emitindo

### Solução implementada
A solução foi implementada em etapas:

1. **Limpeza dos arquivos possivelmente corrompidos**:
   ```bash
   rm -rf .next node_modules package-lock.json
   ```

2. **Reinstalação de dependências com mais recursos alocados**:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm install --no-fund --production=false
   ```

3. **Instalação específica do módulo 'critters'**:
   ```bash
   npm install critters
   ```

4. **Modificação do next.config.js para desativar a otimização de CSS**:
   ```javascript
   experimental: {
     optimizeCss: false,  // Alterado de true para false
     optimizePackageImports: ['@radix-ui/*', 'lucide-react'],
   },
   ```

5. **Modificação do arquivo ecosystem.config.js**:
   Alterada a opção `wait_ready: true` para `wait_ready: false` para que o PM2 não ficasse esperando indefinidamente pelo sinal "ready".

6. **Reconstrução da aplicação e reinício dos serviços**:
   ```bash
   npx prisma generate
   npm run build
   pm2 kill
   pm2 start ecosystem.config.js
   pm2 save
   sudo systemctl restart nginx
   ```

### Lições aprendidas
1. **Configuração do PM2**: A opção `wait_ready` deve ser usada com cuidado, garantindo que a aplicação emita o sinal apropriado ou seja removida/desativada.
2. **Alocação de recursos**: Para builds em produção, é importante aumentar o limite de memória do Node.js usando a variável de ambiente `NODE_OPTIONS`.
3. **Modularização de funcionalidades experimentais**: Recursos experimentais como `optimizeCss` devem ser facilmente desativados durante problemas.
4. **Monitoramento proativo**: Implementar monitoramento para detectar loops de reinicialização do PM2 e notificar a equipe antes que os usuários sejam afetados.

### Prevenção futura
Para evitar problemas semelhantes no futuro:

1. Criar um script de verificação de integridade (`health-check.sh`) que valide periodicamente:
   - Existência do diretório `.next`
   - Estado dos processos PM2
   - Resposta HTTP do servidor Nginx

2. Atualizar o arquivo `ecosystem.config.js` padrão com configurações mais seguras:
   ```javascript
   wait_ready: false,
   max_restarts: 10,
   restart_delay: 4000,
   exp_backoff_restart_delay: 100
   ```

3. Adicionar à documentação de deploy informações sobre a desativação segura de funcionalidades experimentais durante problemas.

### Documentado por
Equipe de Desenvolvimento Postax
