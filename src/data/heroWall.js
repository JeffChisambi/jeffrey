/**
 * Tiles for the hero DriftWall — app screenshots, downscaled from the 1080×2340
 * originals in `src/assets/heroimages/` to 380px-wide WebP (~171 KB for all 13,
 * down from 3.7 MB).
 *
 * Vite's `import.meta.glob` with `eager` + `query: '?url'` collects the whole
 * folder, so dropping another screenshot into `assets/hero-wall/` adds it to the
 * wall without touching this file.
 *
 * The Pine screens are parked in `assets/hero-wall-off/` while that project is
 * hidden — move them back into `hero-wall/` to restore them to the wall.
 */
const modules = import.meta.glob('../assets/hero-wall/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const heroWallTiles = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url], i) => ({ image: url, title: `Estate management app screen ${i + 1}` }))
