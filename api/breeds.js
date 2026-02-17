export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.CAT_API_KEY }
    });

    if (!r.ok) return res.status(r.status).json({ error: "TheCatAPI error" });

    const data = await r.json();
    // só o essencial pro dropdown
    const breeds = data
      .map(b => ({ id: b.id, name: b.name, origin: b.origin || "" }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return res.status(200).json(breeds);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
}
