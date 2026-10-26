// Trilha de C#: do zero ao avançado. A saída esperada de cada exercício
// vem da execução real da solução (cs-expected.json, gerado por run-cs.js).
const cs = String.raw;

// level: 1 Primeiros passos, 2 Básico, 3 Intermediário (POO e coleções), 4 Avançado
// input: o que o "usuário digita" (stdin), uma linha por valor
// reqs: o que o código precisa usar; a IA confere, para não valer imprimir a resposta pronta
const EXERCISES = [
  // ---------- PRIMEIROS PASSOS ----------
  {
    id: "ola", level: 1, title: "Olá, mundo!",
    lesson: `Todo programa C# começa executando as instruções de cima para baixo. Para mostrar um texto na tela, use **Console.WriteLine**:

\`\`\`csharp
Console.WriteLine("Bom dia!");
\`\`\`

- O texto vai entre **aspas duplas**.
- Toda instrução termina com **ponto e vírgula**.
- C# diferencia maiúsculas de minúsculas: \`console.writeline\` não funciona.

Nas versões modernas do .NET (6 ou mais) você escreve as instruções direto no arquivo. Em códigos antigos você vai ver tudo dentro de \`class Program { static void Main() { ... } }\`, que faz a mesma coisa.`,
    task: "Escreva um programa que mostre exatamente **Olá, mundo!** na tela.",
    reqs: ["Usa Console.WriteLine"],
    hints: ["É uma linha só, igual ao exemplo, trocando o texto.", "Console.WriteLine(\"Olá, mundo!\");"],
    starter: "",
    solution: cs`Console.WriteLine("Olá, mundo!");`,
  },
  {
    id: "linhas", level: 1, title: "Várias linhas: Write e WriteLine",
    lesson: `**WriteLine** escreve e pula para a próxima linha. **Write** escreve e continua na mesma linha:

\`\`\`csharp
Console.Write("Carregando");
Console.Write("...");
Console.WriteLine(" pronto!");   // Carregando... pronto!
Console.WriteLine("Próxima linha");
\`\`\`

Linhas que começam com \`//\` são **comentários**: o compilador ignora, e servem para explicar o código.`,
    task: "Mostre exatamente estas 4 linhas. A primeira linha deve ser montada com **dois Console.Write** seguidos de um WriteLine vazio.",
    reqs: ["A primeira linha é escrita com pelo menos dois Console.Write", "As outras linhas usam Console.WriteLine"],
    hints: ["Console.Write(\"Bem-vindo \"); Console.Write(\"ao C#!\"); Console.WriteLine(); depois três WriteLine.", "Console.WriteLine(\"- variáveis\");"],
    starter: "",
    solution: cs`Console.Write("Bem-vindo ");
Console.Write("ao C#!");
Console.WriteLine();
Console.WriteLine("Hoje vou aprender:");
Console.WriteLine("- variáveis");
Console.WriteLine("- condições");`,
  },
  {
    id: "variaveis", level: 1, title: "Variáveis e tipos",
    lesson: `Uma **variável** guarda um valor com um nome. Em C# toda variável tem um **tipo**:

| Tipo | Guarda | Exemplo |
|---|---|---|
| \`int\` | número inteiro | \`int ano = 2025;\` |
| \`double\` | número com casas decimais | \`double nota = 7.5;\` |
| \`string\` | texto | \`string curso = "ADS";\` |
| \`bool\` | verdadeiro ou falso | \`bool ativo = true;\` |

Para juntar texto com variável, use \`+\`:

\`\`\`csharp
string curso = "ADS";
Console.WriteLine("Curso: " + curso);
\`\`\`

No código, o decimal usa **ponto** (\`1.65\`), nunca vírgula. Um \`bool\` aparece como \`True\` ou \`False\` na tela.`,
    task: "Crie as variáveis **nome** = \"Ana\", **idade** = 20, **altura** = 1.65 e **estudante** = true, cada uma com o tipo certo, e mostre as 4 linhas abaixo usando as variáveis.",
    reqs: ["Declara variáveis string, int, double e bool", "As linhas são montadas a partir das variáveis (não é o texto pronto)"],
    hints: ["string nome = \"Ana\"; int idade = 20; double altura = 1.65; bool estudante = true;", "Console.WriteLine(\"Nome: \" + nome);"],
    starter: "",
    solution: cs`string nome = "Ana";
int idade = 20;
double altura = 1.65;
bool estudante = true;

Console.WriteLine("Nome: " + nome);
Console.WriteLine("Idade: " + idade);
Console.WriteLine("Altura: " + altura);
Console.WriteLine("Estudante: " + estudante);`,
  },
  {
    id: "operadores", level: 1, title: "Operações matemáticas",
    lesson: `Operadores aritméticos: \`+\` \`-\` \`*\` \`/\` e \`%\` (resto da divisão).

**Pegadinha clássica:** a divisão entre dois \`int\` dá um \`int\`, e a parte decimal é **jogada fora**:

\`\`\`csharp
int x = 7, y = 2;
Console.WriteLine(x / y);           // 3   (não 3.5!)
Console.WriteLine(x % y);           // 1   (resto)
Console.WriteLine((double)x / y);   // 3.5 (converte antes de dividir)
\`\`\`

O \`(double)\` na frente é um **cast**: converte o valor para double antes da conta.`,
    task: "Com **int a = 17** e **int b = 5**, mostre as 6 linhas abaixo calculando cada resultado com as variáveis.",
    reqs: ["Declara int a = 17 e int b = 5", "Cada resultado é calculado com a e b (incluindo a divisão real com cast para double)"],
    hints: ["Console.WriteLine(\"17 + 5 = \" + (a + b)); repare nos parênteses em volta da conta.", "Para a divisão real: (double)a / b"],
    starter: "int a = 17;\nint b = 5;\n",
    solution: cs`int a = 17;
int b = 5;

Console.WriteLine("17 + 5 = " + (a + b));
Console.WriteLine("17 - 5 = " + (a - b));
Console.WriteLine("17 * 5 = " + (a * b));
Console.WriteLine("17 / 5 = " + (a / b));
Console.WriteLine("17 % 5 = " + (a % b));
Console.WriteLine("17 / 5 (real) = " + ((double)a / b));`,
  },
  {
    id: "interpolacao", level: 1, title: "Interpolação de strings",
    lesson: `Concatenar com \`+\` fica confuso rápido. A **interpolação** é mais limpa: coloque \`$\` antes das aspas e as variáveis entre chaves:

\`\`\`csharp
string aluno = "Bruno";
double media = 8.25;
Console.WriteLine($"{aluno} tirou {media:F1}");   // Bruno tirou 8.3
\`\`\`

- \`:F2\` formata com 2 casas decimais, \`:F1\` com 1.
- Dá para fazer contas dentro das chaves: \`{preco * qtd}\`.
- Para dinheiro, use o tipo **decimal** (com \`m\` no final: \`12.5m\`), que não tem erro de arredondamento.

Aqui o treino usa ponto como separador decimal. Num Windows em português, \`:F2\` mostraria vírgula.`,
    task: "Com **produto = \"Caderno\"**, **preco = 12.5m** (decimal) e **quantidade = 3**, mostre as 3 linhas abaixo usando **interpolação**. O total (preço × quantidade) deve ter **2 casas decimais**.",
    reqs: ["Usa interpolação de strings ($\"...\")", "Usa decimal para o preço", "O total é calculado (preco * quantidade) e formatado com F2"],
    hints: ["decimal preco = 12.5m; e no final: $\"Total: R$ {preco * quantidade:F2}\"", "Console.WriteLine($\"Produto: {produto}\");"],
    starter: "",
    solution: cs`string produto = "Caderno";
decimal preco = 12.5m;
int quantidade = 3;

Console.WriteLine($"Produto: {produto}");
Console.WriteLine($"Quantidade: {quantidade}");
Console.WriteLine($"Total: R$ {preco * quantidade:F2}");`,
  },
  {
    id: "strings", level: 1, title: "Trabalhando com textos",
    lesson: `Toda \`string\` vem com várias ferramentas prontas (métodos e propriedades):

\`\`\`csharp
string s = "Banco de Dados";
s.ToUpper()             // "BANCO DE DADOS"
s.ToLower()             // "banco de dados"
s.Length                // 14  (quantidade de caracteres)
s.Contains("Dados")     // True
s.Substring(0, 5)       // "Banco"  (a partir da posição 0, 5 caracteres)
s.Replace("Dados", "Informações")
\`\`\`

As posições começam em **0**. Strings são **imutáveis**: \`ToUpper()\` devolve uma string nova e não muda a original.`,
    task: "Com **curso = \"Análise e Desenvolvimento de Sistemas\"**, mostre as 5 linhas abaixo usando os métodos de string (nada de digitar o resultado à mão).",
    reqs: ["Usa ToUpper, Length, Contains, Substring e Replace sobre a variável curso"],
    hints: ["Console.WriteLine($\"Maiúsculas: {curso.ToUpper()}\");", "Substring(0, 7) pega \"Análise\". Replace(\"Sistemas\", \"Software\")."],
    starter: "string curso = \"Análise e Desenvolvimento de Sistemas\";\n",
    solution: cs`string curso = "Análise e Desenvolvimento de Sistemas";

Console.WriteLine($"Maiúsculas: {curso.ToUpper()}");
Console.WriteLine($"Tamanho: {curso.Length}");
Console.WriteLine($"Tem 'Sistemas'? {curso.Contains("Sistemas")}");
Console.WriteLine($"Primeira palavra: {curso.Substring(0, 7)}");
Console.WriteLine($"Trocado: {curso.Replace("Sistemas", "Software")}");`,
  },
  {
    id: "conversao", level: 1, title: "Convertendo tipos",
    lesson: `Tudo que vem do teclado ou de um arquivo chega como **texto**. Para fazer conta, converta:

\`\`\`csharp
int n = int.Parse("42");             // texto -> int
double d = double.Parse("3.14");     // texto -> double
string t = n.ToString();             // número -> texto

int truncado = (int)9.99;            // 9  (cast corta as casas)
double arred = Math.Round(9.5);      // 10
\`\`\`

Se o texto não for um número válido, \`int.Parse\` dá erro. Mais adiante você vai ver o \`int.TryParse\`, que não quebra o programa.`,
    task: "Com **idadeTexto = \"21\"** e **nota = 7.8**, mostre as 3 linhas abaixo: a idade convertida **mais 1**, a nota **truncada** com cast e a nota **arredondada** com Math.Round.",
    reqs: ["Converte idadeTexto com int.Parse (ou Convert.ToInt32) e soma 1", "Usa cast (int) para truncar", "Usa Math.Round para arredondar"],
    hints: ["int idade = int.Parse(idadeTexto);", "Console.WriteLine($\"Nota truncada: {(int)nota}\");"],
    starter: "string idadeTexto = \"21\";\ndouble nota = 7.8;\n",
    solution: cs`string idadeTexto = "21";
double nota = 7.8;

int idade = int.Parse(idadeTexto);
Console.WriteLine($"Ano que vem: {idade + 1}");
Console.WriteLine($"Nota truncada: {(int)nota}");
Console.WriteLine($"Nota arredondada: {Math.Round(nota)}");`,
  },
  {
    id: "teclado", level: 1, title: "Lendo do teclado",
    lesson: `**Console.ReadLine()** espera o usuário digitar uma linha e devolve o texto:

\`\`\`csharp
Console.Write("Qual sua cidade? ");
string cidade = Console.ReadLine();
Console.WriteLine($"Você mora em {cidade}.");
\`\`\`

Para números, converta o que foi lido: \`int.Parse(Console.ReadLine())\`.

Aqui no treino, o que "o usuário digita" aparece no quadro **Entrada**. O que você escreve com \`Console.Write\` como pergunta também entra na saída, então siga o modelo exatamente.`,
    task: "Leia o **nome** e depois a **idade** do usuário e mostre a mensagem abaixo, com a idade do ano que vem calculada. Não escreva perguntas na tela, só a mensagem final.",
    reqs: ["Lê o nome e a idade com Console.ReadLine", "Converte a idade para número e soma 1"],
    hints: ["string nome = Console.ReadLine(); int idade = int.Parse(Console.ReadLine());", "Console.WriteLine($\"Olá, {nome}! Ano que vem você terá {idade + 1} anos.\");"],
    input: "Marcelo\n29",
    starter: "",
    solution: cs`string nome = Console.ReadLine();
int idade = int.Parse(Console.ReadLine());
Console.WriteLine($"Olá, {nome}! Ano que vem você terá {idade + 1} anos.");`,
  },

  // ---------- BÁSICO ----------
  {
    id: "ifelse", level: 2, title: "Decisões com if / else",
    lesson: `O **if** executa um bloco só quando a condição é verdadeira. O **else** é o "senão":

\`\`\`csharp
int idade = 16;
if (idade >= 18)
{
    Console.WriteLine("Pode votar e dirigir");
}
else
{
    Console.WriteLine("Ainda não pode dirigir");
}
\`\`\`

Operadores de comparação: \`==\` (igual, com **dois** sinais), \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.`,
    task: "Leia uma **nota** (double) do teclado e mostre **Aprovado** se ela for maior ou igual a 6, ou **Reprovado** caso contrário.",
    reqs: ["Lê e converte a nota", "Usa if/else comparando com 6"],
    hints: ["double nota = double.Parse(Console.ReadLine());", "if (nota >= 6) { ... } else { ... }"],
    input: "5.5",
    starter: "",
    solution: cs`double nota = double.Parse(Console.ReadLine());
if (nota >= 6)
{
    Console.WriteLine("Aprovado");
}
else
{
    Console.WriteLine("Reprovado");
}`,
  },
  {
    id: "elseif", level: 2, title: "Várias condições: else if, && e ||",
    lesson: `Encadeie **else if** para testar várias faixas. A primeira condição verdadeira vence:

\`\`\`csharp
if (temp >= 30)      Console.WriteLine("Quente");
else if (temp >= 20) Console.WriteLine("Agradável");
else                 Console.WriteLine("Frio");
\`\`\`

Operadores lógicos:
- \`&&\` (E): as duas condições precisam ser verdadeiras;
- \`||\` (OU): basta uma;
- \`!\` (NÃO): inverte.

\`\`\`csharp
if (nota >= 6 && frequencia >= 75) Console.WriteLine("Passou");
\`\`\``,
    task: "Leia a **nota** e depois a **frequência** (em %). Se a frequência for menor que 75, mostre **Reprovado por falta**. Senão, mostre o conceito: **A** (nota ≥ 9), **B** (≥ 7), **C** (≥ 6) ou **D** (abaixo de 6). Formato: \"Conceito: B\".",
    reqs: ["Usa if / else if / else", "Testa a frequência antes da nota"],
    hints: ["Primeiro: if (frequencia < 75) { ... } e depois else if (nota >= 9) ...", "Console.WriteLine(\"Conceito: B\"); dentro do ramo certo."],
    input: "8\n80",
    starter: "",
    solution: cs`double nota = double.Parse(Console.ReadLine());
int frequencia = int.Parse(Console.ReadLine());

if (frequencia < 75)
    Console.WriteLine("Reprovado por falta");
else if (nota >= 9)
    Console.WriteLine("Conceito: A");
else if (nota >= 7)
    Console.WriteLine("Conceito: B");
else if (nota >= 6)
    Console.WriteLine("Conceito: C");
else
    Console.WriteLine("Conceito: D");`,
  },
  {
    id: "switch", level: 2, title: "Escolhendo com switch",
    lesson: `Quando você compara a **mesma variável** com vários valores fixos, o **switch** fica mais limpo que vários if:

\`\`\`csharp
switch (opcao)
{
    case 1:
        Console.WriteLine("Cadastrar");
        break;
    case 2:
        Console.WriteLine("Listar");
        break;
    default:
        Console.WriteLine("Opção inválida");
        break;
}
\`\`\`

Cada \`case\` termina com \`break\`. O \`default\` pega qualquer outro valor.

Versão moderna, a **switch expression**, que devolve um valor:

\`\`\`csharp
string texto = opcao switch { 1 => "Cadastrar", 2 => "Listar", _ => "Opção inválida" };
\`\`\``,
    task: "Leia um número de **1 a 7** e mostre o dia da semana: 1 = **Domingo**, 2 = **Segunda-feira**, 3 = **Terça-feira**, 4 = **Quarta-feira**, 5 = **Quinta-feira**, 6 = **Sexta-feira**, 7 = **Sábado**; qualquer outro número = **Dia inválido**.",
    reqs: ["Usa switch (comando ou expressão)", "Tem um caso padrão para valores inválidos"],
    hints: ["int dia = int.Parse(Console.ReadLine()); depois switch (dia) { case 1: ... }", "Com switch expression: string nome = dia switch { 1 => \"Domingo\", ..., _ => \"Dia inválido\" };"],
    input: "3",
    starter: "",
    solution: cs`int dia = int.Parse(Console.ReadLine());
string nome = dia switch
{
    1 => "Domingo",
    2 => "Segunda-feira",
    3 => "Terça-feira",
    4 => "Quarta-feira",
    5 => "Quinta-feira",
    6 => "Sexta-feira",
    7 => "Sábado",
    _ => "Dia inválido"
};
Console.WriteLine(nome);`,
  },
  {
    id: "for", level: 2, title: "Repetição com for",
    lesson: `O **for** repete um bloco um número conhecido de vezes:

\`\`\`csharp
for (int i = 1; i <= 3; i++)
{
    Console.WriteLine($"Volta {i}");
}
\`\`\`

As três partes do for:
1. \`int i = 1\`: começa aqui;
2. \`i <= 3\`: continua enquanto isso for verdade;
3. \`i++\`: depois de cada volta, soma 1.

Também existe \`i--\` (contar para trás) e \`i += 2\` (de 2 em 2).`,
    task: "Mostre a **tabuada do 7**, de 1 a 10, no formato abaixo.",
    reqs: ["Usa um laço for", "Calcula o resultado (7 * i) em vez de escrever cada linha"],
    hints: ["for (int i = 1; i <= 10; i++)", "Console.WriteLine($\"7 x {i} = {7 * i}\");"],
    starter: "",
    solution: cs`for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"7 x {i} = {7 * i}");
}`,
  },
  {
    id: "while", level: 2, title: "Repetição com while",
    lesson: `O **while** repete **enquanto** a condição for verdadeira. Use quando você não sabe de antemão quantas voltas serão:

\`\`\`csharp
int saldo = 100;
while (saldo > 0)
{
    saldo -= 30;
    Console.WriteLine($"Saldo: {saldo}");
}
\`\`\`

**Cuidado:** se nada dentro do laço mudar a condição, ele roda para sempre (loop infinito).

O \`do { ... } while (cond);\` é parecido, mas executa o bloco **pelo menos uma vez** antes de testar.`,
    task: "Faça uma **contagem regressiva de 5 até 1** usando **while** e, ao final, mostre **Fogo!**.",
    reqs: ["Usa um laço while", "Decrementa um contador dentro do laço"],
    hints: ["int contador = 5; while (contador >= 1) { ... contador--; }", "Depois do laço: Console.WriteLine(\"Fogo!\");"],
    starter: "",
    solution: cs`int contador = 5;
while (contador >= 1)
{
    Console.WriteLine(contador);
    contador--;
}
Console.WriteLine("Fogo!");`,
  },
  {
    id: "continue", level: 2, title: "Controlando laços: break e continue",
    lesson: `Dentro de um laço:
- **continue** pula para a **próxima volta**, ignorando o resto do bloco;
- **break** **sai** do laço na hora.

\`\`\`csharp
for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0) continue;   // pula os pares
    if (i > 7) break;           // para de vez depois do 7
    Console.WriteLine(i);       // 1 3 5 7
}
\`\`\`

\`i % 3 == 0\` é o jeito de testar se \`i\` é múltiplo de 3 (o resto da divisão é zero).`,
    task: "Some todos os números de **1 a 100** que **não são múltiplos de 3**, usando **continue** para pular os múltiplos. Mostre o resultado no formato abaixo.",
    reqs: ["Usa um laço com continue para pular múltiplos de 3", "Acumula a soma numa variável"],
    hints: ["int soma = 0; for (int i = 1; i <= 100; i++) { if (i % 3 == 0) continue; soma += i; }", "Console.WriteLine($\"Soma: {soma}\");"],
    starter: "",
    solution: cs`int soma = 0;
for (int i = 1; i <= 100; i++)
{
    if (i % 3 == 0) continue;
    soma += i;
}
Console.WriteLine($"Soma: {soma}");`,
  },
  {
    id: "arrays", level: 2, title: "Arrays e foreach",
    lesson: `Um **array** guarda vários valores do mesmo tipo, com tamanho fixo:

\`\`\`csharp
int[] idades = { 18, 22, 30 };
Console.WriteLine(idades[0]);       // 18 (o índice começa em 0)
Console.WriteLine(idades.Length);   // 3

foreach (int idade in idades)
{
    Console.WriteLine(idade);
}
\`\`\`

O **foreach** percorre cada elemento sem você controlar o índice. Para média e maior valor, acumule dentro do laço.`,
    task: "Com **double[] notas = { 7.5, 8.0, 6.5, 9.0, 5.5 }**, mostre cada nota (com 1 casa) usando **foreach**, depois a **média** (2 casas) e a **maior nota** (1 casa), calculadas dentro do laço, sem LINQ.",
    reqs: ["Usa foreach para percorrer o array", "Calcula soma e maior valor manualmente (sem LINQ Average/Max)"],
    hints: ["double soma = 0, maior = notas[0]; foreach (double n in notas) { ... if (n > maior) maior = n; }", "Média: soma / notas.Length. Formatos: {n:F1} e {media:F2}."],
    starter: "double[] notas = { 7.5, 8.0, 6.5, 9.0, 5.5 };\n",
    solution: cs`double[] notas = { 7.5, 8.0, 6.5, 9.0, 5.5 };
double soma = 0;
double maior = notas[0];

foreach (double n in notas)
{
    Console.WriteLine($"Nota: {n:F1}");
    soma += n;
    if (n > maior) maior = n;
}

double media = soma / notas.Length;
Console.WriteLine($"Média: {media:F2}");
Console.WriteLine($"Maior: {maior:F1}");`,
  },
  {
    id: "metodos", level: 2, title: "Criando métodos",
    lesson: `Um **método** é um bloco de código com nome, que você chama quando precisa. Ele evita repetição:

\`\`\`csharp
Console.WriteLine(Dobro(4));   // 8

static int Dobro(int n)
{
    return n * 2;
}
\`\`\`

As partes: \`static\`, depois o **tipo de retorno** (\`int\`; use \`void\` se não devolve nada), o **nome**, os **parâmetros** entre parênteses e o \`return\`.

Métodos de uma linha podem usar \`=>\`: \`static int Dobro(int n) => n * 2;\``,
    task: "Crie os métodos **Quadrado(int n)**, que devolve n², e **EhPar(int n)**, que devolve bool. Use-os num laço de **1 a 5** para mostrar as linhas abaixo.",
    reqs: ["Define o método Quadrado que retorna int", "Define o método EhPar que retorna bool", "Usa os dois métodos dentro de um laço"],
    hints: ["static int Quadrado(int n) => n * n;  static bool EhPar(int n) => n % 2 == 0;", "Console.WriteLine($\"{i}² = {Quadrado(i)} ({(EhPar(i) ? \"par\" : \"ímpar\")})\"); o ? : é o if de uma linha."],
    starter: "",
    solution: cs`for (int i = 1; i <= 5; i++)
{
    string tipo = EhPar(i) ? "par" : "ímpar";
    Console.WriteLine($"{i}² = {Quadrado(i)} ({tipo})");
}

static int Quadrado(int n) => n * n;
static bool EhPar(int n) => n % 2 == 0;`,
  },
  {
    id: "sobrecarga", level: 2, title: "Parâmetros opcionais e sobrecarga",
    lesson: `**Parâmetro opcional:** tem um valor padrão, usado quando quem chama não informa:

\`\`\`csharp
static string Saudar(string nome, string saudacao = "Olá") => $"{saudacao}, {nome}!";
Saudar("Ana");            // Olá, Ana!
Saudar("Ana", "Bom dia"); // Bom dia, Ana!
\`\`\`

**Sobrecarga:** vários métodos com o **mesmo nome** e **parâmetros diferentes**. O compilador escolhe pelo que você passa:

\`\`\`csharp
static class Calc
{
    public static int Somar(int a, int b) => a + b;
    public static int Somar(int a, int b, int c) => a + b + c;
}
// uso: Calc.Somar(1, 2) e Calc.Somar(1, 2, 3)
\`\`\`

**Pegadinha:** métodos escritos soltos no arquivo, fora de uma classe, são *funções locais* e **não aceitam sobrecarga**. O compilador acusa "já está definida neste escopo". Para sobrecarregar, coloque os métodos dentro de uma classe, como acima.`,
    task: "Crie a classe estática **Geometria** com **Area(double lado)**, para quadrado, e **Area(double baseRet, double altura)**, para retângulo (sobrecarga), e **Saudar(string nome, string saudacao = \"Olá\")**. Produza as 4 linhas abaixo.",
    reqs: ["Dois métodos Area com parâmetros diferentes (sobrecarga) dentro de uma classe", "Saudar tem parâmetro opcional com valor padrão \"Olá\"", "As linhas usam os métodos"],
    hints: ["static class Geometria { public static double Area(double lado) => lado * lado; public static double Area(double b, double h) => b * h; }", "Console.WriteLine($\"Quadrado de lado 4: {Geometria.Area(4)}\"); Console.WriteLine(Saudar(\"Bruno\", \"Bom dia\"));"],
    starter: "",
    solution: cs`Console.WriteLine($"Quadrado de lado 4: {Geometria.Area(4)}");
Console.WriteLine($"Retângulo 3 x 5: {Geometria.Area(3, 5)}");
Console.WriteLine(Saudar("Ana"));
Console.WriteLine(Saudar("Bruno", "Bom dia"));

static string Saudar(string nome, string saudacao = "Olá") => $"{saudacao}, {nome}!";

static class Geometria
{
    public static double Area(double lado) => lado * lado;
    public static double Area(double baseRet, double altura) => baseRet * altura;
}`,
  },
  {
    id: "vogais", level: 2, title: "Percorrendo uma string",
    lesson: `Uma string pode ser percorrida **caractere a caractere**. Cada um é um \`char\`, escrito entre aspas **simples**:

\`\`\`csharp
string palavra = "banana";
int qtdA = 0;
foreach (char c in palavra)
{
    if (c == 'a') qtdA++;
}
// qtdA = 3
\`\`\`

Úteis: \`char.ToLower(c)\`, \`"aeiou".Contains(c)\`, \`palavra[0]\` (primeiro caractere).

Para inverter, percorra de trás para frente: \`for (int i = s.Length - 1; i >= 0; i--)\`.`,
    task: "Com **frase = \"Programação em C# é divertido\"**, conte as **vogais** (considere \"aeiouáéíóúâêôãõ\", ignorando maiúsculas) e mostre também a frase **invertida**, usando laços.",
    reqs: ["Percorre a frase com um laço contando vogais", "Monta a frase invertida com um laço (não usa Array.Reverse nem LINQ)"],
    hints: ["string vogais = \"aeiouáéíóúâêôãõ\"; foreach (char c in frase) if (vogais.Contains(char.ToLower(c))) total++;", "string invertida = \"\"; for (int i = frase.Length - 1; i >= 0; i--) invertida += frase[i];"],
    starter: "string frase = \"Programação em C# é divertido\";\n",
    solution: cs`string frase = "Programação em C# é divertido";
string vogais = "aeiouáéíóúâêôãõ";

int total = 0;
foreach (char c in frase)
{
    if (vogais.Contains(char.ToLower(c))) total++;
}

string invertida = "";
for (int i = frase.Length - 1; i >= 0; i--)
{
    invertida += frase[i];
}

Console.WriteLine($"Vogais: {total}");
Console.WriteLine($"Invertida: {invertida}");`,
  },

  // ---------- INTERMEDIÁRIO ----------
  {
    id: "classes", level: 3, title: "Classes e objetos",
    lesson: `Uma **classe** é um molde: descreve que dados (campos e propriedades) e que comportamentos (métodos) algo tem. Um **objeto** é uma instância criada a partir do molde com \`new\`:

\`\`\`csharp
var c = new Carro();
c.Modelo = "Onix";
c.Buzinar();

class Carro
{
    public string Modelo = "";
    public void Buzinar() => Console.WriteLine($"{Modelo}: Bi-bi!");
}
\`\`\`

Nos programas com instruções no topo do arquivo, as **classes vão no final**, depois do código principal.`,
    task: "Crie a classe **Aluno** com **Nome** (string), **Nota** (double) e o método **Situacao()**, que devolve \"Aprovado\" se Nota ≥ 6 ou \"Reprovado\" caso contrário. Crie **Ana (8.5)** e **Bruno (4.0)** e mostre as linhas abaixo.",
    reqs: ["Define a classe Aluno com Nome, Nota e o método Situacao", "Cria dois objetos com new", "As linhas usam os objetos e o método"],
    hints: ["class Aluno { public string Nome = \"\"; public double Nota; public string Situacao() => Nota >= 6 ? \"Aprovado\" : \"Reprovado\"; }", "var a1 = new Aluno { Nome = \"Ana\", Nota = 8.5 }; Console.WriteLine($\"{a1.Nome}: {a1.Nota:F1} - {a1.Situacao()}\");"],
    starter: "",
    solution: cs`var a1 = new Aluno { Nome = "Ana", Nota = 8.5 };
var a2 = new Aluno { Nome = "Bruno", Nota = 4.0 };

Console.WriteLine($"{a1.Nome}: {a1.Nota:F1} - {a1.Situacao()}");
Console.WriteLine($"{a2.Nome}: {a2.Nota:F1} - {a2.Situacao()}");

class Aluno
{
    public string Nome = "";
    public double Nota;
    public string Situacao() => Nota >= 6 ? "Aprovado" : "Reprovado";
}`,
  },
  {
    id: "construtor", level: 3, title: "Propriedades e construtores",
    lesson: `**Propriedades** são o jeito padrão de expor dados numa classe. O **construtor** é o método que roda no \`new\` e garante que o objeto já nasce preenchido:

\`\`\`csharp
class Livro
{
    public string Titulo { get; }          // só leitura
    public int Paginas { get; set; }       // leitura e escrita

    public Livro(string titulo, int paginas)
    {
        Titulo = titulo;
        Paginas = paginas;
    }
}

var l = new Livro("C# Essencial", 320);
\`\`\`

O construtor tem o **mesmo nome da classe** e não tem tipo de retorno.`,
    task: "Crie a classe **Produto** com as propriedades **Nome** (só leitura), **Preco** (decimal) e **Estoque** (int), um **construtor** que recebe os três e o método **Descricao()**. Crie os dois produtos abaixo e mostre as linhas, com o preço em 2 casas.",
    reqs: ["Usa propriedades com { get; } / { get; set; }", "Tem construtor com parâmetros", "Cria os objetos passando os valores pelo construtor"],
    hints: ["public Produto(string nome, decimal preco, int estoque) { Nome = nome; Preco = preco; Estoque = estoque; }", "public string Descricao() => $\"{Nome} - R$ {Preco:F2} ({Estoque} em estoque)\";"],
    starter: "",
    solution: cs`var p1 = new Produto("Mouse", 59.9m, 15);
var p2 = new Produto("Teclado", 129.5m, 7);

Console.WriteLine(p1.Descricao());
Console.WriteLine(p2.Descricao());

class Produto
{
    public string Nome { get; }
    public decimal Preco { get; set; }
    public int Estoque { get; set; }

    public Produto(string nome, decimal preco, int estoque)
    {
        Nome = nome;
        Preco = preco;
        Estoque = estoque;
    }

    public string Descricao() => $"{Nome} - R$ {Preco:F2} ({Estoque} em estoque)";
}`,
  },
  {
    id: "encapsulamento", level: 3, title: "Encapsulamento",
    lesson: `**Encapsular** é esconder os dados internos e só permitir mudanças por métodos que **validam** as regras:

\`\`\`csharp
class Termometro
{
    private double _temperatura;               // ninguém de fora mexe direto
    public double Temperatura => _temperatura;  // de fora, só leitura

    public bool Ajustar(double nova)
    {
        if (nova < -50 || nova > 60) return false;  // regra protegida
        _temperatura = nova;
        return true;
    }
}
\`\`\`

\`private\` só é visível dentro da classe, e \`public\` é visível para todos. Esse é um dos 4 pilares da POO, junto com abstração, herança e polimorfismo.`,
    task: "Crie a classe **ContaBancaria** com saldo **privado**, a propriedade **Saldo** só leitura, **Depositar(decimal)**, que só aceita valores positivos, e **Sacar(decimal)**, que devolve false se não houver saldo. Execute: depositar 100, sacar 30, tentar sacar 200 e mostrar as linhas abaixo.",
    reqs: ["O saldo é um campo private", "Saldo é exposto só para leitura", "Sacar retorna bool e não deixa o saldo ficar negativo"],
    hints: ["private decimal _saldo; public decimal Saldo => _saldo;", "public bool Sacar(decimal v) { if (v > _saldo) return false; _saldo -= v; return true; }"],
    starter: "",
    solution: cs`var conta = new ContaBancaria();
conta.Depositar(100);
Console.WriteLine($"Depósito de 100. Saldo: {conta.Saldo:F2}");

bool ok1 = conta.Sacar(30);
Console.WriteLine($"Saque de 30: {(ok1 ? "ok" : "negado")}. Saldo: {conta.Saldo:F2}");

bool ok2 = conta.Sacar(200);
Console.WriteLine($"Saque de 200: {(ok2 ? "ok" : "negado")}. Saldo: {conta.Saldo:F2}");

class ContaBancaria
{
    private decimal _saldo;
    public decimal Saldo => _saldo;

    public void Depositar(decimal valor)
    {
        if (valor > 0) _saldo += valor;
    }

    public bool Sacar(decimal valor)
    {
        if (valor <= 0 || valor > _saldo) return false;
        _saldo -= valor;
        return true;
    }
}`,
  },
  {
    id: "heranca", level: 3, title: "Herança e override",
    lesson: `Com **herança**, uma classe filha reaproveita tudo da classe mãe e pode **especializar** comportamentos:

\`\`\`csharp
class Veiculo
{
    public string Nome = "";
    public virtual int Rodas() => 4;          // virtual: pode ser substituído
}

class Moto : Veiculo                           // Moto herda de Veiculo
{
    public override int Rodas() => 2;          // override: substitui
}
\`\`\`

- \`virtual\` na mãe e \`override\` na filha.
- \`base.Metodo()\` chama a versão da mãe dentro da filha.
- Construtor da filha chamando o da mãe: \`public Moto(string n) : base(n) { }\`.`,
    task: "Crie **Funcionario** com Nome, SalarioBase e o método **virtual CalcularSalario()**, que devolve o salário base. Crie **Professor : Funcionario** com **HorasAula**, que sobrescreve o cálculo para base + horas × 50. Mostre as duas linhas abaixo.",
    reqs: ["Professor herda de Funcionario", "CalcularSalario é virtual na base e override na filha", "Reaproveita o salário base (ex.: base.CalcularSalario())"],
    hints: ["public virtual decimal CalcularSalario() => SalarioBase;", "public override decimal CalcularSalario() => base.CalcularSalario() + HorasAula * 50;"],
    starter: "",
    solution: cs`var f = new Funcionario { Nome = "Carla", SalarioBase = 3000 };
var p = new Professor { Nome = "Roberto", SalarioBase = 3000, HorasAula = 40 };

Console.WriteLine($"{f.Nome}: R$ {f.CalcularSalario():F2}");
Console.WriteLine($"{p.Nome}: R$ {p.CalcularSalario():F2}");

class Funcionario
{
    public string Nome { get; set; } = "";
    public decimal SalarioBase { get; set; }
    public virtual decimal CalcularSalario() => SalarioBase;
}

class Professor : Funcionario
{
    public int HorasAula { get; set; }
    public override decimal CalcularSalario() => base.CalcularSalario() + HorasAula * 50;
}`,
  },
  {
    id: "interfaces", level: 3, title: "Interfaces e polimorfismo",
    lesson: `Uma **interface** é um contrato: diz **o que** a classe precisa ter, mas não **como**:

\`\`\`csharp
interface INotificador
{
    void Enviar(string msg);
}

class Email : INotificador { public void Enviar(string m) => Console.WriteLine($"Email: {m}"); }
class Sms   : INotificador { public void Enviar(string m) => Console.WriteLine($"SMS: {m}"); }
\`\`\`

**Polimorfismo:** você trata objetos diferentes pelo mesmo tipo, e cada um responde do seu jeito:

\`\`\`csharp
INotificador[] canais = { new Email(), new Sms() };
foreach (var c in canais) c.Enviar("Prova amanhã");
\`\`\`

Por convenção, o nome de toda interface começa com **I**.`,
    task: "Crie a interface **IForma** com **string Nome { get; }** e **double Area()**. Implemente **Retangulo(largura, altura)** e **Circulo(raio)**. Coloque um retângulo 3×4 e um círculo de raio 2 num **array de IForma** e mostre as linhas abaixo com um laço (área com 2 casas, π = Math.PI).",
    reqs: ["Define a interface IForma", "Retangulo e Circulo implementam IForma", "Percorre uma coleção do tipo IForma chamando Area() (polimorfismo)"],
    hints: ["class Circulo : IForma { public string Nome => \"Círculo\"; ... public double Area() => Math.PI * Raio * Raio; }", "IForma[] formas = { new Retangulo(3, 4), new Circulo(2) }; foreach (var f in formas) Console.WriteLine($\"{f.Nome}: {f.Area():F2}\");"],
    starter: "",
    solution: cs`IForma[] formas = { new Retangulo(3, 4), new Circulo(2) };
foreach (var f in formas)
{
    Console.WriteLine($"{f.Nome}: {f.Area():F2}");
}

interface IForma
{
    string Nome { get; }
    double Area();
}

class Retangulo : IForma
{
    private readonly double _largura, _altura;
    public Retangulo(double largura, double altura) { _largura = largura; _altura = altura; }
    public string Nome => "Retângulo";
    public double Area() => _largura * _altura;
}

class Circulo : IForma
{
    private readonly double _raio;
    public Circulo(double raio) { _raio = raio; }
    public string Nome => "Círculo";
    public double Area() => Math.PI * _raio * _raio;
}`,
  },
  {
    id: "list", level: 3, title: "Listas: List<T>",
    lesson: `O array tem tamanho fixo. A **List<T>** cresce e diminui conforme você precisa. O \`T\` é o tipo dos itens:

\`\`\`csharp
var tarefas = new List<string>();
tarefas.Add("Estudar SQL");
tarefas.Add("Fazer simulado");
tarefas.Remove("Estudar SQL");
Console.WriteLine(tarefas.Count);              // 1
Console.WriteLine(tarefas.Contains("Fazer simulado"));  // True
tarefas.Sort();                                 // ordena
\`\`\`

\`string.Join(", ", lista)\` junta todos os itens num texto só.`,
    task: "Crie uma **List<string>** com \"Carla\", \"Ana\" e \"Bruno\". Adicione **\"Diego\"**, remova **\"Carla\"**, ordene e mostre as linhas abaixo.",
    reqs: ["Usa List<string> com Add, Remove, Sort, Count e Contains"],
    hints: ["var nomes = new List<string> { \"Carla\", \"Ana\", \"Bruno\" };", "Console.WriteLine($\"Lista: {string.Join(\", \", nomes)}\");"],
    starter: "",
    solution: cs`var nomes = new List<string> { "Carla", "Ana", "Bruno" };
nomes.Add("Diego");
nomes.Remove("Carla");
nomes.Sort();

Console.WriteLine($"Lista: {string.Join(", ", nomes)}");
Console.WriteLine($"Total: {nomes.Count}");
Console.WriteLine($"Tem Carla? {nomes.Contains("Carla")}");`,
  },
  {
    id: "dictionary", level: 3, title: "Dicionários: Dictionary<TKey, TValue>",
    lesson: `Um **Dictionary** guarda pares **chave → valor** e acha qualquer chave rapidamente:

\`\`\`csharp
var estoque = new Dictionary<string, int>();
estoque["caneta"] = 10;              // adiciona ou atualiza
estoque["lápis"] = 5;

if (estoque.ContainsKey("caneta"))
    estoque["caneta"] += 1;

foreach (var par in estoque)
    Console.WriteLine($"{par.Key}: {par.Value}");
\`\`\`

Ler uma chave que não existe com \`dic["x"]\` dá erro. Use \`ContainsKey\` ou \`TryGetValue\` antes.`,
    task: "Conte quantas vezes cada palavra aparece na frase **\"o rato roeu a roupa o rato fugiu\"** usando um **Dictionary<string, int>**, e mostre na ordem em que cada palavra apareceu pela primeira vez.",
    reqs: ["Separa a frase em palavras (Split)", "Usa Dictionary<string, int> para contar", "Percorre o dicionário para mostrar o resultado"],
    hints: ["foreach (var p in frase.Split(' ')) { if (contagem.ContainsKey(p)) contagem[p]++; else contagem[p] = 1; }", "foreach (var par in contagem) Console.WriteLine($\"{par.Key}: {par.Value}\");"],
    starter: "string frase = \"o rato roeu a roupa o rato fugiu\";\n",
    solution: cs`string frase = "o rato roeu a roupa o rato fugiu";
var contagem = new Dictionary<string, int>();

foreach (var palavra in frase.Split(' '))
{
    if (contagem.ContainsKey(palavra)) contagem[palavra]++;
    else contagem[palavra] = 1;
}

foreach (var par in contagem)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}`,
  },
  {
    id: "excecoes", level: 3, title: "Tratando erros: try / catch / finally",
    lesson: `Quando algo dá errado na execução, o .NET lança uma **exceção**. Sem tratamento, o programa quebra. Com **try/catch**, você captura o erro e decide o que fazer:

\`\`\`csharp
try
{
    int n = int.Parse("12a");          // lança FormatException
}
catch (FormatException)
{
    Console.WriteLine("Isso não é número.");
}
finally
{
    Console.WriteLine("Sempre executa.");   // com ou sem erro
}
\`\`\`

- Capture exceções **específicas**: FormatException, DivideByZeroException, ArgumentException...
- Para validar entrada, \`int.TryParse(texto, out int n)\` evita a exceção e devolve bool.
- Você também pode lançar a sua: \`throw new ArgumentException("Valor inválido");\`.`,
    task: "Escreva o método **Dividir(int a, int b)**, que lança **ArgumentException(\"Divisor não pode ser zero\")** quando b é 0. Chame **Dividir(10, 2)** e **Dividir(5, 0)**, cada um dentro de try/catch, mostrando o resultado ou a **mensagem do erro**, e um **finally** que mostra \"Fim da operação\".",
    reqs: ["Lança ArgumentException com throw", "Usa try/catch capturando a exceção e mostrando ex.Message", "Usa finally"],
    hints: ["static int Dividir(int a, int b) { if (b == 0) throw new ArgumentException(\"Divisor não pode ser zero\"); return a / b; }", "catch (ArgumentException ex) { Console.WriteLine($\"Erro: {ex.Message}\"); } finally { Console.WriteLine(\"Fim da operação\"); }"],
    starter: "",
    solution: cs`Tentar(10, 2);
Tentar(5, 0);

static void Tentar(int a, int b)
{
    try
    {
        Console.WriteLine($"{a} / {b} = {Dividir(a, b)}");
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine($"Erro: {ex.Message}");
    }
    finally
    {
        Console.WriteLine("Fim da operação");
    }
}

static int Dividir(int a, int b)
{
    if (b == 0) throw new ArgumentException("Divisor não pode ser zero");
    return a / b;
}`,
  },
  {
    id: "enum", level: 3, title: "Enums",
    lesson: `Um **enum** define um conjunto fechado de valores com nome. É melhor que usar números ou textos soltos:

\`\`\`csharp
enum Prioridade { Baixa, Media, Alta }

Prioridade p = Prioridade.Alta;
Console.WriteLine(p);          // Alta
Console.WriteLine((int)p);     // 2  (por baixo é um número, começando em 0)
\`\`\`

Combina muito bem com a **switch expression**:

\`\`\`csharp
string cor = p switch
{
    Prioridade.Alta => "vermelho",
    Prioridade.Media => "amarelo",
    _ => "verde"
};
\`\`\`

\`Enum.GetValues<Prioridade>()\` devolve todos os valores para percorrer num laço.`,
    task: "Crie o enum **StatusPedido { Pendente, Pago, Enviado, Entregue }** e um método que devolve uma descrição com **switch expression**. Percorra todos os valores com **Enum.GetValues** e mostre as linhas abaixo.",
    reqs: ["Define o enum StatusPedido", "Usa switch expression para a descrição", "Percorre os valores com Enum.GetValues"],
    hints: ["static string Descricao(StatusPedido s) => s switch { StatusPedido.Pendente => \"Aguardando pagamento\", ... };", "foreach (var s in Enum.GetValues<StatusPedido>()) Console.WriteLine($\"{(int)s} - {s}: {Descricao(s)}\");"],
    starter: "",
    solution: cs`foreach (var s in Enum.GetValues<StatusPedido>())
{
    Console.WriteLine($"{(int)s} - {s}: {Descricao(s)}");
}

static string Descricao(StatusPedido s) => s switch
{
    StatusPedido.Pendente => "Aguardando pagamento",
    StatusPedido.Pago => "Pagamento confirmado",
    StatusPedido.Enviado => "A caminho",
    StatusPedido.Entregue => "Recebido pelo cliente",
    _ => "Desconhecido"
};

enum StatusPedido { Pendente, Pago, Enviado, Entregue }`,
  },
  {
    id: "struct", level: 3, title: "Tipo valor x tipo referência",
    lesson: `Pergunta clássica de prova e de entrevista:

- **struct** é **tipo valor**: ao atribuir para outra variável, os dados são **copiados**.
- **class** é **tipo referência**: ao atribuir, as duas variáveis apontam para o **mesmo objeto**.

\`\`\`csharp
var a = new PontoS { X = 1 };
var b = a;        // cópia
b.X = 99;         // a.X continua 1

var c = new PontoC { X = 1 };
var d = c;        // mesma referência
d.X = 99;         // c.X agora é 99

struct PontoS { public int X; }
class  PontoC { public int X; }
\`\`\`

\`int\`, \`double\`, \`bool\` e \`DateTime\` são structs. \`string\`, arrays e \`List\` são referência. A string é especial porque é imutável.`,
    task: "Crie **struct PontoValor** e **class PontoRef**, cada um com um campo **int X**. Para cada um: crie com X = 1, copie para outra variável, mude a cópia para X = 99 e mostre o X do **original** e da **cópia**, como abaixo.",
    reqs: ["Define uma struct e uma class com campo X", "Demonstra a cópia por atribuição e a alteração da cópia", "Mostra o valor do original em cada caso"],
    hints: ["var v1 = new PontoValor { X = 1 }; var v2 = v1; v2.X = 99;", "Console.WriteLine($\"struct: original = {v1.X}\");"],
    starter: "",
    solution: cs`var v1 = new PontoValor { X = 1 };
var v2 = v1;
v2.X = 99;
Console.WriteLine($"struct: original = {v1.X}, cópia = {v2.X}");

var r1 = new PontoRef { X = 1 };
var r2 = r1;
r2.X = 99;
Console.WriteLine($"class: original = {r1.X}, cópia = {r2.X}");

struct PontoValor { public int X; }
class PontoRef { public int X; }`,
  },

  // ---------- AVANÇADO ----------
  {
    id: "linq", level: 4, title: "LINQ: consultas em coleções",
    lesson: `O **LINQ** traz para dentro do C# um estilo parecido com o SQL. Ele funciona em qualquer coleção:

\`\`\`csharp
int[] n = { 4, 9, 1, 7 };

n.Where(x => x > 3)          // filtra:  4, 9, 7
 .OrderBy(x => x)            // ordena:  4, 7, 9
 .Select(x => x * 10);       // projeta: 40, 70, 90

n.Sum();  n.Max();  n.Average();  n.Count(x => x % 2 == 0);
\`\`\`

\`x => x > 3\` é uma **lambda**: uma função curta escrita na hora, onde x é cada elemento.

| SQL | LINQ |
|---|---|
| WHERE | Where |
| SELECT | Select |
| ORDER BY | OrderBy / OrderByDescending |
| COUNT, SUM, AVG | Count, Sum, Average |`,
    task: "Com **int[] numeros = { 5, 12, 8, 3, 20, 15, 7 }**, use **LINQ** para mostrar as linhas abaixo: os pares em ordem crescente, a soma, quantos são maiores que 10 e o dobro de cada um na ordem original.",
    reqs: ["Usa Where, OrderBy, Sum, Count e Select do LINQ (sem laços manuais)"],
    hints: ["var pares = numeros.Where(x => x % 2 == 0).OrderBy(x => x);", "Console.WriteLine($\"Pares: {string.Join(\", \", pares)}\");"],
    starter: "int[] numeros = { 5, 12, 8, 3, 20, 15, 7 };\n",
    solution: cs`int[] numeros = { 5, 12, 8, 3, 20, 15, 7 };

var pares = numeros.Where(x => x % 2 == 0).OrderBy(x => x);
Console.WriteLine($"Pares: {string.Join(", ", pares)}");
Console.WriteLine($"Soma: {numeros.Sum()}");
Console.WriteLine($"Maiores que 10: {numeros.Count(x => x > 10)}");
Console.WriteLine($"Dobro: {string.Join(", ", numeros.Select(x => x * 2))}");`,
  },
  {
    id: "linqobj", level: 4, title: "LINQ com objetos e GroupBy",
    lesson: `LINQ brilha com listas de objetos. O **GroupBy** é o GROUP BY do SQL:

\`\`\`csharp
var vendas = new List<Venda> { new("Ana", "Sul", 100), new("Bia", "Sul", 50), new("Caio", "Norte", 80) };

foreach (var g in vendas.GroupBy(v => v.Regiao))
{
    Console.WriteLine($"{g.Key}: {g.Sum(v => v.Valor)}");   // g.Key é a região
}

record Venda(string Vendedor, string Regiao, decimal Valor);
\`\`\`

Cada grupo \`g\` é uma coleção, então dá para usar Sum, Average, Count e OrderBy dentro dele. \`MaxBy(x => x.Campo)\` devolve **o objeto** com o maior valor.`,
    task: "Com a lista de alunos do código inicial, **agrupe por curso** (em ordem alfabética de curso) e mostre, para cada curso, a **média** (2 casas) e o **nome do melhor aluno**, como abaixo.",
    reqs: ["Usa GroupBy por curso", "Calcula a média com Average e o melhor com MaxBy (ou OrderByDescending + First)", "Ordena os grupos pelo nome do curso"],
    hints: ["foreach (var g in alunos.GroupBy(a => a.Curso).OrderBy(g => g.Key))", "Console.WriteLine($\"{g.Key}: média {g.Average(a => a.Media):F2}, melhor: {g.MaxBy(a => a.Media)!.Nome}\");"],
    starter: cs`var alunos = new List<Aluno>
{
    new("Ana", "ADS", 8.5),
    new("Bruno", "CC", 7.0),
    new("Camila", "ADS", 6.0),
    new("Diego", "SI", 9.0),
    new("Gabriela", "CC", 9.5),
    new("Marcelo", "ADS", 9.2),
};

// seu código aqui

record Aluno(string Nome, string Curso, double Media);
`,
    solution: cs`var alunos = new List<Aluno>
{
    new("Ana", "ADS", 8.5),
    new("Bruno", "CC", 7.0),
    new("Camila", "ADS", 6.0),
    new("Diego", "SI", 9.0),
    new("Gabriela", "CC", 9.5),
    new("Marcelo", "ADS", 9.2),
};

foreach (var g in alunos.GroupBy(a => a.Curso).OrderBy(g => g.Key))
{
    var melhor = g.MaxBy(a => a.Media)!;
    Console.WriteLine($"{g.Key}: média {g.Average(a => a.Media):F2}, melhor: {melhor.Nome}");
}

record Aluno(string Nome, string Curso, double Media);`,
  },
  {
    id: "lambdas", level: 4, title: "Delegates, Func e Action",
    lesson: `Em C#, **funções podem ser guardadas em variáveis** e passadas como parâmetro:

- \`Func<int, int, int>\`: recebe dois int e **devolve** int (o último tipo é sempre o retorno).
- \`Action<string>\`: recebe string e **não devolve** nada.
- \`Predicate<int>\`: recebe int e devolve bool.

\`\`\`csharp
Func<double, double> metade = x => x / 2;
Action<string> log = msg => Console.WriteLine($"[LOG] {msg}");

log($"Metade de 9: {metade(9)}");
\`\`\`

Um método que recebe uma função deixa o **comportamento configurável**. É exatamente assim que o LINQ funciona por dentro.`,
    task: "Crie **Func<int, int, int> somar** e **multiplicar**, uma **Action<string> exibir**, e o método **Aplicar(int[] valores, Func<int, int> regra)**, que devolve um novo array aplicando a regra. Produza as linhas abaixo usando **exibir** para todas elas.",
    reqs: ["Declara Func<int,int,int> e Action<string> com lambdas", "Cria um método que recebe Func<int,int> como parâmetro", "Usa exibir para mostrar as linhas"],
    hints: ["Func<int, int, int> somar = (a, b) => a + b;  Action<string> exibir = s => Console.WriteLine(s);", "static int[] Aplicar(int[] v, Func<int, int> regra) { var r = new int[v.Length]; for (int i = 0; i < v.Length; i++) r[i] = regra(v[i]); return r; }"],
    starter: "",
    solution: cs`Func<int, int, int> somar = (a, b) => a + b;
Func<int, int, int> multiplicar = (a, b) => a * b;
Action<string> exibir = s => Console.WriteLine(s);

exibir($"3 + 4 = {somar(3, 4)}");
exibir($"3 * 4 = {multiplicar(3, 4)}");

int[] valores = { 1, 2, 3, 4 };
exibir($"Ao quadrado: {string.Join(", ", Aplicar(valores, x => x * x))}");
exibir($"Mais 10: {string.Join(", ", Aplicar(valores, x => x + 10))}");

static int[] Aplicar(int[] valores, Func<int, int> regra)
{
    var resultado = new int[valores.Length];
    for (int i = 0; i < valores.Length; i++) resultado[i] = regra(valores[i]);
    return resultado;
}`,
  },
  {
    id: "generics", level: 4, title: "Generics",
    lesson: `**Generics** permitem escrever código que funciona com **qualquer tipo**, sem perder a checagem de tipos. É assim que \`List<T>\` existe:

\`\`\`csharp
class Caixa<T>
{
    public T Conteudo { get; }
    public Caixa(T conteudo) => Conteudo = conteudo;
}

var c1 = new Caixa<int>(42);
var c2 = new Caixa<string>("livro");
\`\`\`

**Restrições** com \`where\` limitam os tipos aceitos:

\`\`\`csharp
static T Menor<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) <= 0 ? a : b;
\`\`\`

\`CompareTo\` devolve um valor negativo, zero ou positivo. Ele está disponível porque exigimos \`IComparable<T>\`.`,
    task: "Crie a classe genérica **Pilha<T>** com **Empilhar(T)**, **Desempilhar()** (lança InvalidOperationException se vazia) e **Count**, usando uma List<T> por dentro. Crie também o método genérico **Maior<T>(T a, T b) where T : IComparable<T>**. Produza as linhas abaixo.",
    reqs: ["Define a classe genérica Pilha<T>", "Desempilhar remove e devolve o último item (LIFO)", "Método genérico Maior<T> com restrição where T : IComparable<T>"],
    hints: ["private readonly List<T> _itens = new(); public T Desempilhar() { var x = _itens[^1]; _itens.RemoveAt(_itens.Count - 1); return x; }", "static T Maior<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) >= 0 ? a : b;"],
    starter: "",
    solution: cs`var pilha = new Pilha<string>();
pilha.Empilhar("SQL");
pilha.Empilhar("C#");
pilha.Empilhar("LINQ");

Console.WriteLine($"Itens: {pilha.Count}");
Console.WriteLine($"Desempilhou: {pilha.Desempilhar()}");
Console.WriteLine($"Desempilhou: {pilha.Desempilhar()}");
Console.WriteLine($"Restam: {pilha.Count}");
Console.WriteLine($"Maior(3, 8) = {Maior(3, 8)}");
Console.WriteLine($"Maior(\"ana\", \"bia\") = {Maior("ana", "bia")}");

static T Maior<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) >= 0 ? a : b;

class Pilha<T>
{
    private readonly List<T> _itens = new();
    public int Count => _itens.Count;

    public void Empilhar(T item) => _itens.Add(item);

    public T Desempilhar()
    {
        if (_itens.Count == 0) throw new InvalidOperationException("Pilha vazia");
        T topo = _itens[^1];
        _itens.RemoveAt(_itens.Count - 1);
        return topo;
    }
}`,
  },
  {
    id: "records", level: 4, title: "Records e pattern matching",
    lesson: `**record** cria em uma linha um tipo imutável, com construtor, propriedades, igualdade por valor e um ToString legível:

\`\`\`csharp
record Ponto(int X, int Y);

var a = new Ponto(1, 2);
var b = a with { Y = 5 };      // cópia alterando só Y
Console.WriteLine(a == new Ponto(1, 2));  // True (compara valores)
\`\`\`

O **pattern matching** testa a **forma** dos dados dentro do switch:

\`\`\`csharp
string Classificar(Ponto p) => p switch
{
    { X: 0, Y: 0 } => "Origem",
    { X: > 0, Y: > 0 } => "1º quadrante",
    _ => "Outro"
};
\`\`\``,
    task: "Crie **record Pedido(string Cliente, decimal Valor, bool Expresso)** e o método **Frete(Pedido)** com switch e padrões: valor **≥ 200** = frete 0; **expresso** = 25; senão = 12. Calcule para os 3 pedidos e, por fim, crie uma **cópia do segundo com Valor = 250 usando with**, como abaixo.",
    reqs: ["Define o record Pedido", "Frete usa switch com property patterns (ex.: { Valor: >= 200 })", "Usa with para criar a cópia alterada"],
    hints: ["static decimal Frete(Pedido p) => p switch { { Valor: >= 200 } => 0, { Expresso: true } => 25, _ => 12 };", "var copia = pedidos[1] with { Valor = 250 };"],
    starter: "",
    solution: cs`var pedidos = new[]
{
    new Pedido("Ana", 250m, false),
    new Pedido("Bruno", 80m, true),
    new Pedido("Carla", 120m, false),
};

foreach (var p in pedidos)
{
    Console.WriteLine($"{p.Cliente}: frete R$ {Frete(p):F2}");
}

var copia = pedidos[1] with { Valor = 250m };
Console.WriteLine($"{copia.Cliente} (com valor 250): frete R$ {Frete(copia):F2}");

static decimal Frete(Pedido p) => p switch
{
    { Valor: >= 200 } => 0,
    { Expresso: true } => 25,
    _ => 12
};

record Pedido(string Cliente, decimal Valor, bool Expresso);`,
  },
  {
    id: "nullable", level: 4, title: "Lidando com null: ?, ?. e ??",
    lesson: `**null** significa "sem valor". Ele causa o erro mais famoso do .NET, o NullReferenceException. C# tem operadores para lidar com ele com segurança:

\`\`\`csharp
string? apelido = null;               // ? = pode ser null
int? idade = null;                    // int que aceita null (Nullable<int>)

apelido?.Length                       // ?.  se for null, devolve null em vez de quebrar
apelido ?? "sem apelido"              // ??  usa o valor da direita se a esquerda for null
idade ??= 18;                         // ??= atribui só se ainda for null
idade.HasValue                        // tem valor?
\`\`\``,
    task: "Com **string? apelido = null**, **string? cidade = \"Niterói\"** e **int? idade = null**, mostre as linhas abaixo usando **??**, **?.** e **??=**. Nenhuma linha pode quebrar com null.",
    reqs: ["Usa tipos anuláveis (string?, int?)", "Usa os operadores ??, ?. e ??="],
    hints: ["Console.WriteLine($\"Apelido: {apelido ?? \"(sem apelido)\"}\");", "Tamanho: {apelido?.Length ?? 0}; depois idade ??= 18;"],
    starter: "string? apelido = null;\nstring? cidade = \"Niterói\";\nint? idade = null;\n",
    solution: cs`string? apelido = null;
string? cidade = "Niterói";
int? idade = null;

Console.WriteLine($"Apelido: {apelido ?? "(sem apelido)"}");
Console.WriteLine($"Tamanho do apelido: {apelido?.Length ?? 0}");
Console.WriteLine($"Cidade em maiúsculas: {cidade?.ToUpper()}");
Console.WriteLine($"Idade informada? {idade.HasValue}");
idade ??= 18;
Console.WriteLine($"Idade: {idade}");`,
  },
  {
    id: "yield", level: 4, title: "Iteradores com yield return",
    lesson: `Com **yield return**, um método devolve os itens **um por vez**, sob demanda, sem montar uma lista inteira na memória:

\`\`\`csharp
static IEnumerable<int> Pares(int limite)
{
    for (int i = 0; i <= limite; i += 2)
        yield return i;            // entrega e "pausa" aqui
}

foreach (var p in Pares(6)) Console.Write($"{p} ");   // 0 2 4 6
\`\`\`

Dá até para fazer sequências **infinitas**, porque nada é calculado antes de ser pedido. Combine com o LINQ \`Take(n)\`, que pega só os primeiros n.`,
    task: "Crie **IEnumerable<long> Fibonacci()**, uma sequência **infinita** com yield return (0, 1, 1, 2, 3, 5...). Use **Take** para mostrar os **10 primeiros** e **TakeWhile** para somar os termos **menores que 100**.",
    reqs: ["Fibonacci usa yield return num laço infinito", "Usa Take(10) e TakeWhile(x => x < 100) do LINQ"],
    hints: ["static IEnumerable<long> Fibonacci() { long a = 0, b = 1; while (true) { yield return a; (a, b) = (b, a + b); } }", "Fibonacci().TakeWhile(x => x < 100).Sum()"],
    starter: "",
    solution: cs`Console.WriteLine($"10 primeiros: {string.Join(", ", Fibonacci().Take(10))}");
Console.WriteLine($"Soma dos menores que 100: {Fibonacci().TakeWhile(x => x < 100).Sum()}");

static IEnumerable<long> Fibonacci()
{
    long a = 0, b = 1;
    while (true)
    {
        yield return a;
        (a, b) = (b, a + b);
    }
}`,
  },
  {
    id: "extensions", level: 4, title: "Métodos de extensão",
    lesson: `**Métodos de extensão** "adicionam" métodos a tipos que você não pode alterar, como string e int. Todo o LINQ é feito assim:

\`\`\`csharp
static class TextoExt
{
    public static int ContarPalavras(this string s)    // "this" marca o tipo estendido
        => s.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
}

"aprendendo C# hoje".ContarPalavras();   // 3
\`\`\`

As regras:
- a classe é **static**;
- o método é **static**;
- o primeiro parâmetro tem **this**.`,
    task: "Crie uma classe estática com dois métodos de extensão: **Capitalizar(this string)**, que deixa a primeira letra de cada palavra maiúscula e o resto minúsculo, e **EhPrimo(this int)**. Produza as linhas abaixo.",
    reqs: ["Classe static com métodos static e parâmetro this", "Chama os métodos como se fossem da própria string/int"],
    hints: ["public static string Capitalizar(this string s) => string.Join(' ', s.Split(' ').Select(p => p.Length == 0 ? p : char.ToUpper(p[0]) + p.Substring(1).ToLower()));", "public static bool EhPrimo(this int n) { if (n < 2) return false; for (int i = 2; i * i <= n; i++) if (n % i == 0) return false; return true; }"],
    starter: "",
    solution: cs`Console.WriteLine("anÁLISE e dESENVOLVIMENTO de sistemas".Capitalizar());
var primos = Enumerable.Range(1, 30).Where(n => n.EhPrimo());
Console.WriteLine($"Primos até 30: {string.Join(", ", primos)}");
Console.WriteLine($"97 é primo? {97.EhPrimo()}");

static class Extensoes
{
    public static string Capitalizar(this string s) =>
        string.Join(' ', s.Split(' ').Select(p => p.Length == 0 ? p : char.ToUpper(p[0]) + p.Substring(1).ToLower()));

    public static bool EhPrimo(this int n)
    {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++)
            if (n % i == 0) return false;
        return true;
    }
}`,
  },
  {
    id: "async", level: 4, title: "Programação assíncrona: async e await",
    lesson: `Operações demoradas, como acessar a internet, um banco ou um arquivo, não devem **travar** o programa. Com **async/await**, o método espera sem bloquear:

\`\`\`csharp
static async Task<string> BaixarAsync(string url)
{
    await Task.Delay(500);          // simula a espera de rede
    return $"conteúdo de {url}";
}

string r = await BaixarAsync("site.com");   // espera o resultado
\`\`\`

- Um método \`async\` devolve \`Task\` (sem valor) ou \`Task<T>\` (com valor).
- Por convenção, o nome termina com **Async**.
- **Task.WhenAll** roda várias tarefas **ao mesmo tempo** e espera todas. Os resultados voltam **na ordem em que você passou** as tarefas.`,
    task: "Crie **async Task<double> BuscarNotaAsync(string aluno, double nota)**, que espera 100 ms com Task.Delay e devolve a nota. Primeiro busque a nota de **Ana (8.5)** com await. Depois busque **Bruno (7.0)** e **Carla (9.5)** **em paralelo** com Task.WhenAll e mostre a média dos dois.",
    reqs: ["Método async que retorna Task<double> e usa await Task.Delay", "Usa await na chamada simples", "Usa Task.WhenAll para as duas buscas em paralelo"],
    hints: ["static async Task<double> BuscarNotaAsync(string aluno, double nota) { await Task.Delay(100); return nota; }", "double[] notas = await Task.WhenAll(BuscarNotaAsync(\"Bruno\", 7.0), BuscarNotaAsync(\"Carla\", 9.5));"],
    starter: "",
    solution: cs`Console.WriteLine("Buscando nota da Ana...");
double ana = await BuscarNotaAsync("Ana", 8.5);
Console.WriteLine($"Ana: {ana:F1}");

Console.WriteLine("Buscando Bruno e Carla em paralelo...");
double[] notas = await Task.WhenAll(BuscarNotaAsync("Bruno", 7.0), BuscarNotaAsync("Carla", 9.5));
Console.WriteLine($"Bruno: {notas[0]:F1}, Carla: {notas[1]:F1}");
Console.WriteLine($"Média dos dois: {notas.Average():F2}");

static async Task<double> BuscarNotaAsync(string aluno, double nota)
{
    await Task.Delay(100);
    return nota;
}`,
  },
  {
    id: "cs-final", level: 4, title: "Desafio final: sistema de boletim",
    lesson: `Hora de juntar tudo: **classes**, **interface**, **coleções**, **LINQ** e **exceções**, num mini sistema.

Dicas de arquitetura:
- Uma classe **Turma** guarda os alunos numa \`List\` **privada** e expõe métodos (encapsulamento).
- Valide as regras com exceções: nota fora de 0 a 10 lança \`ArgumentOutOfRangeException\`.
- Use LINQ para os relatórios: \`OrderByDescending\`, \`Where\`, \`Average\`.

Quebre o problema em partes e confira a saída linha a linha.`,
    task: "Crie a classe **Turma** com **AdicionarNota(string aluno, double nota)**, que lança **ArgumentOutOfRangeException** se a nota não estiver entre 0 e 10, e um relatório. Adicione as notas do código inicial, tente adicionar uma nota **11** (capture e mostre \"Nota inválida para Erro\") e produza o **ranking**, a **média da turma** e os **aprovados (≥ 6)** exatamente como abaixo.",
    reqs: ["Classe Turma com lista privada e método AdicionarNota que valida e lança exceção", "Captura a exceção da nota inválida com try/catch", "Ranking, média e aprovados calculados com LINQ"],
    hints: ["Guarde pares com um record: record Nota(string Aluno, double Valor); private readonly List<Nota> _notas = new();", "Ranking: _notas.OrderByDescending(n => n.Valor).Select((n, i) => $\"{i + 1}º {n.Aluno} - {n.Valor:F1}\")"],
    starter: cs`var turma = new Turma();
turma.AdicionarNota("Ana", 8.5);
turma.AdicionarNota("Bruno", 5.5);
turma.AdicionarNota("Carla", 9.5);
turma.AdicionarNota("Diego", 7.5);

// tente adicionar "Erro" com nota 11 e trate a exceção
// depois mostre o relatório
`,
    solution: cs`var turma = new Turma();
turma.AdicionarNota("Ana", 8.5);
turma.AdicionarNota("Bruno", 5.5);
turma.AdicionarNota("Carla", 9.5);
turma.AdicionarNota("Diego", 7.5);

try
{
    turma.AdicionarNota("Erro", 11);
}
catch (ArgumentOutOfRangeException)
{
    Console.WriteLine("Nota inválida para Erro");
}

Console.WriteLine("Ranking:");
foreach (var linha in turma.Ranking()) Console.WriteLine(linha);
Console.WriteLine($"Média da turma: {turma.Media():F2}");
Console.WriteLine($"Aprovados: {string.Join(", ", turma.Aprovados())}");

class Turma
{
    private readonly List<Nota> _notas = new();

    public void AdicionarNota(string aluno, double valor)
    {
        if (valor < 0 || valor > 10) throw new ArgumentOutOfRangeException(nameof(valor));
        _notas.Add(new Nota(aluno, valor));
    }

    public IEnumerable<string> Ranking() =>
        _notas.OrderByDescending(n => n.Valor).Select((n, i) => $"{i + 1}º {n.Aluno} - {n.Valor:F1}");

    public double Media() => _notas.Average(n => n.Valor);

    public IEnumerable<string> Aprovados() =>
        _notas.Where(n => n.Valor >= 6).OrderBy(n => n.Aluno).Select(n => n.Aluno);
}

record Nota(string Aluno, double Valor);`,
  },
];

module.exports = { EXERCISES };
