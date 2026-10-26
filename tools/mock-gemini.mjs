// API falsa do Gemini (streamGenerateContent em SSE) para testar sem gastar cota
import http from "node:http";
http.createServer((req, res) => {
  let body = ""; req.on("data", c => body += c); req.on("end", () => {
    const b = JSON.parse(body || "{}");
    const block = req.url.includes("bloquear") || JSON.stringify(b).includes("BLOQUEAR");
    console.error("MOCK", req.method, req.url.split("?")[0], "| thinking", b.generationConfig?.thinkingConfig?.thinkingLevel, "| maxOut", b.generationConfig?.maxOutputTokens, "| roles", (b.contents || []).map(c => c.role).join(","), "| key", req.headers["x-goog-api-key"] ? "sim" : "não");
    res.writeHead(200, { "content-type": "text/event-stream" });
    const send = o => res.write("data: " + JSON.stringify(o) + "\r\n\r\n");
    if (block) { send({ candidates: [{ finishReason: "SAFETY", content: { role: "model", parts: [] } }] }); return res.end(); }
    for (const p of ['{"compila": true, ', '"saida": "Olá, mundo!", ', '"requisitos": [{"ok": true}]}'])
      send({ candidates: [{ content: { role: "model", parts: [{ text: p }] } }] });
    send({ candidates: [{ content: { role: "model", parts: [{ text: "" }] }, finishReason: "STOP" }], usageMetadata: { totalTokenCount: 30 } });
    res.end();
  });
}).listen(9912, () => console.error("mock gemini on 9912"));
