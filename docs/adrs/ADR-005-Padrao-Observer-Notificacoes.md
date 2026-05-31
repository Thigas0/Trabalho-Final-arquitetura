# ADR-005: Adotar o Padrão Observer para notificações assíncronas

**Status:** Accepted

**Contexto:** Quando um livro é devolvido, pode haver interesse de outras partes do sistema em reagir a esse evento (por exemplo, avisar o próximo usuário na fila de reserva ou atualizar um dashboard de estatísticas). Se acoplarmos essas lógicas diretamente no caso de uso de devolução, violamos a responsabilidade única.

**Decisão:** Adotar o padrão de projeto comportamental Observer (GoF), disparando um evento de domínio `BookReturnedEvent`.

**Consequências:**
- **Benefícios:** Desacoplamento. O caso de uso não precisa saber o que acontece depois da devolução, apenas notifica que ela ocorreu. Novos `Listeners` podem ser adicionados facilmente (Open-Closed).
- **Custos:** O rastreamento de fluxo de execução pode se tornar um pouco mais difícil, pois a reação ocorre de forma indireta.
