export default async function handler(req, res) {
  try {
    const breedId = req.query?.breed_id ? String(req.query.breed_id) : "";

    const url =
      "https://api.thecatapi.com/v1/images/search" +
      (breedId ? `?breed_ids=${encodeURIComponent(breedId)}` : "");

    const r = await fetch(url, {
      headers: { "x-api-key": process.env.CAT_API_KEY }
    });

    if (!r.ok) return res.status(r.status).json({ error: "TheCatAPI error" });

    const data = await r.json();
    const item = data[0];

    return res.status(200).json({
      url: item.url,
      id: item.id,
      width: item.width,
      height: item.height,
      breed: item.breeds?.[0]
        ? {
            id: item.breeds[0].id,
            name: item.breeds[0].name,
            origin: item.breeds[0].origin
          }
        : null
    });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
}
