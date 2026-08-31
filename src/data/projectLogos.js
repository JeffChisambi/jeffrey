import kwathuchat from '../assets/logos/kwathuchat.webp'
import kwathupay from '../assets/logos/kwathupay.webp'
import pine from '../assets/logos/pine.webp'
import ophunzila from '../assets/logos/ophunzila.webp'
import chakudya from '../assets/logos/chakudya.svg'
import kwathuhotel from '../assets/logos/kwathuhotel.svg'

/**
 * Wordmarks for the projects ticker, keyed by the project `id` in `content.js`.
 * The rasters are normalised to 140px tall with their transparent padding
 * trimmed; the SVGs carry their own viewBox dimensions.
 *
 * Intrinsic dimensions travel with each entry so the belt can reserve the right
 * width before the images decode. LogoLoop measures one sequence to set its
 * wrap distance, and a sequence that grows mid-animation drags the seam with it.
 *
 * Every mark here has to read on the ink band the belt sits on. Both SVGs are
 * white-plus-accent despite `logo-black.svg`'s filename, so they qualify; a
 * genuinely dark mark would need a light variant before being listed.
 */
export const projectLogos = {
  kwathuchat: { src: kwathuchat, w: 805, h: 140 },
  kwathupay: { src: kwathupay, w: 423, h: 140 },
  pine: { src: pine, w: 279, h: 140 },
  ophunzila: { src: ophunzila, w: 697, h: 140 },
  chakudya: { src: chakudya, w: 183, h: 49 },
  kwathuhotel: { src: kwathuhotel, w: 139, h: 32 },
  // The KwathuChat product site travels under the app's own wordmark.
  kwathusite: { src: kwathuchat, w: 805, h: 140 },
}
