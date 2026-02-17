import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    const token = req.query.token || req.headers["x-reset-token"];

    if (!process.env.ADMIN_RESET_TOKEN || token !== process.env.ADMIN_RESET_TOKEN) {
      return res.status(401).json({ error: "unauthorized" });
    }

    // zera contador global
    await redis.set("global_seen_total", 0);

    return res.status(200).json({
      success: true,
      global_total: 0,
      message: "Global reset done. Clear local storage manually."
    });

  } catch (e) {
    return res.status(500).json({ error: "redis_error", detail: String(e) });
  }
}
