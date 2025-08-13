# Todo List - Aplicação Full Stack 📝

Uma aplicação moderna de gerenciamento de tarefas construída com **Angular 20** no frontend e **.NET 8** no backend, seguindo princípios de Clean Architecture e boas práticas de desenvolvimento.

## 🎯 Sobre o Projeto

Esta é uma aplicação completa de Todo List que permite aos usuários gerenciar suas tarefas de forma intuitiva e eficiente. O projeto é dividido em duas partes principais:

- **Frontend**: Interface moderna e responsiva desenvolvida com Angular 20
- **Backend**: API RESTful robusta construída com .NET 8 e Clean Architecture

## 🚀 Funcionalidades

### ✅ Gerenciamento de Tarefas
- **Criar tarefa** - Adicionar nova tarefa à lista
- **Listar tarefas** - Visualizar todas as tarefas com paginação
- **Buscar tarefa** - Obter tarefa específica por ID
- **Atualizar tarefa** - Modificar título e status de conclusão
- **Excluir tarefa** - Remover tarefa da lista

### 🔧 Funcionalidades Técnicas
- **API RESTful** - Endpoints bem definidos e documentados
- **Tratamento global de exceções** - Middleware para captura de erros
- **Validação de dados** - Validação automática de DTOs
- **Documentação automática** - Swagger UI integrado
- **CORS configurado** - Suporte para comunicação frontend/backend
- **Design responsivo** - Interface adaptável a diferentes dispositivos
- **Testes unitários** - Cobertura completa de testes

## 🛠️ Tecnologias Utilizadas

### Backend (.NET 8)
- **ASP.NET Core Web API** - Framework para criação da API REST
- **Entity Framework Core** - ORM para acesso a dados
- **SQLite** - Banco de dados leve e portátil
- **Swagger/OpenAPI** - Documentação automática da API
- **xUnit** - Framework para testes unitários
- **Moq** - Library para mocking em testes
- **Clean Architecture** - Arquitetura em camadas

### Frontend (Angular 20)
- **Angular 20** - Framework principal
- **TypeScript** - Linguagem de programação
- **Angular Material** - Biblioteca de componentes UI
- **Signals** - Gerenciamento de estado reativo
- **Standalone Components** - Arquitetura modular
- **HTTP Client** - Comunicação com API
- **Karma + Jasmine** - Framework de testes

## 🚀 Como Executar

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (gerenciador de pacotes)

### 🔧 Configuração do Backend

1. **Navegue até o diretório do backend:**
   ```bash
   cd backend/TodoList
   ```

2. **Restaure as dependências:**
   ```bash
   dotnet restore
   ```

3. **Execute a aplicação:**
   ```bash
   dotnet run
   ```

4. **Acesse a documentação da API:**
   - Swagger UI: `https://localhost:7xxx/swagger`
   - API Base URL: `https://localhost:7xxx/api`

> 💡 **Nota:** O banco de dados SQLite (`todolist.db`) será criado automaticamente na primeira execução.

### 🎨 Configuração do Frontend

1. **Navegue até o diretório do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   - Verifique se a URL da API está correta em `src/environments/environment.ts`
   - URL padrão: `http://localhost:5184/api`

4. **Execute a aplicação:**
   ```bash
   npm start
   # ou
   ng serve
   ```

5. **Acesse a aplicação:**
   - Frontend: `http://localhost:4200`

## 📡 API Endpoints

### Tarefas
- `GET /api/task` - Lista todas as tarefas
- `GET /api/task/{id}` - Obtém uma tarefa específica
- `POST /api/task` - Cria uma nova tarefa
- `PUT /api/task/{id}` - Atualiza uma tarefa existente
- `DELETE /api/task/{id}` - Exclui uma tarefa


## 🧪 Testes

### Backend
```bash
# Executar todos os testes
dotnet test
```

### Frontend
```bash
# Executar testes unitários
npm test
```

## 🏗️ Arquitetura

### Backend - Clean Architecture

### Frontend - Arquitetura Modular
- **Standalone Components** - Componentes independentes e reutilizáveis
- **Services** - Comunicação com API e lógica de negócio
- **Signals** - Gerenciamento de estado reativo
- **Material Design** - Interface consistente e moderna

## 🔧 Scripts Disponíveis

### Backend
- `dotnet run` - Inicia o servidor de desenvolvimento
- `dotnet test` - Executa os testes unitários
- `dotnet build` - Compila o projeto

### Frontend
- `npm start` - Inicia o servidor de desenvolvimento
- `npm test` - Executa os testes unitários
- `npm run build` - Gera build de produção
- `npm run lint` - Executa verificação de código
