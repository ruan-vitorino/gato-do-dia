export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thecatapi.com/v1/images/search", {
      headers: { "x-api-key": process.env.CAT_API_KEY }
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: "TheCatAPI error" });
    }

    const data = await r.json();
    const item = data[0];

    return res.status(200).json({
      url: item.url,
      id: item.id,
      width: item.width,
      height: item.height
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
