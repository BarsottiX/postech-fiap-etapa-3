# 🚀 Tech Challenge - BlogFIAP

> **Full Stack Development — Fase 03**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

---

## 🎯 Objetivo do Projeto

Desenvolver uma interface gráfica para a aplicação de blogging utilizando React. A aplicação é responsiva, acessível e fácil de usar, permitindo aos docentes e alunos(as) interagir com os diversos endpoints REST já implementados no back-end.

---

## 🏗️ Arquitetura do Sistema

A aplicação é composta por três camadas integradas via Docker:

- **Front-end**: Interface React servida pelo Vite na porta `5173`
- **Back-end**: API REST em Node.js + Express na porta `3000`
- **Banco de dados**: PostgreSQL 15 na porta `5432`

### Estrutura de Pastas

```
postech-fiap-etapa-3/
├── frontend/                    # Interface gráfica em React
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx       # Barra de navegação global
│       │   └── PrivateRoute.jsx # Proteção de rotas autenticadas
│       ├── context/
│       │   ├── AuthContext.jsx  # Gerenciamento de autenticação
│       │   └── PostsContext.jsx # Estado global dos posts
│       ├── pages/
│       │   ├── Home.jsx         # Lista de posts com busca
│       │   ├── PostDetail.jsx   # Leitura completa do post
│       │   ├── CreatePost.jsx   # Criação de postagens
│       │   ├── EditPost.jsx     # Edição de postagens
│       │   ├── Admin.jsx        # Painel administrativo
│       │   └── Login.jsx        # Autenticação do professor
│       ├── services/
│       │   └── api.js           # Integração com a API REST
│       └── styles/
│           └── GlobalStyle.js   # Estilos globais
├── src/                         # Back-end Node.js
│   ├── config/db.js             # Configuração do PostgreSQL
│   ├── controllers/
│   │   └── postsController.js  # Lógica de negócio
│   └── routes/
│       └── posts.js             # Endpoints da API
├── tests/
│   └── posts.test.js            # Testes de integração
├── .github/workflows/main.yml   # Pipeline CI/CD
├── docker-compose.yml           # Orquestração dos containers
├── Dockerfile                   # Imagem da aplicação
├── init.sql                     # Inicialização do banco de dados
└── package.json
```

---

## 🖥️ Páginas e Funcionalidades

### 1. Página Principal — Lista de Posts (`/`)
- Exibe todos os posts disponíveis em cards
- Cada card mostra o título, autor e uma breve descrição do post
- Campo de busca para filtrar posts por palavras-chave em tempo real
- Acesso público — qualquer visitante pode visualizar

### 2. Página de Leitura de Post (`/posts/:id`)
- Exibe o conteúdo completo do post selecionado
- Mostra título, autor e data de publicação
- Botão para retornar à página principal
- Acesso público

### 3. Página de Criação de Postagens (`/criar`)
- Formulário para que docentes possam criar novas postagens
- Campos para título, conteúdo e autor
- Botão para enviar o post ao servidor
- Acesso restrito a professores autenticados

### 4. Página de Edição de Postagens (`/editar/:id`)
- Formulário pré-preenchido com os dados atuais do post
- Carrega automaticamente as informações existentes para edição
- Botão para salvar as alterações
- Acesso restrito a professores autenticados

### 5. Página Administrativa (`/admin`)
- Lista todas as postagens com opções de gerenciamento
- Botões para editar e excluir cada postagem
- Confirmação antes de excluir para evitar exclusões acidentais
- Acesso restrito a professores autenticados

### 6. Autenticação e Autorização (`/login`)
- Login exclusivo para professores
- Apenas usuários autenticados acessam as páginas de criação, edição e administração
- Sessão mantida via localStorage
- Rotas protegidas com redirecionamento automático para o login

---

## 📡 Endpoints da API (Back-end)

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/posts` | Lista todas as postagens | 200 OK |
| POST | `/posts` | Cria uma nova postagem | 201 Created |
| GET | `/posts/:id` | Detalha uma postagem específica | 200 OK |
| GET | `/posts/search?q=` | Busca postagens por palavra-chave | 200 OK |
| PUT | `/posts/:id` | Atualiza uma postagem existente | 200 OK |
| DELETE | `/posts/:id` | Remove uma postagem | 200 OK |

---

## 🛠️ Setup Inicial

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js v18+](https://nodejs.org)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=blogging_db
DB_PORT=5432
```

### Subindo o Back-end com Docker

Na raiz do projeto, execute:

```bash
docker-compose up -d --build
```

O banco de dados é inicializado automaticamente via `init.sql`.
A API estará disponível em `http://localhost:3000`

### Rodando o Front-end

```bash
cd frontend
npm install
npm run dev
```

A interface estará disponível em `http://localhost:5173`

---

## 🔑 Credenciais de Acesso

| Campo | Valor |
|-------|-------|
| Usuário | `professor` |
| Senha | `123456` |

---

## 🧪 Testes

```bash
npm run test:coverage
```

### Cobertura de Testes

| Categoria | Percentual | Requisito Mínimo | Status |
|-----------|-----------|------------------|--------|
| Linhas | 65.27% | 50% | ✅ Superado |
| Funções | 66.66% | 50% | ✅ Superado |
| Branch | 63.15% | 50% | ✅ Superado |

---

## 📦 Stack Tecnológica

### Front-end
- **React 18 + Vite** — interface e bundler de desenvolvimento
- **React Router DOM** — navegação e roteamento entre páginas
- **Axios** — chamadas HTTP aos endpoints REST
- **Styled Components** — estilização com CSS-in-JS e responsividade
- **Context API** — gerenciamento de estado global (autenticação e posts)
- **Hooks** — useState, useEffect, useContext, useNavigate, useParams

### Back-end
- **Node.js + Express** — servidor e rotas da API REST
- **PostgreSQL 15** — banco de dados relacional
- **pg (node-postgres)** — driver de conexão com pool otimizado
- **dotenv** — gerenciamento de variáveis de ambiente

### Infraestrutura
- **Docker + Docker Compose** — containerização e orquestração
- **Jest + Supertest** — testes de integração do back-end
- **GitHub Actions** — pipeline de CI/CD

---

## 📋 Guia de Uso

### Como um Aluno
1. Acesse `http://localhost:5173`
2. Navegue pelos posts na página principal
3. Use o campo de busca para encontrar posts por palavra-chave
4. Clique em um post para ler o conteúdo completo

### Como um Professor
1. Clique em **Login** na barra de navegação
2. Entre com as credenciais: `professor` / `123456`
3. Para **criar** um post: clique em **Criar Post**
4. Para **editar** ou **excluir**: acesse o **Painel Admin**
5. Para sair: clique em **Sair** na barra de navegação
