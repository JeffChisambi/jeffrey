import kwathuchat from '../assets/logos/kwathuchat.webp'
import kwathupay from '../assets/logos/kwathupay.webp'
import pine from '../assets/logos/pine.webp'
import ophunzila from '../assets/logos/ophunzila.webp'

/**
 * Wordmarks for the projects ticker, keyed by the project `id` in `content.js`.
 * All four are normalised to 140px tall with their transparent padding trimmed,
 * so they sit on a shared baseline whatever their original aspect.
 *
 * Intrinsic dimensions travel with each entry so the belt can reserve the right
 * width before the images decode. LogoLoop measures one sequence to set its
 * wrap distance, and a sequence that grows mid-animation drags the seam with it.
 */
export const projectLogos = {
  kwathuchat: { src: kwathuchat, w: 611, h: 140 },
  kwathupay: { src: kwathupay, w: 423, h: 140 },
  pine: { src: pine, w: 279, h: 140 },
  ophunzila: { src: ophunzila, w: 697, h: 140 },
}
