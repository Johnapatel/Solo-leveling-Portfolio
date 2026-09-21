# Alok Patel — Logic & Lens

Four separate pages: Home, Career, Editing and Chitchat. Built with React, Next.js-compatible Vinext, Tailwind CSS, GSAP and Radix/Shadcn primitives.

## Run locally

Install Node.js 22.13 or newer and pnpm 11.25.0. From this folder:

```sh
pnpm install
pnpm dev
```

Build with `pnpm build`. The framework runner supports the bundled Cloudflare configuration. Run `pnpm start` to preview the built Worker locally. Source is compatible with the included Sites hosting setup; deployment elsewhere may require host-specific configuration.

## Replace the temporary visuals

- `public/media/hero.webp`: transparent homepage portrait.
- `public/media/loop-1.mp4` through `loop-6.mp4`: six editing samples. Replace matching `loop-N-poster.webp` thumbnails too. Original animated GIF versions are included; MP4 loops are rendered for smaller transfers and playback controls.
- `public/media/handshake.webp`: animated Chitchat illustration; `handshake-still.png` for reduced motion.
- `public/images/studio-art.webp`: colour comparison image.
- The `clips` array and sample labels in `app/portfolio/Portfolio.tsx` contain titles and placeholder descriptions. Update them when replacing the samples. Do not present the temporary anime clips as your own editing work.
- `lib/portfolio-data.ts` contains the five career project stories and contact email.
- `public/Alok-Patel-Resume.pdf` is the downloadable résumé.
- Anime source references are in `ASSET-SOURCES.json`. These are temporary third-party visuals, not original portfolio work; replace them with your own material before promoting the portfolio publicly.

## Contact form: owner activation required

The form posts to FormSubmit's AJAX endpoint addressed to Patelalok1947m@gmail.com. FormSubmit requires a one-time recipient activation email on first use. Open that email and confirm before relying on delivery. No activation email was sent during development and end-to-end delivery is not verified. Check spam if needed. The direct email link remains available.

Messages include name, sender email, subject and message. A successful endpoint response is described as submission accepted, not confirmed delivery. Errors preserve input. Browser validation and a hidden honeypot are included. FormSubmit is a third-party service and its availability is independent of this site.

## Motion and accessibility

GSAP introduces text, adds portrait depth and drives the horizontal film reel on desktop. Smaller screens use a regular grid. Video playback pauses outside the viewport. The Motion button stops ambient animation and videos; operating-system reduced-motion preferences are respected. Dialogs use focus trapping, Escape dismissal and focus return. The colour slider supports keyboard arrows, Home and End.
