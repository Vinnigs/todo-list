# Documentação dos Testes - Todo List Frontend

Este documento descreve os testes unitários implementados para a aplicação Todo List em Angular.

## Estrutura dos Testes

Os testes foram criados seguindo uma abordagem de **testes unitários básicos**, focando apenas nos principais comportamentos de cada componente e serviço.

### Ferramentas Utilizadas

- **Jasmine**: Framework de testes para JavaScript
- **Karma**: Test runner para executar os testes no navegador
- **HttpClientTestingModule**: Para mockar requisições HTTP
- **Chromium Browser**: Navegador para execução dos testes

## Comandos para Executar os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

## Configuração do Browser

Os testes estão configurados para usar o Chromium em modo headless:
- **Browser**: `/usr/bin/chromium-browser`
- **Flags**: `--no-sandbox`, `--disable-web-security`, `--disable-gpu`

## Componentes Testados

### 1. AppComponent (`src/app/app.spec.ts`)
**Responsabilidade**: Componente principal da aplicação

**Testes Implementados**:
- ✅ Criação do componente
- ✅ Carregamento inicial de tarefas
- ✅ Criação de nova tarefa
- ✅ Atualização de tarefa existente
- ✅ Exclusão de tarefa
- ✅ Cálculo do total de itens

### 2. TaskService (`src/app/services/task.spec.ts`)
**Responsabilidade**: Serviço para comunicação com a API

**Testes Implementados**:
- ✅ Criação do serviço
- ✅ Buscar tarefas (GET)
- ✅ Criar tarefa (POST)
- ✅ Atualizar tarefa (PUT)
- ✅ Excluir tarefa (DELETE)

### 3. TaskItemComponent (`src/app/components/task-item/task-item.spec.ts`)
**Responsabilidade**: Item individual de tarefa

**Testes Implementados**:
- ✅ Criação do componente
- ✅ Alteração de estado completed
- ✅ Emissão de evento de alteração
- ✅ Emissão de evento de exclusão
- ✅ Abertura do modal de edição

### 4. NewTaskFormComponent (`src/app/components/new-task-form/new-task-form.spec.ts`)
**Responsabilidade**: Formulário para criar novas tarefas

**Testes Implementados**:
- ✅ Criação do componente
- ✅ Criação de tarefa com título válido
- ✅ Validação para título vazio
- ✅ Validação para título muito curto
- ✅ Atualização do título via input
- ✅ Envio via tecla Enter

### 5. PaginationComponent (`src/app/components/pagination/pagination.spec.ts`)
**Responsabilidade**: Navegação entre páginas

**Testes Implementados**:
- ✅ Criação do componente
- ✅ Atualização de sinais internos
- ✅ Cálculo do total de páginas
- ✅ Verificação de página anterior
- ✅ Verificação de próxima página

### 6. EditTaskModalComponent (`src/app/components/edit-task-modal/edit-task-modal.spec.ts`)
**Responsabilidade**: Modal para editar tarefas existentes

**Testes Implementados**:
- ✅ Criação do componente
- ✅ Abertura do modal com dados da tarefa
- ✅ Fechamento do modal
- ✅ Atualização de tarefa com sucesso
- ✅ Validação para título vazio
- ✅ Validação para título muito curto
- ✅ Atualização do título via input
- ✅ Salvamento via tecla Enter

