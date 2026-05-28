# ADR-004: Adotar o Padrão Strategy para o cálculo de multas

**Status:** Accepted

**Contexto:** As multas por atraso variam dependendo do tipo de usuário (Aluno, Professor, Visitante). Se essa regra mudasse, teríamos que modificar a lógica principal de devolução, ferindo o princípio Open-Closed.

**Decisão:** Adotar o padrão de projeto comportamental Strategy (GoF) criando diferentes estratégias de cálculo (`StudentFineStrategy`, `TeacherFineStrategy`, etc.).

**Consequências:**
- **Benefícios:** É muito fácil adicionar uma nova regra de negócio (ex: "Usuário VIP" ou "Funcionário") criando uma nova classe que implementa a interface `FineStrategy` sem tocar no caso de uso principal `ReturnBookUseCase`.
- **Custos:** Para uma lógica que hoje é trivial (multiplicar dias por valor), o padrão pode parecer "overengineering", mas justifica-se pela possibilidade de evolução futura das regras.
