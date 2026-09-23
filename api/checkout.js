// Vercel serverless function: POST /api/checkout
// Creates ONE Stripe Checkout Session for one or more Library items.
// Requires env var STRIPE_SECRET_KEY (Vercel → Project → Settings → Environment Variables).
// Only prices listed in /library/products.json with a stripe_price_id can be bought —
// the browser sends product ids, never raw price ids or amounts.

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "Method not allowed" }); }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(503).json({ error: "Checkout not configured" });

  const origin = `https://${req.headers["x-forwarded-host"] || req.headers.host}`;
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const items = Array.isArray(body && body.items) ? body.items.slice(0, 20) : [];
  if (!items.length) return res.status(400).json({ error: "No items" });

  let registry;
  try { registry = await (await fetch(`${origin}/library/products.json`)).json(); }
  catch { return res.status(500).json({ error: "Registry unavailable" }); }

  const seen = new Set();
  const lines = [];
  for (const it of items) {
    const p = registry.products.find(x => x.id === it.id && x.availability !== "unpublished");
    const pr = p && p.prices && p.prices[Number(it.price_index)];
    if (!pr || !pr.stripe_price_id || seen.has(p.id)) continue;
    seen.add(p.id);
    lines.push({ price: pr.stripe_price_id, recurring: !!pr.interval, id: p.id });
  }
  if (!lines.length) return res.status(400).json({ error: "Nothing purchasable" });

  const form = new URLSearchParams();
  form.set("mode", lines.some(l => l.recurring) ? "subscription" : "payment");
  form.set("success_url", `${origin}/library/?checkout=success&session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${origin}/library/?checkout=cancel`);
  form.set("metadata[source_site]", String(req.headers.host || ""));
  form.set("metadata[product_ids]", lines.map(l => l.id).join(","));
  lines.forEach((l, i) => { form.set(`line_items[${i}][price]`, l.price); form.set(`line_items[${i}][quantity]`, "1"); });

  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form
  });
  const j = await r.json();
  if (!r.ok) return res.status(502).json({ error: (j.error && j.error.message) || "Stripe error" });
  return res.status(200).json({ url: j.url });
};
