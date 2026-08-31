# lorraenmadre.com — homepage

Single self-contained `index.html`. No build step. This repo **is** the site.

## Deploy

Hosted on **Vercel**, linked to this GitHub repo — every push to `main` deploys.
No build step: Vercel serves `index.html` and `brand-assets/` as static files
(Framework Preset: *Other*).

- Production: `lorraenmadre.com` (domain attached in the Vercel project's
  **Settings → Domains**).
- `.nojekyll` is a harmless leftover; Vercel ignores it.

### Any other static host

Netlify / Cloudflare Pages / GitHub Pages all work too — it's a plain static
folder. For GitHub Pages you'd add a `CNAME` file and point DNS at GitHub's IPs.

## Structure

| Section | Notes |
|---|---|
| Hero | background video `brand-assets/hero.mp4` (see *To do* — compress before launch) |
| §3 "Who is this for" | `brand-assets/who-bg.mp4` |
| §5 fairy-godmother box | three pills: **Design** → `LINKS.design` (currently `https://lorraenmadre.app/`), **Wish** → `#wish`, **Watch** → `#club` |
| §7 "Wishes like order" | `brand-assets/order-bg.mp4` + WISH WELL logo |
| §8 The Houses | 12-tile mosaic. Houses 1–4 have media backgrounds; the rest are text tiles. |
| §9 Happily ever after | `brand-assets/hea-bg.mp4` |

### The Houses grid

Config lives in the `<script>` at the bottom of `index.html`:

- `HOUSES` — `[number, name, description, category]`. `category` is the small green label on each tile.
- `HOUSE_BG` / `HOUSE_POSTER` — media backgrounds. `01` omw video, `02` Wuuwuu watch image, `03` cookbook video, `04` Lady & the Wish cover.
- `HOUSE_MEDIA` — tile mode: `m-dark` (video, light text), `m-black` (video on black, scaled down), `m-light` (image on white, dark text).
- `HOUSE_NOLABEL` — tiles that show only the category (no name/description).
- `LINKS.houses` — per-house destination. Live: `01` → `https://omw.life/`, `04` → Amazon listing. The rest are `#` placeholders.

Categories for houses **5–12 are placeholders** pending the canonical list.

## Type

| Role | Font |
|---|---|
| Headings | Belleza |
| Subheads / labels / buttons | Figtree (stand-in for Noah) |
| Body | Mulish |

Two accents: **gold** (`--gold`, every Join button + `$13` + "you are here") and
**spirit green** (`--spirit`, eyebrows, links, house categories).

## To do before launch

| What | Where |
|---|---|
| Compress the hero video (currently ~12 MB, 61 s) to ~1280×720 / ~1.5 Mbps, ideally a 15–20 s loop under 4 MB | `brand-assets/hero.mp4` |
| Canonical categories + destinations for houses 5–12 | `HOUSES`, `LINKS.houses` |
| Social handles | `LINKS.instagram` / `tiktok` / `youtube` / `substack` |

**Live links:** `joinClub` → `wishwisely.gumroad.com/l/fzexhb` ($13) · `design` →
`lorraenmadre.app` · house `01` → `omw.life` · house `04` → the Amazon listing ·
`calendar` → the "Space for Story Time" Google Calendar (internal — delivered after purchase).

## Repo

<https://github.com/lorraenmadre/lorraenmadre.com>
