const init = require("sql.js/dist/sql-asm.js");
const { SEED, EXERCISES } = require("../site/sql-data.js");
const norm = v => typeof v === "number" ? Math.round(v * 100) / 100 : v === null ? null : String(v).trim();
function run(SQL, code, check) {
  const db = new SQL.Database(); db.run(SEED);
  let res = db.exec(code);
  if (check) res = db.exec(check);
  db.close();
  const last = res[res.length - 1] || { columns: [], values: [] };
  return last;
}
function same(a, b, ordered) {
  if (a.columns.length !== b.columns.length) return "cols";
  if (a.values.length !== b.values.length) return "rows";
  const ser = r => JSON.stringify(r.map(norm));
  let x = a.values.map(ser), y = b.values.map(ser);
  if (!ordered) { x.sort(); y.sort(); }
  return x.every((v, i) => v === y[i]) ? "ok" : "vals";
}
init().then(SQL => {
  for (const e of EXERCISES) {
    const r = run(SQL, e.solution, e.check);
    // banco sem o comando do exercício; a conferência pode nem rodar (ex.: a view ainda não existe)
    let base = null;
    if (e.check) { try { base = run(SQL, "SELECT 1", e.check); } catch { base = { columns: [], values: [] }; } }
    console.log(e.level, e.id.padEnd(11), r.values.length + " linhas", e.check ? (same(r, base, true) === "ok" ? "!! DML não mudou nada" : "DML muda o check") : "", JSON.stringify(r.values.slice(0, 3)));
  }
  const ex = id => EXERCISES.find(e => e.id === id);
  const alt = [
    ["colunas", "select nome as aluno, email from alunos order by nome", "ok"],
    ["join", "SELECT alunos.nome, cursos.nome FROM cursos INNER JOIN alunos ON alunos.curso_id = cursos.id", "ok"],
    ["notexists", "SELECT a.nome FROM alunos a LEFT JOIN matriculas m ON m.aluno_id = a.id WHERE m.id IS NULL", "ok"],
    ["leftjoin", "SELECT c.nome, COUNT(*) FROM cursos c LEFT JOIN alunos a ON a.curso_id = c.id GROUP BY c.id", "vals"],
    ["orderby", "SELECT nome, salario FROM professores ORDER BY salario", "vals"],
    ["update", "UPDATE professores SET salario = salario + salario * 0.10 WHERE titulacao = 'Doutorado'", "ok"],
    ["update", "UPDATE professores SET salario = salario * 1.1", "vals"],
    ["insert", "INSERT INTO cursos VALUES (6, 'Segurança da Informação', 'Tecnologia', 5)", "ok"],
    ["joinhaving", "SELECT p.nome, ROUND(AVG(m.nota),2) FROM professores p JOIN disciplinas d ON d.professor_id=p.id JOIN matriculas m ON m.disciplina_id=d.id GROUP BY p.nome HAVING ROUND(AVG(m.nota),2) > 7", "ok"],
    ["cte", "SELECT a.nome, ROUND(AVG(m.nota),2) media FROM matriculas m JOIN alunos a ON a.id=m.aluno_id GROUP BY a.id ORDER BY media DESC LIMIT 3", "ok"],
  ];
  for (const [id, code, want] of alt) {
    const e = ex(id);
    const got = same(run(SQL, code, e.check), run(SQL, e.solution, e.check), !!e.ordered);
    console.log(got === want ? "PASS" : "FAIL", id, "esperado", want, "obtido", got);
  }
  // empates que deixariam ORDER BY/LIMIT ambíguos
  const db = new SQL.Database(); db.run(SEED);
  console.log("médias top:", JSON.stringify(db.exec("SELECT aluno_id, ROUND(AVG(nota),3) m FROM matriculas WHERE nota IS NOT NULL GROUP BY aluno_id ORDER BY m DESC LIMIT 5")[0].values));
  console.log("médias prof:", JSON.stringify(db.exec("SELECT p.nome, AVG(m.nota) FROM professores p JOIN disciplinas d ON d.professor_id=p.id JOIN matriculas m ON m.disciplina_id=d.id GROUP BY p.id")[0].values));
});
