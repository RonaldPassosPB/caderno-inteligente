// Entrada para o iisnode (App Service Windows), que carrega o app com require().
// O servidor é um módulo ES, então é importado dinamicamente.
import("./server.js").catch(err => {
  console.error(err);
  process.exit(1);
});
