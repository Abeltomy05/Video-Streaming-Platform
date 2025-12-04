export default async function handler(req, res) {
  const { path = [] } = req.query;

  const joined = path.join("/");

  const targetUrl = `${process.env.HLS_BASE_URL}/${joined}`;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).send("Stream fetch error");
    }

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy server error");
  }
}
