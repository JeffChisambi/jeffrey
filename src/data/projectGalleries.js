import ophunzilaHome from '../assets/ophunzila-home.webp'
import ophunzilaApp from '../assets/ophunzila-app.webp'
import ophunzilaDark from '../assets/ophunzila-dark.webp'

/**
 * Multi-screen galleries, keyed by the `gallery` field on a project in
 * `content.js`. A project with a gallery renders full-width instead of in the
 * half-width visual column — three landscape screenshots in a side column
 * would be too small to read.
 */
export const projectGalleries = {
  ophunzila: [
    {
      image: ophunzilaHome,
      label: 'Landing',
      alt: 'The Ophunzila landing page — MSCE learning, structured lessons in English and Chichewa',
    },
    {
      image: ophunzilaApp,
      label: 'Dashboard',
      alt: 'The Ophunzila student dashboard — continue learning, subjects, study hours and performance',
    },
    {
      image: ophunzilaDark,
      label: 'Dark mode',
      alt: 'The same Ophunzila dashboard in dark mode',
    },
  ],
}
