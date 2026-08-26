/**
 * Tiles for the hero DriftWall — app screenshots, downscaled from the 1080×2340
 * originals in `src/assets/heroimages/` to 380px-wide WebP (~171 KB for all 13,
 * down from 3.7 MB).
 *
 * Vite's `import.meta.glob` with `eager` + `query: '?url'` collects the whole
 * folder, so dropping another screenshot into `assets/hero-wall/` adds it to the
 * wall without touching this file.
 */
const modules = import.meta.glob('../assets/hero-wall/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const label = (path) =>
  path.includes('/pine-') ? 'Pine — brokerage app' : 'Estate management app'

export const heroWallTiles = Object.entries(modules)
  // Interleave the two apps so neighbouring columns don't show the same product.
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url], i) => ({ image: url, title: `${label(path)} screen ${i + 1}` }))
