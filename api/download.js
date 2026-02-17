export default async function handler(req, res) {
  try {
    const url = req.query?.url ? String(req.query.url) : "";
    if (!url) return res.status(400).send("Missing url");

    // Evita virar proxy aberto: só aceita CDN do TheCatAPI
    const allowed = [
      "https://cdn2.thecatapi.com/",
      "https://cdn.thecatapi.com/"
    ];
    if (!allowed.some(prefix => url.startsWith(prefix))) {
      return res.status(400).send("URL not allowed");
    }

    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).send("Fetch failed");

    const arrayBuffer = await r.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", r.headers.get("content-type") || "image/jpeg");
    res.setHeader("Content-Disposition", 'attachment; filename="gato.jpg"');
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(buf);
  } catch {
    return res.status(500).send("Server error");
  }
}
