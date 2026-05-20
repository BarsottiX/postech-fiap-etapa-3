# 🚀 Tech Challenge - Refatorando o Backend do Blogging

> **Etapa 2: Persistência de Dados e Qualidade de Software**

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Este projeto consiste em uma **API robusta para gerenciamento de
postagens educacionais**, desenvolvida como parte da pós-graduação em
**IA aplicada**.

O foco da solução é garantir:

-   **Resiliência de dados**
-   **Orquestração de ambientes**
-   **Alta cobertura de testes**

------------------------------------------------------------------------

# 🏗️ Arquitetura do Sistema

A aplicação foi construída utilizando o padrão **Controller-Route
Pattern**, promovendo uma separação clara entre as definições de rotas e
a lógica de persistência no banco de dados PostgreSQL.

### Rotas (Routes)

Responsáveis por definir os **endpoints da API** e gerenciar os
**parâmetros de entrada**.

### Controladores (Controllers)

Contêm a **lógica de negócio** e o **tratamento dos status HTTP**
retornados pela aplicação.

### Persistência (Database)

Implementada com **pool de conexões otimizado** para PostgreSQL,
executado em ambiente **Dockerizado**.

------------------------------------------------------------------------

# 🛠️ Configuração e Execução

## 1. Requisitos Prévios

Antes de iniciar, certifique-se de possuir instalado:

-   Docker
-   Docker Compose
-   Node.js **v18 ou superior**

------------------------------------------------------------------------

## 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as configurações de acesso
ao banco:

``` env
PORT=3000
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=blogging_db
```

------------------------------------------------------------------------

## 3. Orquestração com Docker

Para subir o ambiente completo (**API + Banco de Dados + Inicialização
de Tabelas**):

``` bash
docker-compose up -d --build
```

O banco de dados é inicializado automaticamente através do script
`init.sql`, que é executado no **entrypoint do container PostgreSQL**.

------------------------------------------------------------------------

# 🧪 Suíte de Testes e Qualidade

Foram implementados **testes de integração** utilizando:

-   **Jest**
-   **Supertest**

Os testes cobrem fluxos críticos de:

-   criação de posts
-   leitura de dados
-   atualização
-   remoção
-   cenários de erro

------------------------------------------------------------------------

## Execução dos Testes

``` bash
npm run test:coverage
```

------------------------------------------------------------------------

# 📊 Relatório de Cobertura (Coverage)

  Categoria             Percentual   Requisito Mínimo   Status
  --------------------- ------------ ------------------ -------------
  Linhas (Lines)        65.27%       20%                ✅ Superado
  Funções (Functions)   66.66%       20%                ✅ Superado
  Branch (Lógica)       63.15%       20%                ✅ Superado

------------------------------------------------------------------------

# 📡 Documentação da API

  --------------------------------------------------------------------------
  Método            Endpoint             Descrição         Status Sucesso
  ----------------- -------------------- ----------------- -----------------
  GET               `/posts`             Lista todas as    200 OK
                                         postagens         

  POST              `/posts`             Cria uma nova     201 Created
                                         postagem          

  GET               `/posts/:id`         Detalha uma       200 OK
                                         postagem          
                                         específica        

  GET               `/posts/search?q=`   Busca postagens   200 OK
                                         por palavra-chave 

  PUT               `/posts/:id`         Atualiza uma      200 OK
                                         postagem          
                                         existente         

  DELETE            `/posts/:id`         Remove uma        204 No Content
                                         postagem do       
                                         sistema           
------------------------------------------------------------------------


------------------------------------------------------------------------

# 📦 Stack Tecnológica

-   **Node.js**
-   **Express**
-   **PostgreSQL**
-   **Docker**
-   **Jest**
-   **Supertest**

------------------------------------------------------------------------

# 🎯 Objetivo do Projeto

Demonstrar boas práticas de desenvolvimento backend com foco em:

-   **persistência de dados**
-   **testes automatizados**
-   **arquitetura organizada**
-   **infraestrutura reproduzível com Docker**
