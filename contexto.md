Objetivo
Desenvolver um projeto de software completo aplicando, de forma justificada e demonstrável, os conceitos centrais da disciplina: arquitetura de software, atributos de qualidade, princípios SOLID, Clean Code e padrões de projeto GoF. O trabalho deve evidenciar capacidade de tomar decisões arquiteturais conscientes e de comunicá-las por escrito.

Instruções Gerais
Formação dos Grupos
Grupos com 4 a 6 membros.
Cada grupo entrega um único documento final consolidado e um único repositório Git.
A composição do grupo deve ser informada ao professor no início do trabalho.
Escolha do Tema
O grupo seleciona claramente um software para desenvolvimento, com escopo bem delimitado.
Três caminhos são aceitos: (a) continuidade aprimorada do Projeto Integrador, (b) projeto novo, (c) refatoração arquitetural de um sistema existente de domínio público.
O tema escolhido deve permitir aplicação clara e demonstrável dos conceitos da disciplina. Sistemas triviais não atendem o requisito.
Conceitos a Aplicar
O trabalho deve dar evidência objetiva de aplicação dos seguintes conceitos da disciplina, todos cobertos pelo livro-texto:

Definição de arquitetura como conjunto de decisões importantes e difíceis de mudar (Fowler, Johnson, ISO/IEC/IEEE 42010).
Identificação dos atributos de qualidade prioritários (ISO/IEC 25010:2023).
Registro de decisões arquiteturais por meio de ADRs (Nygard, 2011).
Posicionamento arquitetural em dois planos: macro (monolito modular ou microsserviços) e interno (Clean Architecture, Hexagonal, MVC, em camadas).
Cinco princípios SOLID aplicados ao código.
Práticas de Clean Code (nomes, funções pequenas, ausência de duplicação, encapsulamento, testabilidade).
Pelo menos três padrões GoF (criação, estrutura ou comportamento) escolhidos e justificados.
Design de API formalmente especificado (REST com OpenAPI, GraphQL com SDL, ou gRPC com .proto).
Especificações da Implementação
Linguagem e stack tecnológica de livre escolha, desde que sustentem todos os requisitos da documentação.
O código deve estar em repositório Git público (GitHub, GitLab ou similar) e acessível ao professor. Repositório inacessível resulta em nota 0.
O histórico de commits deve ser coerente: vários commits ao longo do desenvolvimento, com mensagens claras.
README com instruções de instalação e execução é obrigatório.
Testes automatizados não são obrigatórios, mas contam positivamente na avaliação de Clean Code.
Formato da Documentação
O documento final deve ser entregue em PDF e conter, obrigatoriamente, as seções abaixo.

1. Introdução
Apresentação e justificativa do projeto.
Objetivos gerais e específicos do software.
Caracterização do problema que o sistema resolve e do público-alvo.
2. Atributos de Qualidade e Decisões Arquiteturais
2A. Atributos de qualidade prioritários
Identifique, à luz da ISO/IEC 25010:2023, os três atributos de qualidade mais relevantes para o sistema (por exemplo: performance, escalabilidade, manutenibilidade, segurança, confiabilidade, disponibilidade, usabilidade). Para cada atributo:

Justifique por que esse atributo, e não outro, é prioritário no contexto do projeto.
Descreva concretamente que decisões arquiteturais respondem a esse atributo.
Quando aplicável, indique métricas observáveis (latência alvo, taxa de erro tolerada, etc.).
2B. Registro de Decisões Arquiteturais (ADRs)
Inclua, em pasta dedicada no repositório Git e referenciada no documento, pelo menos cinco ADRs no formato canônico. Cada ADR deve conter:

Número e título (exemplo: ADR-003: Adotar PostgreSQL como banco principal).
Status (Proposed, Accepted, Deprecated, Superseded).
Contexto: as forças e restrições que motivaram a decisão.
Decisão: o que foi decidido, em frase clara.
Consequências: benefícios e custos esperados.
Os ADRs devem refletir decisões reais do grupo, com contexto específico ao projeto. Recomenda-se que pelo menos um ADR registre uma decisão revertida ou modificada ao longo do desenvolvimento.

3. Estilo Arquitetural
Documente o posicionamento arquitetural do sistema em dois planos distintos. Trate-os separadamente.

3A. Plano macro: decomposição em unidades implantáveis
O sistema é um monolito (clássico ou modular) ou um conjunto de microsserviços? Justifique a escolha com base nos atributos de qualidade declarados na seção 2A e no tamanho/maturidade da equipe. Se for arquitetura distribuída, descreva o que fica em cada serviço, como eles se comunicam, e por que essa decomposição.

3B. Plano interno: organização do código dentro da unidade
Que organização de código foi adotada dentro de cada unidade implantável? As opções incluem Clean Architecture (Martin), Hexagonal (Cockburn), MVC, MVVM, organização clássica em camadas, entre outras. Justifique a escolha. Apresente diagrama da organização.

4. Aplicação dos Princípios SOLID
Para cada um dos cinco princípios, apresente:

Explicação técnica do princípio.
Trecho concreto de código do projeto onde o princípio foi aplicado.
Análise breve do efeito do princípio no trecho (que problema ele resolveu ou preveniu).
Princípios a cobrir: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.

5. Clean Code
Demonstre as práticas de Clean Code adotadas com trechos exemplares do próprio código. As práticas a evidenciar incluem:

Nomes claros e descritivos para variáveis, funções, classes e módulos.
Funções pequenas, com responsabilidade única e poucos parâmetros.
Ausência de duplicação significativa.
Baixo acoplamento entre módulos; alta coesão interna.
Ausência de comentários redundantes; comentários reservados para explicar o porquê.
Tratamento de erros explícito.
6. Padrões de Projeto GoF
Aplique e documente pelo menos três padrões GoF. Para cada padrão:

Identifique o padrão e a categoria (criação, estrutura, comportamento).
Descreva o problema concreto no projeto que motivou sua adoção.
Apresente o trecho de código onde o padrão foi implementado.
Analise criticamente: que benefício o padrão trouxe? Que custo adicional foi pago?
7. Design de API
Se o sistema expõe interface programática (REST, GraphQL, gRPC, ou outra), documente formalmente:

Estilo escolhido (REST, GraphQL ou gRPC) com justificativa.
Especificação completa em formato apropriado: OpenAPI 3.x para REST, schema SDL para GraphQL, ou arquivos .proto para gRPC.
Estratégia de versionamento adotada (URL, header, ou opção da Stripe sem versão explícita).
Convenções de erro, paginação, autenticação.
Se o sistema é puramente interno e não expõe API (caso raro), substitua esta seção por documentação detalhada das interfaces principais entre módulos.

8. Diagramas e Modelos
Inclua diagramas UML que ilustrem:

Arquitetura geral do sistema (visão de componentes ou de containers, estilo C4).
Diagrama de classes das partes onde padrões GoF foram aplicados.
Diagrama de sequência de pelo menos um fluxo central do sistema.
Diagramas devem ser legíveis e refletir fielmente o código implementado. Ferramentas sugeridas: PlantUML, Mermaid, Structurizr, draw.io. Diagramas como código (Mermaid, PlantUML) são preferíveis e devem ficar versionados no repositório.

9. Conclusões
Resultados obtidos com a aplicação das técnicas e padrões.
Avaliação crítica sobre a efetividade das práticas adotadas.
Limitações identificadas e o que seria feito diferente em uma próxima iteração.
10. Referências Bibliográficas
Citação completa das fontes consultadas, em formato ABNT NBR 6023. Bibliografia mínima esperada (não exclusiva):

Livro-texto da disciplina.
Gamma, Helm, Johnson, Vlissides. Design Patterns. Addison-Wesley, 1994.
Martin, R. C. Clean Code. Prentice Hall, 2008.
Martin, R. C. Clean Architecture. Prentice Hall, 2017.
Fowler, M. Patterns of Enterprise Application Architecture. Addison-Wesley, 2002.
ISO/IEC 25010:2023. Product quality model.
Nygard, M. Documenting Architecture Decisions. cognitect.com, 2011.