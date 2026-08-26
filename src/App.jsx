import { useState } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll.js'

import Preloader from './components/ui/Preloader.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import { ClickSpark, TargetCursor } from './components/reactbits/index.js'

import Nav from './components/sections/Nav.jsx'
import Hero from './components/sections/Hero.jsx'
import Process from './components/sections/Process.jsx'
import About from './components/sections/About.jsx'
import Projects from './components/sections/Projects.jsx'
import TrackRecord from './components/sections/TrackRecord.jsx'
import Credentials from './components/sections/Credentials.jsx'
import Faq from './components/sections/Faq.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  return (
    <ClickSpark sparkColor="#C4472B" sparkCount={9} sparkRadius={26}>
      <TargetCursor accent="#C4472B" />
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />

      <Nav ready={ready} />

      <main>
        <Hero ready={ready} />
        <Process />
        <About />
        <Projects />
        <TrackRecord />
        <Credentials />
        <Faq />
        <Contact />
      </main>
    </ClickSpark>
  )
}
