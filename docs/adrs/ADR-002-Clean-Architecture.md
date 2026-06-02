# ADR-002: Adotar Clean Architecture para a estruturação do código

**Status:** Accepted

**Contexto:** O sistema antigo era um "Big Ball of Mud" misturando lógica de negócios, consultas SQL e HTML no mesmo arquivo. Precisamos garantir a testabilidade, manutenibilidade e independência de frameworks ou bancos de dados.

**Decisão:** Decidimos estruturar o código utilizando os princípios da Clean Architecture de Robert C. Martin.

**Consequências:**
- **Benefícios:** A regra de negócios (Domínio e Aplicação) fica completamente isolada e pode ser testada sem depender do banco de dados ou do Express. Se quisermos mudar de SQLite para PostgreSQL no futuro, o domínio não sofrerá nenhuma alteração.
- **Custos:** Aumenta a quantidade de classes e arquivos (Entidades, Casos de Uso, Interfaces de Repositório e Implementações), adicionando uma complexidade inicial maior que um sistema MVC tradicional.
