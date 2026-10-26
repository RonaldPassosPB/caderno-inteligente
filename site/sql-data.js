// Banco de treino (uma faculdade) e trilha de exercícios de SQL
const SEED = `
CREATE TABLE cursos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  area TEXT NOT NULL,
  duracao_semestres INTEGER NOT NULL
);
CREATE TABLE professores (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  titulacao TEXT NOT NULL,
  salario REAL NOT NULL
);
CREATE TABLE alunos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  cidade TEXT NOT NULL,
  curso_id INTEGER REFERENCES cursos(id),
  ano_ingresso INTEGER NOT NULL,
  data_nascimento TEXT NOT NULL
);
CREATE TABLE disciplinas (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  carga_horaria INTEGER NOT NULL,
  curso_id INTEGER REFERENCES cursos(id),
  professor_id INTEGER REFERENCES professores(id)
);
CREATE TABLE matriculas (
  id INTEGER PRIMARY KEY,
  aluno_id INTEGER REFERENCES alunos(id),
  disciplina_id INTEGER REFERENCES disciplinas(id),
  semestre TEXT NOT NULL,
  nota REAL,
  frequencia INTEGER NOT NULL
);

INSERT INTO cursos VALUES
 (1,'Análise e Desenvolvimento de Sistemas','Tecnologia',5),
 (2,'Ciência da Computação','Tecnologia',8),
 (3,'Sistemas de Informação','Tecnologia',8),
 (4,'Administração','Negócios',8),
 (5,'Engenharia de Dados','Tecnologia',6);

INSERT INTO professores VALUES
 (1,'Carla Mendes','Doutorado',12500),
 (2,'Roberto Lima','Mestrado',9800),
 (3,'Fernanda Rocha','Doutorado',13200),
 (4,'Paulo Azevedo','Especialização',7400),
 (5,'Juliana Prado','Mestrado',10100),
 (6,'Marcos Teixeira','Doutorado',11800);

INSERT INTO alunos VALUES
 (1,'Ana Souza','ana.souza@email.com','Rio de Janeiro',1,2022,'2001-03-14'),
 (2,'Bruno Carvalho','bruno.carvalho@email.com','Niterói',2,2021,'2000-07-22'),
 (3,'Camila Ferreira','camila.ferreira@email.com','Rio de Janeiro',1,2023,'2003-11-05'),
 (4,'Diego Martins','diego.martins@email.com','São Paulo',3,2022,'1999-01-30'),
 (5,'Eduarda Lopes','eduarda.lopes@email.com','Rio de Janeiro',4,2024,'2005-06-18'),
 (6,'Felipe Araújo','felipe.araujo@email.com','Duque de Caxias',1,2023,'2002-09-09'),
 (7,'Gabriela Nunes','gabriela.nunes@email.com','Belo Horizonte',2,2021,'2000-12-01'),
 (8,'Henrique Dias','henrique.dias@email.com','Niterói',3,2024,'2004-04-27'),
 (9,'Isabela Ribeiro','isabela.ribeiro@email.com','Rio de Janeiro',2,2022,'2002-02-15'),
 (10,'João Pedro Alves','joao.alves@email.com','Nova Iguaçu',1,2024,'2005-08-03'),
 (11,'Larissa Monteiro','larissa.monteiro@email.com','São Paulo',4,2023,'2001-10-11'),
 (12,'Marcelo Barbosa','marcelo.barbosa@email.com','Rio de Janeiro',1,2021,'1998-05-20'),
 (13,'Mariana Costa','mariana.costa@email.com','Niterói',3,2023,'2003-07-07'),
 (14,'Mateus Gomes','mateus.gomes@email.com','Duque de Caxias',2,2024,'2005-01-25'),
 (15,'Natália Pires','natalia.pires@email.com','Rio de Janeiro',3,2022,'2002-12-19'),
 (16,'Otávio Santana','otavio.santana@email.com','Belo Horizonte',4,2021,'1997-03-08'),
 (17,'Paula Vieira','paula.vieira@email.com','Nova Iguaçu',1,2023,'2003-09-14'),
 (18,'Rafael Moreira','rafael.moreira@email.com','Rio de Janeiro',2,2024,'2006-02-02'),
 (19,'Sabrina Freitas','sabrina.freitas@email.com','São Paulo',1,2022,'2001-06-30'),
 (20,'Thiago Cardoso','thiago.cardoso@email.com','Niterói',4,2024,'2004-11-21'),
 (21,'Vitória Ramos','vitoria.ramos@email.com','Rio de Janeiro',3,2024,'2006-05-12');

INSERT INTO disciplinas VALUES
 (1,'Banco de Dados',80,1,1),
 (2,'Algoritmos e Complexidade',80,2,3),
 (3,'Processamento Paralelo e Distribuído em BD',60,3,1),
 (4,'Inteligência Artificial para Devs',60,1,6),
 (5,'Gestão de Infraestrutura de Datacenter',40,3,4),
 (6,'Governança com COBIT',40,3,5),
 (7,'Estruturas de Dados',80,2,3),
 (8,'Programação Web',60,1,2),
 (9,'Contabilidade Gerencial',60,4,5),
 (10,'Marketing Digital',40,4,2),
 (11,'Engenharia de Software',60,2,6),
 (12,'Pipelines de Dados',60,5,1);

INSERT INTO matriculas VALUES
 (1,1,1,'2024.2',8.5,92),(2,1,4,'2025.1',NULL,88),(3,1,8,'2024.2',7.0,85),
 (4,3,1,'2024.2',6.0,78),(5,3,8,'2025.1',NULL,90),
 (6,6,1,'2024.2',4.5,60),(7,6,4,'2024.2',7.5,80),
 (8,10,1,'2025.1',NULL,95),(9,10,8,'2025.1',NULL,70),
 (10,12,1,'2024.2',9.5,98),(11,12,4,'2024.2',9.0,96),(12,12,8,'2024.2',8.0,90),
 (13,17,4,'2024.2',5.5,72),(14,17,8,'2024.2',6.5,81),
 (15,19,1,'2024.2',7.5,88),(16,19,4,'2025.1',NULL,84),(17,19,6,'2024.2',8.0,90),
 (18,2,2,'2024.2',7.0,86),(19,2,7,'2024.2',8.0,90),(20,2,11,'2025.1',NULL,92),
 (21,7,2,'2024.2',9.0,97),(22,7,7,'2024.2',9.5,99),(23,7,11,'2024.2',8.5,94),
 (24,9,2,'2024.2',5.0,65),(25,9,7,'2024.2',6.0,74),
 (26,14,2,'2025.1',NULL,80),(27,14,7,'2025.1',NULL,85),
 (28,18,2,'2025.1',NULL,45),(29,18,11,'2024.2',3.5,40),
 (30,4,3,'2024.2',8.0,89),(31,4,5,'2024.2',7.5,85),(32,4,6,'2024.2',6.5,80),
 (33,8,3,'2025.1',NULL,91),(34,8,5,'2025.1',NULL,76),
 (35,13,3,'2024.2',9.0,95),(36,13,6,'2024.2',9.5,97),(37,13,1,'2024.2',7.5,90),
 (38,15,5,'2024.2',4.0,55),(39,15,6,'2024.2',6.0,75),
 (40,5,9,'2025.1',NULL,82),(41,5,10,'2025.1',NULL,88),
 (42,11,9,'2024.2',7.0,84),(43,11,10,'2024.2',8.5,91),
 (44,16,9,'2024.2',5.5,70),(45,16,10,'2024.2',6.0,48);
`;

// level: 1 Fácil, 2 Médio, 3 Avançado
// ordered: a ordem das linhas conta na correção
// check: exercícios que alteram dados são corrigidos por essa consulta, rodada depois do comando
const EXERCISES = [
  // ---------- FÁCIL ----------
  {
    id: "select", level: 1, title: "Seu primeiro SELECT",
    lesson: `Toda consulta começa com **SELECT** (o que mostrar) e **FROM** (de qual tabela).
O asterisco \`*\` significa "todas as colunas".

\`\`\`sql
SELECT * FROM cursos;
\`\`\`

Isso devolve todas as linhas e colunas da tabela \`cursos\`. O ponto e vírgula fecha o comando.`,
    task: "Mostre todas as colunas e todas as linhas da tabela **alunos**.",
    hints: ["É o mesmo formato do exemplo, só muda a tabela.", "SELECT * FROM ______;"],
    solution: "SELECT * FROM alunos;",
  },
  {
    id: "colunas", level: 1, title: "Escolhendo colunas",
    lesson: `Em vez de \`*\`, você pode listar só as colunas que quer, separadas por vírgula.

\`\`\`sql
SELECT nome, titulacao FROM professores;
\`\`\`

Na prática, evite \`SELECT *\`: pedir só o que você precisa deixa a consulta mais clara e mais rápida.`,
    task: "Mostre o **nome** e o **email** de todos os alunos.",
    hints: ["Liste as duas colunas depois do SELECT, separadas por vírgula.", "SELECT nome, ______ FROM alunos;"],
    solution: "SELECT nome, email FROM alunos;",
  },
  {
    id: "where", level: 1, title: "Filtrando com WHERE",
    lesson: `O **WHERE** filtra as linhas. Só aparecem as que satisfazem a condição.

\`\`\`sql
SELECT nome, salario FROM professores
WHERE titulacao = 'Mestrado';
\`\`\`

- Texto vai entre **aspas simples**: \`'Mestrado'\`.
- Números vão sem aspas: \`WHERE salario > 10000\`.
- Operadores: \`=\`, \`<>\` (diferente), \`>\`, \`<\`, \`>=\`, \`<=\`.`,
    task: "Mostre o **nome** e a **cidade** dos alunos que moram no **Rio de Janeiro**.",
    hints: ["A coluna para filtrar é cidade.", "WHERE cidade = 'Rio de Janeiro'"],
    solution: "SELECT nome, cidade FROM alunos WHERE cidade = 'Rio de Janeiro';",
  },
  {
    id: "orderby", level: 1, title: "Ordenando com ORDER BY",
    lesson: `O **ORDER BY** ordena o resultado. Ele vem depois do WHERE (quando houver).

\`\`\`sql
SELECT nome, ano_ingresso FROM alunos
ORDER BY ano_ingresso;        -- crescente (ASC é o padrão)

SELECT nome FROM alunos
ORDER BY nome DESC;           -- decrescente
\`\`\`

Você também pode ordenar por mais de uma coluna: \`ORDER BY cidade, nome\`.`,
    task: "Mostre o **nome** e o **salario** dos professores, do **maior salário para o menor**.",
    hints: ["Do maior para o menor é ordem decrescente.", "ORDER BY salario DESC"],
    solution: "SELECT nome, salario FROM professores ORDER BY salario DESC;",
    ordered: true,
  },
  {
    id: "andor", level: 1, title: "Combinando condições: AND e OR",
    lesson: `Use **AND** quando todas as condições precisam ser verdadeiras e **OR** quando basta uma.

\`\`\`sql
SELECT nome FROM alunos
WHERE cidade = 'Niterói' AND ano_ingresso = 2024;

SELECT nome FROM alunos
WHERE cidade = 'Niterói' OR cidade = 'São Paulo';
\`\`\`

Misturou AND com OR? Use parênteses para não ter surpresa: \`WHERE (a OR b) AND c\`.`,
    task: "Mostre o **nome** e a **carga_horaria** das disciplinas com **60 horas ou mais** que pertencem ao **curso de id 1**.",
    hints: ["São duas condições que precisam valer ao mesmo tempo: use AND.", "WHERE carga_horaria >= 60 AND curso_id = 1"],
    solution: "SELECT nome, carga_horaria FROM disciplinas WHERE carga_horaria >= 60 AND curso_id = 1;",
  },
  {
    id: "like", level: 1, title: "Buscando padrões com LIKE",
    lesson: `O **LIKE** compara texto com um padrão:

- \`%\` significa "qualquer sequência de caracteres (até nenhuma)".
- \`_\` significa "exatamente um caractere".

\`\`\`sql
SELECT nome FROM disciplinas WHERE nome LIKE '%Dados%';   -- contém "Dados"
SELECT nome FROM alunos WHERE email LIKE '%@email.com';   -- termina com
\`\`\``,
    task: "Mostre o **nome** dos alunos cujo nome **começa com \"Ma\"**.",
    hints: ["Começa com = o texto fixo vem primeiro e o % depois.", "WHERE nome LIKE 'Ma%'"],
    solution: "SELECT nome FROM alunos WHERE nome LIKE 'Ma%';",
  },
  {
    id: "distinct", level: 1, title: "Sem repetição: DISTINCT",
    lesson: `O **DISTINCT** remove linhas repetidas do resultado.

\`\`\`sql
SELECT DISTINCT titulacao FROM professores;
\`\`\`

Há 6 professores, mas só 3 titulações diferentes, e é isso que volta.`,
    task: "Liste as **cidades** onde os alunos moram, **sem repetir** nenhuma.",
    hints: ["O DISTINCT vem logo depois do SELECT.", "SELECT DISTINCT ______ FROM alunos;"],
    solution: "SELECT DISTINCT cidade FROM alunos;",
  },
  {
    id: "limit", level: 1, title: "Os primeiros N: LIMIT",
    lesson: `O **LIMIT** corta o resultado nas primeiras N linhas. Junto com ORDER BY, ele responde perguntas do tipo "top 5".

\`\`\`sql
SELECT nome, ano_ingresso FROM alunos
ORDER BY ano_ingresso
LIMIT 5;     -- os 5 que entraram primeiro
\`\`\`

O LIMIT é sempre a última parte da consulta. (No SQL Server o equivalente é \`SELECT TOP 5\`.)`,
    task: "Mostre o **nome** e o **salario** dos **3 professores que ganham mais**, do maior para o menor.",
    hints: ["Primeiro ordene do maior para o menor, depois limite.", "ORDER BY salario DESC LIMIT 3"],
    solution: "SELECT nome, salario FROM professores ORDER BY salario DESC LIMIT 3;",
    ordered: true,
  },

  // ---------- MÉDIO ----------
  {
    id: "count", level: 2, title: "Contando com COUNT",
    lesson: `Funções de agregação resumem várias linhas em um valor:

| Função | O que faz |
|---|---|
| \`COUNT(*)\` | conta linhas |
| \`SUM(col)\` | soma |
| \`AVG(col)\` | média |
| \`MIN(col)\` / \`MAX(col)\` | menor / maior |

\`\`\`sql
SELECT COUNT(*) FROM professores;            -- 6
SELECT MAX(salario) FROM professores;        -- maior salário
\`\`\`

Atenção: \`COUNT(coluna)\` ignora valores NULL, enquanto \`COUNT(*)\` conta todas as linhas.`,
    task: "Descubra **quantos alunos** existem na tabela alunos.",
    hints: ["Uma única função de agregação resolve.", "SELECT COUNT(*) FROM ______;"],
    solution: "SELECT COUNT(*) FROM alunos;",
  },
  {
    id: "groupby", level: 2, title: "Agrupando com GROUP BY",
    lesson: `O **GROUP BY** junta as linhas que têm o mesmo valor e aplica a agregação em cada grupo.

\`\`\`sql
SELECT titulacao, COUNT(*) AS total
FROM professores
GROUP BY titulacao;
\`\`\`

Resultado: uma linha por titulação, com a contagem de cada uma.

Regra de ouro: toda coluna do SELECT que **não** está dentro de uma agregação precisa estar no GROUP BY.`,
    task: "Mostre cada **cidade** e a **quantidade de alunos** que moram nela.",
    hints: ["Agrupe pela cidade e conte as linhas de cada grupo.", "SELECT cidade, COUNT(*) FROM alunos GROUP BY ______;"],
    solution: "SELECT cidade, COUNT(*) FROM alunos GROUP BY cidade;",
  },
  {
    id: "avg", level: 2, title: "Médias com AVG e ROUND",
    lesson: `O **AVG** calcula a média e o **ROUND(valor, casas)** arredonda.

\`\`\`sql
SELECT curso_id, ROUND(AVG(carga_horaria), 1) AS media_ch
FROM disciplinas
GROUP BY curso_id;
\`\`\`

O AVG ignora NULL: as matrículas sem nota não puxam a média para baixo.

O \`AS\` dá um apelido (alias) à coluna. É opcional, mas deixa o resultado legível.`,
    task: "Para cada **disciplina_id** da tabela matriculas, mostre a **média das notas arredondada em 2 casas**.",
    hints: ["Agrupe por disciplina_id e use AVG(nota) dentro do ROUND.", "SELECT disciplina_id, ROUND(AVG(nota), 2) FROM matriculas GROUP BY disciplina_id;"],
    solution: "SELECT disciplina_id, ROUND(AVG(nota), 2) FROM matriculas GROUP BY disciplina_id;",
  },
  {
    id: "having", level: 2, title: "Filtrando grupos com HAVING",
    lesson: `O **WHERE** filtra linhas **antes** de agrupar e o **HAVING** filtra os grupos **depois** de agrupar.
Por isso, condições sobre COUNT, AVG etc. vão no HAVING.

\`\`\`sql
SELECT curso_id, COUNT(*) AS qtd
FROM disciplinas
GROUP BY curso_id
HAVING COUNT(*) >= 3;
\`\`\`

Ordem das partes: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.`,
    task: "Mostre as **cidades com mais de 2 alunos** e a **quantidade** de alunos de cada uma.",
    hints: ["É o exercício anterior de GROUP BY com um filtro no grupo.", "... GROUP BY cidade HAVING COUNT(*) > 2;"],
    solution: "SELECT cidade, COUNT(*) FROM alunos GROUP BY cidade HAVING COUNT(*) > 2;",
  },
  {
    id: "isnull", level: 2, title: "Valores vazios: IS NULL",
    lesson: `**NULL** significa "sem valor" (desconhecido). Aqui, uma matrícula com nota NULL é uma disciplina ainda em curso.

NULL não é igual a nada, nem a outro NULL. Por isso \`nota = NULL\` **nunca** funciona. Use:

\`\`\`sql
SELECT * FROM matriculas WHERE nota IS NULL;
SELECT * FROM matriculas WHERE nota IS NOT NULL;
\`\`\``,
    task: "Liste as matrículas **ainda em curso** (sem nota): mostre **id**, **aluno_id** e **disciplina_id**.",
    hints: ["Sem nota = a coluna nota é NULL.", "WHERE nota IS NULL"],
    solution: "SELECT id, aluno_id, disciplina_id FROM matriculas WHERE nota IS NULL;",
  },
  {
    id: "betweenin", level: 2, title: "Faixas e listas: BETWEEN e IN",
    lesson: `Dois atalhos que deixam o WHERE mais curto:

\`\`\`sql
-- BETWEEN inclui as duas pontas
WHERE salario BETWEEN 9000 AND 12000      -- igual a salario >= 9000 AND salario <= 12000

-- IN testa contra uma lista
WHERE titulacao IN ('Mestrado', 'Doutorado')
\`\`\``,
    task: "Mostre **nome** e **ano_ingresso** dos alunos que entraram **entre 2022 e 2023** e moram em **Niterói ou São Paulo**.",
    hints: ["Uma condição com BETWEEN e outra com IN, ligadas por AND.", "WHERE ano_ingresso BETWEEN 2022 AND 2023 AND cidade IN ('Niterói', 'São Paulo')"],
    solution: "SELECT nome, ano_ingresso FROM alunos WHERE ano_ingresso BETWEEN 2022 AND 2023 AND cidade IN ('Niterói', 'São Paulo');",
  },
  {
    id: "join", level: 2, title: "Juntando tabelas: INNER JOIN",
    lesson: `A tabela alunos guarda só o **curso_id**. O nome do curso está na tabela cursos.
O **JOIN** combina as duas usando a chave em comum:

\`\`\`sql
SELECT d.nome, p.nome
FROM disciplinas d
JOIN professores p ON p.id = d.professor_id;
\`\`\`

- \`d\` e \`p\` são apelidos das tabelas, para escrever menos.
- O \`ON\` diz como as linhas se ligam: chave estrangeira = chave primária.
- \`JOIN\` sozinho é o mesmo que \`INNER JOIN\`: só aparecem as linhas que têm par nas duas tabelas.`,
    task: "Mostre o **nome de cada aluno** e o **nome do curso** dele.",
    hints: ["Ligue alunos.curso_id com cursos.id.", "FROM alunos a JOIN cursos c ON c.id = a.curso_id"],
    solution: "SELECT a.nome, c.nome FROM alunos a JOIN cursos c ON c.id = a.curso_id;",
  },
  {
    id: "join3", level: 2, title: "JOIN com três tabelas",
    lesson: `A tabela **matriculas** liga alunos a disciplinas. Para mostrar nomes, encadeie dois JOINs:

\`\`\`sql
SELECT a.nome, m.semestre
FROM matriculas m
JOIN alunos a ON a.id = m.aluno_id
JOIN disciplinas d ON d.id = m.disciplina_id;
\`\`\`

Cada JOIN traz mais uma tabela, e você pode continuar com WHERE, GROUP BY etc. normalmente.`,
    task: "Mostre o **nome do aluno**, o **nome da disciplina** e a **nota**, só das matrículas que **já têm nota**.",
    hints: ["Parta de matriculas e faça JOIN com alunos e com disciplinas.", "... WHERE m.nota IS NOT NULL"],
    solution: "SELECT a.nome, d.nome, m.nota FROM matriculas m JOIN alunos a ON a.id = m.aluno_id JOIN disciplinas d ON d.id = m.disciplina_id WHERE m.nota IS NOT NULL;",
  },
  {
    id: "insert", level: 2, title: "Inserindo dados: INSERT",
    lesson: `Até agora você só leu dados. O **INSERT** cria uma linha nova:

\`\`\`sql
INSERT INTO professores (id, nome, titulacao, salario)
VALUES (7, 'Lúcia Fontes', 'Mestrado', 9500);
\`\`\`

Liste as colunas e depois os valores **na mesma ordem**.

Aqui no treino, cada execução começa com o banco original, então pode testar à vontade.`,
    task: "Cadastre um novo curso: id **6**, nome **'Segurança da Informação'**, área **'Tecnologia'**, duração **5** semestres.",
    hints: ["As colunas de cursos são id, nome, area, duracao_semestres.", "INSERT INTO cursos (id, nome, area, duracao_semestres) VALUES (6, ...);"],
    solution: "INSERT INTO cursos (id, nome, area, duracao_semestres) VALUES (6, 'Segurança da Informação', 'Tecnologia', 5);",
    check: "SELECT * FROM cursos ORDER BY id;",
  },
  {
    id: "update", level: 2, title: "Alterando dados: UPDATE",
    lesson: `O **UPDATE** muda valores de linhas que já existem:

\`\`\`sql
UPDATE alunos
SET cidade = 'Niterói'
WHERE id = 3;
\`\`\`

**Cuidado:** sem WHERE, o UPDATE altera **todas** as linhas da tabela. Esse é o erro clássico em produção.

Você pode usar a própria coluna na conta: \`SET salario = salario + 500\`.`,
    task: "Dê um **aumento de 10%** no salário de todos os professores com titulação **'Doutorado'**.",
    hints: ["Aumentar 10% é multiplicar por 1.1.", "UPDATE professores SET salario = salario * 1.1 WHERE titulacao = 'Doutorado';"],
    solution: "UPDATE professores SET salario = salario * 1.1 WHERE titulacao = 'Doutorado';",
    check: "SELECT id, nome, titulacao, salario FROM professores ORDER BY id;",
  },
  {
    id: "delete", level: 2, title: "Apagando dados: DELETE",
    lesson: `O **DELETE** remove linhas:

\`\`\`sql
DELETE FROM matriculas
WHERE semestre = '2025.1';
\`\`\`

Mesma regra do UPDATE: **sem WHERE, apaga tudo.** Uma boa prática é rodar antes um \`SELECT\` com o mesmo WHERE, para ver o que vai sumir.`,
    task: "Apague as matrículas com **frequência abaixo de 50**.",
    hints: ["Filtre pela coluna frequencia.", "DELETE FROM matriculas WHERE frequencia < 50;"],
    solution: "DELETE FROM matriculas WHERE frequencia < 50;",
    check: "SELECT id, aluno_id, frequencia FROM matriculas ORDER BY id;",
  },

  // ---------- AVANÇADO ----------
  {
    id: "leftjoin", level: 3, title: "LEFT JOIN: quem não tem par",
    lesson: `O INNER JOIN some com as linhas sem par. O **LEFT JOIN** mantém **todas** as linhas da tabela da esquerda e preenche com NULL quando não há correspondência.

\`\`\`sql
SELECT p.nome, d.nome
FROM professores p
LEFT JOIN disciplinas d ON d.professor_id = p.id;
\`\`\`

Para contar com LEFT JOIN, use \`COUNT(coluna_da_direita)\` e não \`COUNT(*)\`: assim quem não tem par conta **0** em vez de 1.`,
    task: "Mostre o **nome de cada curso** e **quantos alunos** ele tem, **incluindo cursos sem nenhum aluno** (que devem aparecer com 0).",
    hints: ["Comece por cursos (esquerda) e faça LEFT JOIN com alunos.", "SELECT c.nome, COUNT(a.id) FROM cursos c LEFT JOIN alunos a ON a.curso_id = c.id GROUP BY c.id, c.nome;"],
    solution: "SELECT c.nome, COUNT(a.id) FROM cursos c LEFT JOIN alunos a ON a.curso_id = c.id GROUP BY c.id, c.nome;",
  },
  {
    id: "subquery", level: 3, title: "Subconsulta no WHERE",
    lesson: `Uma **subconsulta** é um SELECT dentro de outro. Quando ela devolve um único valor, dá para comparar direto:

\`\`\`sql
SELECT nome, salario
FROM professores
WHERE salario > (SELECT AVG(salario) FROM professores);
\`\`\`

O banco resolve primeiro a subconsulta (a média) e depois usa o resultado no filtro.`,
    task: "Mostre o **nome do aluno** e a **nota** de cada matrícula cuja nota está **acima da média geral** de todas as notas.",
    hints: ["A média geral é SELECT AVG(nota) FROM matriculas.", "... JOIN alunos ... WHERE m.nota > (SELECT AVG(nota) FROM matriculas);"],
    solution: "SELECT a.nome, m.nota FROM matriculas m JOIN alunos a ON a.id = m.aluno_id WHERE m.nota > (SELECT AVG(nota) FROM matriculas);",
  },
  {
    id: "notexists", level: 3, title: "Quem ficou de fora: NOT EXISTS",
    lesson: `O **NOT EXISTS** testa se uma subconsulta **não** encontra nenhuma linha. É o jeito clássico de achar "quem não tem":

\`\`\`sql
SELECT p.nome
FROM professores p
WHERE NOT EXISTS (
  SELECT 1 FROM disciplinas d WHERE d.professor_id = p.id
);
\`\`\`

A subconsulta é **correlacionada**: ela usa \`p.id\` da consulta de fora e roda uma vez para cada professor.

Outra forma de fazer o mesmo é um LEFT JOIN seguido de \`WHERE d.id IS NULL\`.`,
    task: "Mostre o **nome dos alunos** que **não têm nenhuma matrícula**.",
    hints: ["Para cada aluno, procure em matriculas por m.aluno_id = a.id.", "WHERE NOT EXISTS (SELECT 1 FROM matriculas m WHERE m.aluno_id = a.id)"],
    solution: "SELECT a.nome FROM alunos a WHERE NOT EXISTS (SELECT 1 FROM matriculas m WHERE m.aluno_id = a.id);",
  },
  {
    id: "case", level: 3, title: "Classificando com CASE",
    lesson: `O **CASE** é o "if" do SQL: devolve um valor conforme a condição.

\`\`\`sql
SELECT nome,
  CASE
    WHEN salario >= 12000 THEN 'Alto'
    WHEN salario >= 9000  THEN 'Médio'
    ELSE 'Base'
  END AS faixa
FROM professores;
\`\`\`

As condições são testadas **em ordem**, e vale a primeira verdadeira. Teste o NULL primeiro, porque comparações com NULL nunca são verdadeiras.`,
    task: "Para cada matrícula, mostre **id**, **nota** e a **situação**: **'Cursando'** se a nota é NULL, **'Aprovado'** se nota ≥ 6, **'Reprovado'** se nota < 6.",
    hints: ["Três ramos: WHEN nota IS NULL, WHEN nota >= 6 e ELSE.", "CASE WHEN nota IS NULL THEN 'Cursando' WHEN nota >= 6 THEN 'Aprovado' ELSE 'Reprovado' END"],
    solution: "SELECT id, nota, CASE WHEN nota IS NULL THEN 'Cursando' WHEN nota >= 6 THEN 'Aprovado' ELSE 'Reprovado' END FROM matriculas;",
  },
  {
    id: "joinhaving", level: 3, title: "JOIN + GROUP BY + HAVING",
    lesson: `Agora junte tudo: JOIN para chegar aos dados, GROUP BY para agrupar e HAVING para filtrar os grupos.

\`\`\`sql
SELECT c.nome, COUNT(*) AS disciplinas
FROM cursos c
JOIN disciplinas d ON d.curso_id = c.id
GROUP BY c.id, c.nome
HAVING COUNT(*) >= 3;
\`\`\`

Para chegar das notas aos professores, o caminho é matriculas → disciplinas → professores.`,
    task: "Mostre os professores cuja **média das notas** nas disciplinas que dão é **maior que 7**: **nome do professor** e **média arredondada em 2 casas**.",
    hints: ["JOIN professores → disciplinas (professor_id) → matriculas (disciplina_id).", "... GROUP BY p.id, p.nome HAVING AVG(m.nota) > 7;"],
    solution: "SELECT p.nome, ROUND(AVG(m.nota), 2) FROM professores p JOIN disciplinas d ON d.professor_id = p.id JOIN matriculas m ON m.disciplina_id = d.id GROUP BY p.id, p.nome HAVING AVG(m.nota) > 7;",
  },
  {
    id: "cte", level: 3, title: "Consultas em etapas: WITH (CTE)",
    lesson: `Uma **CTE** (Common Table Expression) dá nome a uma consulta intermediária, que você usa como se fosse uma tabela:

\`\`\`sql
WITH folha AS (
  SELECT titulacao, SUM(salario) AS total
  FROM professores
  GROUP BY titulacao
)
SELECT * FROM folha WHERE total > 20000;
\`\`\`

Ela deixa consultas grandes legíveis: cada etapa tem um nome e faz uma coisa só.`,
    task: "Com **WITH**, calcule a média de notas de cada aluno (só notas lançadas) e mostre os **3 alunos com maior média**: **nome** e **média arredondada em 2 casas**, da maior para a menor.",
    hints: ["Etapa 1 (CTE): SELECT aluno_id, AVG(nota) AS media FROM matriculas WHERE nota IS NOT NULL GROUP BY aluno_id.", "Etapa 2: JOIN da CTE com alunos, ORDER BY media DESC LIMIT 3."],
    solution: "WITH medias AS (SELECT aluno_id, AVG(nota) AS media FROM matriculas WHERE nota IS NOT NULL GROUP BY aluno_id) SELECT a.nome, ROUND(m.media, 2) FROM medias m JOIN alunos a ON a.id = m.aluno_id ORDER BY m.media DESC LIMIT 3;",
    ordered: true,
  },
  {
    id: "window", level: 3, title: "Ranking com funções de janela",
    lesson: `Funções de **janela** calculam sobre um grupo de linhas **sem juntar** as linhas como o GROUP BY faz. Cada linha continua lá, com um valor a mais.

\`\`\`sql
SELECT nome, titulacao, salario,
  RANK() OVER (PARTITION BY titulacao ORDER BY salario DESC) AS posicao
FROM professores;
\`\`\`

- \`PARTITION BY\` define os grupos, e o ranking recomeça em cada um.
- \`ORDER BY\` dentro do OVER define quem é o 1º.
- \`RANK()\` dá posições iguais em caso de empate. Também existem \`ROW_NUMBER()\` e \`DENSE_RANK()\`.`,
    task: "Monte o **ranking dos alunos dentro de cada curso** pela média das notas lançadas: **nome do curso**, **nome do aluno**, **média (2 casas)** e **posição** (1 = melhor média do curso).",
    hints: ["Reaproveite a CTE de médias do exercício anterior e faça JOIN com alunos e cursos.", "RANK() OVER (PARTITION BY a.curso_id ORDER BY m.media DESC)"],
    solution: "WITH medias AS (SELECT aluno_id, AVG(nota) AS media FROM matriculas WHERE nota IS NOT NULL GROUP BY aluno_id) SELECT c.nome, a.nome, ROUND(m.media, 2), RANK() OVER (PARTITION BY a.curso_id ORDER BY m.media DESC) FROM medias m JOIN alunos a ON a.id = m.aluno_id JOIN cursos c ON c.id = a.curso_id;",
  },
  {
    id: "final", level: 3, title: "Desafio final: taxa de aprovação",
    lesson: `Um truque muito usado: **SUM com CASE** conta só as linhas que atendem a uma condição.

\`\`\`sql
SELECT
  COUNT(*) AS total,
  SUM(CASE WHEN titulacao = 'Doutorado' THEN 1 ELSE 0 END) AS doutores
FROM professores;
\`\`\`

Para porcentagem, multiplique por **100.0** (com o ponto). Se as duas partes forem inteiras, o SQLite faz divisão inteira e 2/3 vira 0.`,
    task: "Para cada **disciplina com pelo menos 3 notas lançadas**, mostre: **nome da disciplina**, **total de notas**, **quantidade de aprovados** (nota ≥ 6) e **percentual de aprovação** arredondado em 1 casa, do maior percentual para o menor.",
    hints: ["COUNT(m.nota) conta só as notas lançadas. SUM(CASE WHEN m.nota >= 6 THEN 1 ELSE 0 END) conta os aprovados.", "Percentual: ROUND(100.0 * aprovados / total, 1). Filtre com HAVING COUNT(m.nota) >= 3."],
    solution: "SELECT d.nome, COUNT(m.nota), SUM(CASE WHEN m.nota >= 6 THEN 1 ELSE 0 END), ROUND(100.0 * SUM(CASE WHEN m.nota >= 6 THEN 1 ELSE 0 END) / COUNT(m.nota), 1) FROM disciplinas d JOIN matriculas m ON m.disciplina_id = d.id GROUP BY d.id, d.nome HAVING COUNT(m.nota) >= 3 ORDER BY 4 DESC;",
  },

  // ---------- EXPERT ----------
  {
    id: "union", level: 4, title: "Juntando resultados: UNION",
    lesson: `O **UNION** empilha o resultado de dois SELECTs, um embaixo do outro. As duas consultas precisam ter o **mesmo número de colunas**, com tipos compatíveis.

\`\`\`sql
SELECT nome, 'Curso' AS tipo FROM cursos
UNION ALL
SELECT nome, 'Disciplina' FROM disciplinas;
\`\`\`

- \`UNION\` remove linhas duplicadas, por isso é mais lento.
- \`UNION ALL\` mantém tudo e é mais rápido. Use quando você sabe que não há repetição.
- O nome das colunas vem do **primeiro** SELECT.`,
    task: "Liste **nome** e **papel** de todas as pessoas (alunos e professores) cujo nome começa com **\"M\"**. O papel deve ser o texto **'Aluno'** ou **'Professor'**.",
    hints: ["Um SELECT em alunos e outro em professores, cada um com o papel como texto fixo.", "SELECT nome, 'Aluno' FROM alunos WHERE nome LIKE 'M%' UNION ALL SELECT nome, 'Professor' FROM professores WHERE nome LIKE 'M%';"],
    solution: "SELECT nome, 'Aluno' FROM alunos WHERE nome LIKE 'M%' UNION ALL SELECT nome, 'Professor' FROM professores WHERE nome LIKE 'M%';",
  },
  {
    id: "scalar", level: 4, title: "Subconsulta no SELECT",
    lesson: `Uma subconsulta também pode aparecer **no SELECT**, calculando um valor para cada linha. Isso é uma **subconsulta escalar correlacionada**:

\`\`\`sql
SELECT p.nome,
  (SELECT COUNT(*) FROM disciplinas d WHERE d.professor_id = p.id) AS qtd_disciplinas
FROM professores p;
\`\`\`

Ela precisa devolver **um único valor**. Em tabelas grandes, o mesmo resultado com JOIN + GROUP BY costuma ser mais rápido. Saber as duas formas é o que a entrevista técnica pergunta.`,
    task: "Para **cada aluno**, mostre o **nome** e quantas disciplinas ele já foi **aprovado** (nota ≥ 6). Alunos sem aprovação devem aparecer com **0**.",
    hints: ["Use uma subconsulta no SELECT contando as matrículas do aluno com nota >= 6.", "SELECT a.nome, (SELECT COUNT(*) FROM matriculas m WHERE m.aluno_id = a.id AND m.nota >= 6) FROM alunos a;"],
    solution: "SELECT a.nome, (SELECT COUNT(*) FROM matriculas m WHERE m.aluno_id = a.id AND m.nota >= 6) FROM alunos a;",
  },
  {
    id: "pivot", level: 4, title: "Pivot: linhas viram colunas",
    lesson: `Relatórios costumam pedir uma coluna por categoria. Sem um comando PIVOT (o SQLite não tem), use **agregação condicional**:

\`\`\`sql
SELECT titulacao,
  SUM(CASE WHEN salario <  10000 THEN 1 ELSE 0 END) AS ate_10k,
  SUM(CASE WHEN salario >= 10000 THEN 1 ELSE 0 END) AS acima_10k
FROM professores
GROUP BY titulacao;
\`\`\`

Cada \`SUM(CASE ...)\` vira uma coluna. Essa técnica funciona em qualquer banco.`,
    task: "Para cada **curso que tem alunos**, mostre o **nome do curso** e a quantidade de alunos que ingressaram em **2021**, **2022**, **2023** e **2024**, uma coluna para cada ano (nessa ordem).",
    hints: ["JOIN cursos com alunos, GROUP BY curso e quatro SUM(CASE WHEN a.ano_ingresso = ... THEN 1 ELSE 0 END).", "SELECT c.nome, SUM(CASE WHEN a.ano_ingresso = 2021 THEN 1 ELSE 0 END), ... FROM cursos c JOIN alunos a ON a.curso_id = c.id GROUP BY c.id, c.nome;"],
    solution: "SELECT c.nome, SUM(CASE WHEN a.ano_ingresso = 2021 THEN 1 ELSE 0 END), SUM(CASE WHEN a.ano_ingresso = 2022 THEN 1 ELSE 0 END), SUM(CASE WHEN a.ano_ingresso = 2023 THEN 1 ELSE 0 END), SUM(CASE WHEN a.ano_ingresso = 2024 THEN 1 ELSE 0 END) FROM cursos c JOIN alunos a ON a.curso_id = c.id GROUP BY c.id, c.nome;",
  },
  {
    id: "topn", level: 4, title: "Top 1 por grupo com ROW_NUMBER",
    lesson: `"O melhor de cada grupo" é um problema clássico. A solução moderna numera as linhas dentro de cada grupo e depois filtra a número 1:

\`\`\`sql
WITH ranqueado AS (
  SELECT nome, titulacao, salario,
    ROW_NUMBER() OVER (PARTITION BY titulacao ORDER BY salario DESC) AS rn
  FROM professores
)
SELECT nome, titulacao, salario FROM ranqueado WHERE rn = 1;
\`\`\`

Não dá para colocar \`WHERE rn = 1\` direto na mesma consulta, porque o WHERE roda **antes** das funções de janela. Por isso a CTE.`,
    task: "Para cada **disciplina**, mostre o **nome da disciplina**, o **nome do aluno com a maior nota** e essa **nota**.",
    hints: ["Na CTE, faça JOIN de matriculas com alunos e disciplinas e numere com ROW_NUMBER() OVER (PARTITION BY disciplina ORDER BY nota DESC). Lembre de ignorar notas NULL.", "... WHERE m.nota IS NOT NULL) SELECT disciplina, aluno, nota FROM ranqueado WHERE rn = 1;"],
    solution: "WITH ranqueado AS (SELECT d.nome AS disciplina, a.nome AS aluno, m.nota, ROW_NUMBER() OVER (PARTITION BY m.disciplina_id ORDER BY m.nota DESC) AS rn FROM matriculas m JOIN alunos a ON a.id = m.aluno_id JOIN disciplinas d ON d.id = m.disciplina_id WHERE m.nota IS NOT NULL) SELECT disciplina, aluno, nota FROM ranqueado WHERE rn = 1;",
  },
  {
    id: "lag", level: 4, title: "Comparando com a linha anterior: LAG",
    lesson: `**LAG(col)** devolve o valor da linha **anterior** (segundo o ORDER BY da janela), e **LEAD(col)** devolve o da **próxima**.

\`\`\`sql
SELECT nome, ano_ingresso,
  LAG(nome) OVER (ORDER BY ano_ingresso, nome) AS veio_antes
FROM alunos;
\`\`\`

Na primeira linha não existe anterior, então o resultado é NULL. Dá para trocar por um padrão: \`LAG(col, 1, 0)\`.`,
    task: "Liste os professores do **menor para o maior salário** com **nome**, **salario** e a **diferença para o salário anterior** da lista (NULL para o primeiro).",
    hints: ["salario - LAG(salario) OVER (ORDER BY salario)", "SELECT nome, salario, salario - LAG(salario) OVER (ORDER BY salario) FROM professores ORDER BY salario;"],
    solution: "SELECT nome, salario, salario - LAG(salario) OVER (ORDER BY salario) FROM professores ORDER BY salario;",
    ordered: true,
  },
  {
    id: "running", level: 4, title: "Total acumulado",
    lesson: `Com **SUM() OVER (ORDER BY ...)**, a soma vai acumulando linha a linha. É o famoso *running total*:

\`\`\`sql
SELECT id, salario,
  SUM(salario) OVER (ORDER BY id) AS folha_acumulada
FROM professores;
\`\`\`

Você pode aplicar uma janela sobre um resultado já agrupado. Primeiro o GROUP BY calcula, depois a janela roda em cima dele:

\`\`\`sql
SELECT curso_id, COUNT(*) AS qtd,
  SUM(COUNT(*)) OVER (ORDER BY curso_id) AS acumulado
FROM disciplinas GROUP BY curso_id;
\`\`\``,
    task: "Para cada **ano de ingresso**, mostre o **ano**, **quantos alunos** entraram naquele ano e o **total acumulado** de alunos até aquele ano, em ordem crescente de ano.",
    hints: ["GROUP BY ano_ingresso com COUNT(*), e por cima SUM(COUNT(*)) OVER (ORDER BY ano_ingresso).", "SELECT ano_ingresso, COUNT(*), SUM(COUNT(*)) OVER (ORDER BY ano_ingresso) FROM alunos GROUP BY ano_ingresso ORDER BY ano_ingresso;"],
    solution: "SELECT ano_ingresso, COUNT(*), SUM(COUNT(*)) OVER (ORDER BY ano_ingresso) FROM alunos GROUP BY ano_ingresso ORDER BY ano_ingresso;",
    ordered: true,
  },
  {
    id: "recursive", level: 4, title: "Gerando séries: WITH RECURSIVE",
    lesson: `Uma CTE **recursiva** se chama a si mesma. Ela tem uma parte inicial e uma parte que repete até a condição parar:

\`\`\`sql
WITH RECURSIVE n(x) AS (
  SELECT 1            -- ponto de partida
  UNION ALL
  SELECT x + 1 FROM n WHERE x < 5   -- passo, até a condição falhar
)
SELECT x FROM n;      -- 1, 2, 3, 4, 5
\`\`\`

Uso clássico: gerar uma sequência (datas, anos) para fazer LEFT JOIN e mostrar **os buracos**, ou seja, os períodos sem nenhum registro. Também serve para percorrer hierarquias, como chefe → subordinado.`,
    task: "Gere os anos de **2021 a 2025** e mostre, para cada um, o **ano** e **quantos alunos ingressaram** (0 quando ninguém entrou), em ordem crescente.",
    hints: ["WITH RECURSIVE anos(ano) AS (SELECT 2021 UNION ALL SELECT ano + 1 FROM anos WHERE ano < 2025)", "... SELECT an.ano, COUNT(a.id) FROM anos an LEFT JOIN alunos a ON a.ano_ingresso = an.ano GROUP BY an.ano ORDER BY an.ano;"],
    solution: "WITH RECURSIVE anos(ano) AS (SELECT 2021 UNION ALL SELECT ano + 1 FROM anos WHERE ano < 2025) SELECT an.ano, COUNT(a.id) FROM anos an LEFT JOIN alunos a ON a.ano_ingresso = an.ano GROUP BY an.ano ORDER BY an.ano;",
    ordered: true,
  },
  {
    id: "view", level: 4, title: "Criando uma VIEW",
    lesson: `Uma **VIEW** é uma consulta salva com nome, que você usa como se fosse uma tabela. Ela não guarda dados, só a consulta.

\`\`\`sql
CREATE VIEW vw_docentes AS
SELECT p.nome AS professor, d.nome AS disciplina
FROM professores p JOIN disciplinas d ON d.professor_id = p.id;

SELECT * FROM vw_docentes WHERE professor LIKE 'C%';
\`\`\`

Os **apelidos (AS)** viram os nomes das colunas da view. Views simplificam relatórios e ajudam a controlar o que cada usuário pode ver.`,
    task: "Crie a view **vw_boletim** com as colunas **aluno** (nome do aluno), **disciplina** (nome da disciplina) e **nota**, contendo só as matrículas **com nota lançada**.",
    hints: ["CREATE VIEW vw_boletim AS SELECT a.nome AS aluno, d.nome AS disciplina, m.nota FROM ...", "... JOIN alunos a ON a.id = m.aluno_id JOIN disciplinas d ON d.id = m.disciplina_id WHERE m.nota IS NOT NULL;"],
    solution: "CREATE VIEW vw_boletim AS SELECT a.nome AS aluno, d.nome AS disciplina, m.nota FROM matriculas m JOIN alunos a ON a.id = m.aluno_id JOIN disciplinas d ON d.id = m.disciplina_id WHERE m.nota IS NOT NULL;",
    check: "SELECT aluno, disciplina, nota FROM vw_boletim ORDER BY aluno, disciplina;",
  },
  {
    id: "ctas", level: 4, title: "Criando tabela e preenchendo com INSERT … SELECT",
    lesson: `Você pode criar uma tabela e preenchê-la com o **resultado de uma consulta**:

\`\`\`sql
CREATE TABLE folha (
  titulacao TEXT PRIMARY KEY,
  total REAL NOT NULL
);

INSERT INTO folha (titulacao, total)
SELECT titulacao, SUM(salario) FROM professores GROUP BY titulacao;
\`\`\`

Restrições úteis no CREATE TABLE: \`PRIMARY KEY\`, \`NOT NULL\`, \`UNIQUE\`, \`CHECK (nota BETWEEN 0 AND 10)\`, \`REFERENCES outra(id)\`.`,
    task: "Crie a tabela **historico** com as colunas **aluno_id** (INTEGER, chave primária) e **media** (REAL), e preencha com a **média das notas lançadas** de cada aluno que tem nota.",
    hints: ["Dois comandos separados por ponto e vírgula: CREATE TABLE ... ; INSERT INTO historico ... SELECT ...;", "INSERT INTO historico (aluno_id, media) SELECT aluno_id, AVG(nota) FROM matriculas WHERE nota IS NOT NULL GROUP BY aluno_id;"],
    solution: "CREATE TABLE historico (aluno_id INTEGER PRIMARY KEY, media REAL); INSERT INTO historico (aluno_id, media) SELECT aluno_id, AVG(nota) FROM matriculas WHERE nota IS NOT NULL GROUP BY aluno_id;",
    check: "SELECT aluno_id, ROUND(media, 2) FROM historico ORDER BY aluno_id;",
  },
  {
    id: "index", level: 4, title: "Índices e plano de execução",
    lesson: `Um **índice** funciona como o índice remissivo de um livro: em vez de ler a tabela inteira (*full scan*), o banco pula direto para as linhas certas.

\`\`\`sql
CREATE INDEX idx_alunos_cidade ON alunos (cidade);

EXPLAIN QUERY PLAN
SELECT nome FROM alunos WHERE cidade = 'Niterói';
-- SEARCH alunos USING INDEX idx_alunos_cidade (cidade=?)
\`\`\`

Quando criar índices:
- em colunas muito usadas em **WHERE** e em **JOIN** (chaves estrangeiras!);
- não em tudo: cada índice deixa INSERT e UPDATE mais lentos e ocupa espaço.

Use **EXPLAIN QUERY PLAN** para ver se o índice está sendo usado: SCAN lê a tabela inteira, SEARCH usa o índice.`,
    task: "Crie um índice chamado **idx_matriculas_aluno** na tabela **matriculas**, coluna **aluno_id**. Depois, se quiser, confira com EXPLAIN QUERY PLAN.",
    hints: ["CREATE INDEX nome_do_indice ON tabela (coluna);", "CREATE INDEX idx_matriculas_aluno ON matriculas (aluno_id);"],
    solution: "CREATE INDEX idx_matriculas_aluno ON matriculas (aluno_id);",
    check: "SELECT m.name, m.tbl_name, i.name FROM sqlite_master m, pragma_index_info(m.name) i WHERE m.type = 'index' AND m.name = 'idx_matriculas_aluno';",
  },
  {
    id: "expert-final", level: 4, title: "Desafio expert: relatório por curso",
    lesson: `Hora de juntar tudo num relatório de verdade: **CTEs em sequência**, agregação e janela.

\`\`\`sql
WITH etapa1 AS (...),
     etapa2 AS (SELECT ... FROM etapa1 ...)
SELECT ... FROM etapa2 ...;
\`\`\`

Dá para declarar várias CTEs separadas por vírgula, e cada uma pode usar as anteriores. Quebre o problema em etapas pequenas e teste cada uma com **Executar** antes de juntar.`,
    task: "Para cada **curso com pelo menos um aluno com nota**, mostre: **nome do curso**, **quantidade de alunos com nota**, **média de todas as notas** desses alunos (2 casas) e o **nome do aluno com a maior média** no curso.",
    hints: ["Etapa 1: média por aluno (aluno_id, curso_id, media). Etapa 2: ROW_NUMBER() por curso ordenado pela média DESC.", "Para a média do curso, use AVG(m.nota) juntando alunos e matriculas do curso, e junte com a etapa 2 filtrando rn = 1."],
    solution: "WITH notas AS (SELECT a.id AS aluno_id, a.nome, a.curso_id, m.nota FROM alunos a JOIN matriculas m ON m.aluno_id = a.id WHERE m.nota IS NOT NULL), medias AS (SELECT aluno_id, nome, curso_id, AVG(nota) AS media FROM notas GROUP BY aluno_id, nome, curso_id), melhor AS (SELECT curso_id, nome, ROW_NUMBER() OVER (PARTITION BY curso_id ORDER BY media DESC) AS rn FROM medias), resumo AS (SELECT curso_id, COUNT(DISTINCT aluno_id) AS qtd, ROUND(AVG(nota), 2) AS media FROM notas GROUP BY curso_id) SELECT c.nome, r.qtd, r.media, b.nome FROM resumo r JOIN cursos c ON c.id = r.curso_id JOIN melhor b ON b.curso_id = r.curso_id AND b.rn = 1;",
  },
];

module.exports = { SEED, EXERCISES };
