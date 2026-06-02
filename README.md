# OpenBiblio - Módulo de Empréstimos (Clean Architecture)

Este projeto foi construído como trabalho final da disciplina de Arquitetura de Software. Ele representa a refatoração e modernização do módulo de Empréstimos e Devoluções do sistema clássico OpenBiblio.

## Tecnologias
- **Linguagem:** Node.js com TypeScript
- **Framework:** Express
- **Banco de Dados:** SQLite (em memória, para fins de demonstração)
- **Design:** Clean Architecture, SOLID e Design Patterns GoF (State, Strategy, Observer)

## Documentação da Arquitetura
O documento principal, cobrindo as decisões de arquitetura, diagrama C4 e diagramas UML, encontra-se em:
👉 `docs/arquitetura.md`

As decisões de arquitetura e design em detalhes (ADRs) estão em:
👉 `docs/adrs/`

O design e contrato da API REST estão em:
👉 `docs/openapi.yaml`

## Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM ou Yarn

### Passos
1. Clone este repositório e acesse a pasta raiz.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npx ts-node src/presentation/server.ts
   ```
4. O servidor estará rodando em `http://localhost:3000`.

## Como Testar a API

Você pode usar o Postman, Insomnia ou cURL para testar.

1. **Popular o banco de dados (Seed)**
   Primeiro, gere um usuário e um livro para podermos emprestar.
   ```bash
   curl -X POST http://localhost:3000/seed
   ```
   *Retorna `user1` e `book1` como IDs.*

2. **Realizar um Empréstimo**
   ```bash
   curl -X POST http://localhost:3000/loans \
   -H "Content-Type: application/json" \
   -d '{"userId": "user1", "bookId": "book1"}'
   ```
   *Retorna o `loanId` do novo empréstimo. O livro passa para o estado "Emprestado".*

3. **Devolver um Livro**
   Usando o `loanId` recebido no passo anterior:
   ```bash
   curl -X POST http://localhost:3000/returns \
   -H "Content-Type: application/json" \
   -d '{"loanId": "COLOQUE_O_LOAN_ID_AQUI"}'
   ```
   *Observe o terminal do servidor: o Padrão Observer imprimirá o Mock de envio de E-mail.*
