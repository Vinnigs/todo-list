# Todo List - Frontend

Uma aplicação moderna de gerenciamento de tarefas desenvolvida com Angular 20.

## 📋 Sobre o Projeto

Esta é uma aplicação frontend para gerenciamento de tarefas (Todo List) que permite aos usuários:

- ✅ Criar novas tarefas
- ✏️ Editar tarefas existentes
- ✔️ Marcar tarefas como concluídas
- 🗑️ Excluir tarefas
- 📄 Navegar entre páginas (paginação)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes)

### Passos para execução

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd todo-list-frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o ambiente:**
   - Verifique se a URL da API está correta em `src/environments/environment.ts`

4. **Execute a aplicação:**
```bash
npm start
# ou
ng serve
```

5. **Acesse a aplicação:**
   - Abra o navegador em `http://localhost:4200`

6. **API Integration**
    - A aplicação consome uma API REST para persistência dos dados. Certifique-se de que o backend esteja rodando na URL configurada no arquivo de environment.

## 🧪 Testes

A aplicação possui testes unitários para todos os componentes e serviços. Acesse o arquivo de documentação dos testes para mais detalhes.

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm test` - Executa os testes unitários
- `npm run build` - Gera build de produção
- `npm run lint` - Executa verificação de código

## 🌟 Funcionalidades

### Gerenciamento de Tarefas
- **Criar**: Adicione novas tarefas com validação de título
- **Editar**: Modifique tarefas existentes através de modal
- **Concluir**: Marque/desmarque tarefas como concluídas
- **Excluir**: Remova tarefas desnecessárias

### Interface do Usuário
- Design responsivo e moderno
- Feedback visual para ações do usuário
- Validação de formulários em tempo real
- Paginação para grandes listas de tarefas

### Arquitetura
- Componentes standalone (Angular 20)
- Gerenciamento de estado com Signals
- Comunicação reativa com API REST
- Estrutura modular e escalável

## 🚀 Tecnologias Utilizadas

- **Angular 20**: Framework principal
- **TypeScript**: Linguagem de programação
- **Signals**: Gerenciamento de estado reativo
- **Standalone Components**: Arquitetura modular
- **HTTP Client**: Comunicação com API
- **CSS**: Estilização