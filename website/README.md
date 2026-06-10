# T0L LLC Website

Premium agency-style marketing site for **T0L LLC** — inspired by the Hayler demo aesthetic with T0L brand colors, angular cut motifs, smooth scroll, and a custom cursor.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Framer Motion (reveals, page transitions)
- Lenis (smooth scroll; disabled when `prefers-reduced-motion`)

## Getting started

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Customize content

### Portfolio (`src/data/projects.ts` + `src/data/hostedSites.ts`)

Website portfolio entries are synced from **HostIT** (`HostIT/src/components/PortfolioGrid.tsx`). Screenshots live in `public/projects/hosted/`.

To refresh images after updating HostIT:

```powershell
Copy-Item "..\HostIT\public\lovable-uploads\*" "public\projects\hosted\" -Force
Copy-Item "public\projects\hosted\rsg-mechanics-screenshot.png" "public\projects\hosted\rsg-mechanics.png" -Force
Copy-Item "public\projects\hosted\c340eeba-5ce9-4d41-a0b5-520415d2c714.png" "public\projects\hosted\tg-telecomm.png" -Force
Copy-Item "public\projects\hosted\963bc961-02a9-421f-824b-2d95a0546f0b.png" "public\projects\hosted\sololaunch.png" -Force
Copy-Item "public\projects\hosted\paladin-mma-screenshot.png" "public\projects\hosted\paladin-mma.png" -Force
Copy-Item "public\projects\hosted\black-car-service-miami-screenshot.png" "public\projects\hosted\black-car-service-miami.png" -Force
Copy-Item "public\projects\hosted\nu-al-andalusia-screenshot.png" "public\projects\hosted\nu-al-andalusia.png" -Force
```

Edit `src/data/hostedSites.ts` to add sites, URLs, or featured flags.

For Apps/Software sample projects, edit `src/data/projects.ts` directly.

### Services & process (`src/data/services.ts`)

Edit service blocks and process steps.

### Site copy & contact (`src/data/site.ts`)

Update `email`, `phone`, `description`, marquee labels, and response-time text.

## Replace brand assets

| Asset | Place at | Notes |
|--------|-----------|--------|
| Favicon set | `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` | Also mirrored in `src/app/` for Next.js file-based icons |
| Custom cursor | `public/brand/cursor.png` | Separate from favicon — update independently |
| Dark sections logo | `public/brand/logo-wordmark.png` | White transparent wordmark (header/footer) — copy from repo root `White Transparent Logo.png` |
| Light sections logo | `public/brand/logo-black.jpeg` | Black on white (optional) |
| Mark / motif | `public/brand/logo-mark.png` | Transparent mark |

## Helvetica Now Var (fonts)

1. Add licensed font files to `public/fonts/` (e.g. `HelveticaNowVar.woff2`).
2. Uncomment the `@font-face` block in `src/app/globals.css`.
3. Until then, the site uses: **Helvetica, Arial, system-ui, -apple-system**.

## Project & client images

- Portfolio: `public/projects/` (hero/thumbnail images)
- Client logos: `public/clients/` (PNG recommended)

## Hayler reference

The `../hayler/` folder is the original HTML demo reference (slider, marquee, drag hint). This Next.js site reimplements those patterns in React.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured carousel, marquee, clients, services preview, process, CTA |
| `/work` | Work & Services — select a service to see details + related projects |
| `/work/[slug]` | Case study template |
| `/about` | About us + contact form (`#contact`) |
| `/services`, `/contact` | Redirect to `/work` and `/about#contact` |

## Accessibility & motion

- Respects `prefers-reduced-motion` (disables Lenis, simplifies Framer animations and marquee)
- Custom cursor disabled on touch / viewports under 1024px
- Keyboard-focusable navigation and form controls

## Contact form

The form currently shows a success state client-side only. Wire it to your API, Formspree, Resend, etc. in `src/components/ContactForm.tsx`.
