# lorraenmadre.com — homepage

Single self-contained `index.html`. No build step. This repo **is** the site.

## Deploy

### GitHub Pages (custom domain `lorraenmadre.com`)

1. Push this repo to GitHub (see below).
2. Repo **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `/ (root)`.
3. The `CNAME` file already sets the custom domain to `lorraenmadre.com`.
4. At your DNS provider, point the apex domain at GitHub Pages:
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `CNAME` for `www` → `<your-username>.github.io`
5. Enable **Enforce HTTPS** once the cert is issued.

`.nojekyll` is present so Pages serves the files as-is.

### Any static host

Netlify / Vercel / Cloudflare Pages: drop the folder in, no configuration. Delete
`CNAME` if you are not using GitHub Pages.

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
| Real checkout URL (Gumroad) | `LINKS.joinClub` |
| Canonical categories + destinations for houses 5–12 | `HOUSES`, `LINKS.houses` |
| Social handles | `LINKS.instagram` / `tiktok` / `youtube` / `substack` |

## Push to GitHub

```bash
# create an empty repo named "lorraenmadre.com" on github.com first, then:
git remote add origin https://github.com/<your-username>/lorraenmadre.com.git
git push -u origin main
```
