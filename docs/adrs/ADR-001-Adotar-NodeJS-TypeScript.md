# ADR-001: Adotar Node.js com TypeScript

**Status:** Accepted

**Contexto:** O OpenBiblio original foi escrito em PHP antigo sem orientação a objetos robusta. Precisamos refatorar o módulo de empréstimos e devoluções para aplicar conceitos de Clean Architecture, SOLID e Design Patterns. A linguagem e stack são de livre escolha.

**Decisão:** Decidimos utilizar Node.js com TypeScript e o framework Express.

**Consequências:**
- **Benefícios:** TypeScript oferece tipagem estática forte, o que facilita a implementação rigorosa de interfaces (exigidas pela Clean Architecture e Dependency Inversion do SOLID). O ecossistema Node.js permite testes rápidos (Jest) e criação de APIs REST com Express de forma simples.
- **Custos:** A equipe precisa estar familiarizada com o ecossistema JavaScript/TypeScript, abandonando a base de código original em PHP.
