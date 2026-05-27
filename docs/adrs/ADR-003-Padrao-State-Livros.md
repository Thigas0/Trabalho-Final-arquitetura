# ADR-003: Adotar o Padrão State para controle do ciclo de vida do Livro

**Status:** Accepted

**Contexto:** Um livro possui vários estados (Disponível, Emprestado, Atrasado, Perdido, Em Manutenção). Certas operações só são válidas em determinados estados (ex: não se pode emprestar um livro que está "Perdido" ou "Emprestado"). O código original lidava com isso usando múltiplos `if/else` espalhados.

**Decisão:** Decidimos implementar o padrão de projeto comportamental State (GoF) na entidade `Book`.

**Consequências:**
- **Benefícios:** Elimina os `if/else` complexos. Adicionar um novo estado (ex: "Reservado") afeta apenas a nova classe de estado, respeitando o princípio Open-Closed (SOLID). Cada estado tem a Responsabilidade Única de definir suas próprias regras de transição.
- **Custos:** O número de classes no domínio aumenta. O mapeamento da classe de estado para o banco de dados exige um pequeno adaptador (converter a instância para String no repositório).
