export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing path" });
  }

  const url = `https://query1.finance.yahoo.com${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60");

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
}
