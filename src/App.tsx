import { useTheme } from './hooks'

import SmoothScroll from './components/system/SmoothScroll'
import ScrollProgress from './components/system/ScrollProgress'
import Nav from './components/system/Nav'

import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
// import Play from './components/sections/Play'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="grain relative min-h-screen">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-400 focus:rounded-lg focus:bg-heading focus:px-4 focus:py-2.5 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <SmoothScroll />
      <ScrollProgress />

      <Nav theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        {/* <Play /> */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
