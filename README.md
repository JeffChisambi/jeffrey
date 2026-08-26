# Jeffrey Chisambi — Portfolio

Vite + React + Tailwind rebuild of the original standalone HTML portfolio, with a ReactBits-style
animation layer. Visual identity (cream `#F3F0EA`, ink `#131110`, rust `#C4472B`, Anton /
Instrument Sans / IBM Plex Mono) is unchanged — all the copy and structure carried over.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

## Stack

| Purpose | Package |
| --- | --- |
| Build | `vite` + `@vitejs/plugin-react` |
| Styling | `tailwindcss` 3 (theme tokens in `tailwind.config.js`) |
| Motion | `framer-motion` (springs, layout, in-view) |
| Scrubbed scroll motion | `gsap` + `ScrollTrigger` |
| Momentum scrolling | `lenis` (synced to the GSAP ticker) |
| WebGL | `ogl` (the hero portrait mesh) |

## Structure

```
src/
├─ App.jsx                    page composition
├─ index.css                  Tailwind layers + design tokens
├─ data/content.js            ALL copy lives here — edit this, not the components
├─ hooks/useSmoothScroll.js   Lenis ↔ ScrollTrigger bridge
├─ components/
│  ├─ reactbits/              the animation library (see below)
│  ├─ ui/                     Preloader, ScrollProgress
│  └─ sections/               Nav, Hero, Process, About, Projects,
│                             TrackRecord, Credentials, Faq, Contact
```

## ReactBits components ported

Ports of the effects from [reactbits.dev](https://reactbits.dev), rewritten to match this palette
and to run on the deps above.

**Text** — `SplitText`, `SplitLines`, `TypedText`, `BlurText`, `DecryptedText`, `CountUp`,
`ShinyText`, `GradientText`, `ScrollFloat`, `ScrollReveal`

**Animation** — `AnimatedContent`, `FadeContent`, `Parallax`, `Magnet`, `MagnetLines`,
`ClickSpark`, `GlareHover`, `SpotlightCard`, `StarBorder`, `TiltedCard`, `ScrollVelocity`,
`Marquee`

**Backgrounds / cursor** — `DotGrid` (canvas, cursor-repelling), `Aurora`, `Noise`, `TargetCursor`

**WebGL** — `ElasticMesh`: the hero portrait as a spring-coupled node grid. The cursor pulls nearby
nodes toward it and pushes them out in Z, neighbour coupling spreads the deformation, and normals
are recomputed each frame so the lighting bends with the surface. Its `backgroundColor` prop
flattens the source PNG onto a solid fill first, so a transparent or white-matted cutout lands on
the cream palette instead of whatever RGB sits under its alpha. Swap the photo by replacing
`src/assets/Group 6.png` (or changing the import in `Hero.jsx`).

Everything is re-exported from `src/components/reactbits/index.js`:

```jsx
import { SplitText, Magnet, DotGrid } from './components/reactbits/index.js'
```

## Where the motion is

- **Preloader** — counter to 100, then four ink panels wipe upward
- **Hero** — line-masked headline, parallax on title and photo well, cursor-reactive dot grid,
  aurora clouds, animated stat counters, capability ticker, and the portrait rendered as an
  `ElasticMesh` — a WebGL sheet you can push around with the cursor
- **Nav** — shared-layout pill that slides to the active section, magnetic CTA
- **Process** — spotlight rows, animated progress rail, staggered blur reveals
- **About** — GSAP scrubbed word-by-word paragraph reveal, parallax capability grid
- **Projects** — scroll-velocity marquee (slows to a crawl and darkens under the pointer so the
  names are readable; the scroll boost is clamped so a wheel flick can't blur it), 3D tilt cards
  with cursor captions, alternating layout

### Horizontal strips on touch

`ScrollVelocity` and `Marquee` both branch on `useCoarsePointer()`. On phones and tablets there is
no auto-scroll at all — the same content renders as a swipeable, snapping strip the reader drives
themselves, with a mask fade at each edge as the "more over here" affordance. Because hover styling
never fires on touch, both components take separate touch props:

```jsx
<ScrollVelocity
  texts={[names.join(' — ')]}
  itemClassName="text-ink/15 group-hover:text-ink/60"   // pointer
  touchItems={names}                                    // one snap item each
  touchItemClassName="text-ink/70"                      // no hover to rely on
/>
```
- **Track record** — accordion with staggered field reveals over a dark section
- **FAQ** — sticky headline with expanding rows
- **Contact** — aurora + dot grid over ink, shiny-text prompt, magnetic email button
- **Global** — Lenis momentum scroll, scroll-progress bar, click sparks, and a custom drawn arrow
  cursor (accent fill, cream outline, trailing halo) that tilts and grows over interactive
  elements and prints the label from any `data-cursor` attribute beside its tip

All motion is gated behind `prefers-reduced-motion`.

## Editing content

`src/data/content.js` holds every string, stat, project, role and FAQ entry. Section components
read from it, so copy changes never require touching JSX.

## Notes

- Fonts load from Google Fonts in `index.html`.
- Project and role visuals are placeholder wells (`MagnetLines` grids). Swap the inner content for
  `<img>` tags when the screenshots are ready.
- `Jeffrey Chisambi Portfolio (standalone).html` is the original single-file build, kept for
  reference. Delete it once you're happy with the React version.
