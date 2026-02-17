export default async function handler(req, res) {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: {
      "x-api-key": process.env.CAT_API_KEY
    }
  });

  const data = await response.json();
  res.status(200).json({ url: data[0].url });
}
