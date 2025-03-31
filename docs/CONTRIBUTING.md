# Guia de Contribuição

Obrigado pelo interesse em contribuir com o projeto Postax! Este documento fornece diretrizes e orientações para contribuir efetivamente com o desenvolvimento.

## Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js 20.x ou superior
- MySQL 8.0 ou superior
- Git

### Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/postax.git
   cd postax
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
   Edite o arquivo `.env.local` com suas configurações locais.

4. Inicialize o banco de dados:
   ```bash
   npm run prisma:migrate
   ```

5. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Processo de Desenvolvimento

### Branches
- `main`: Branch principal, contém código estável e pronto para produção
- `develop`: Branch de desenvolvimento, para integração de novas features
- `feature/nome-da-feature`: Branches para desenvolvimento de features específicas
- `fix/nome-do-fix`: Branches para correção de bugs

### Workflow de Contribuição
1. Crie uma branch a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nova-funcionalidade
   ```

2. Desenvolva a funcionalidade ou correção

3. Certifique-se de que o código atende aos padrões:
   ```bash
   npm run lint
   ```

4. Faça commit das alterações com mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona funcionalidade X"
   ```

5. Envie sua branch para o repositório:
   ```bash
   git push origin feature/nova-funcionalidade
   ```

6. Abra um Pull Request para a branch `develop`

### Convenções de Commit
Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Alterações de formatação que não afetam o código
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Alterações no processo de build ou ferramentas auxiliares

### Estilo de Código
- Use TypeScript com tipagem estrita
- Siga as convenções de nomenclatura definidas no Projeto Executivo
- Componentes React devem ser funcionais com hooks
- Use classes TailwindCSS para estilização

## Documentação

### Documentação de Código
- Use JSDoc para documentar funções, classes e interfaces
- Adicione comentários para lógica complexa

### Documentação de Funcionalidades
Para cada nova funcionalidade, atualize:
- Documento da fase correspondente em `/docs/fase{X}.md`
- README.md quando apropriado
- Adicione exemplos de uso quando necessário

## Testes

### Tipos de Testes
- **Unitários**: Teste de funções e componentes isolados
- **Integração**: Teste de interação entre componentes
- **E2E**: Teste de fluxos completos da aplicação

### Executando Testes
```bash
# Executar todos os testes
npm test

# Executar testes unitários
npm run test:unit

# Executar testes de integração
npm run test:integration

# Executar testes E2E
npm run test:e2e
```

## Diretrizes para Pull Requests

### Checklist antes de submeter
- [ ] O código segue as convenções de estilo do projeto
- [ ] Foram adicionados testes para as alterações
- [ ] A documentação foi atualizada
- [ ] Todos os testes estão passando
- [ ] O código foi revisado por pelo menos uma pessoa

### Processo de Review
- Cada PR precisa de pelo menos uma aprovação
- Feedback será dado dentro de 2 dias úteis
- Após aprovado, o autor pode fazer o merge

## Suporte

Se tiver dúvidas sobre o processo de contribuição, entre em contato:
- Crie uma issue no repositório
- Entre em contato pelo email: [seu-email@exemplo.com]

Agradecemos sua contribuição para tornar o Postax melhor! 