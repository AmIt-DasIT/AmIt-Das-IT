import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../../data/content'
import { useSectionSpy, type Theme } from '../../hooks'
import { scrollToSection, setScrollLocked } from './SmoothScroll'

const SECTION_IDS = nav.map((n) => n.href.slice(1))

interface NavProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const active = useSectionSpy(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 56))

  useEffect(() => {
    setScrollLocked(menuOpen)
    return () => setScrollLocked(false)
  }, [menuOpen])

  const go = (e: MouseEvent, href: string) => {
    e.preventDefault()
    const wasOpen = menuOpen
    setMenuOpen(false)
    window.setTimeout(() => scrollToSection(href), wasOpen ? 300 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
          condensed ? 'glass' : ''
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a
            href="#top"
            onClick={(e) => go(e, '#top')}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-heading font-mono text-[11px] font-semibold text-ink">
              {profile.initials}
            </span>
            <span className="text-sm font-medium text-heading">{profile.name}</span>
          </a>

          <nav className="hidden items-center md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className={`relative px-3.5 py-2 text-sm transition-colors duration-200 ${
                    isActive ? 'text-heading' : 'text-body hover:text-heading'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3.5 -bottom-px h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-body transition-colors hover:bg-raised hover:text-heading"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              className="hidden rounded-md bg-heading px-3.5 py-1.5 text-sm font-medium text-ink transition-opacity hover:opacity-85 md:block"
            >
              Get in touch
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-8 w-8 items-center justify-center rounded-md text-heading hover:bg-raised md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className={`h-px w-full transition-colors duration-300 ${
            condensed ? 'bg-line' : 'bg-transparent'
          }`}
        />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <span className="mono-label">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-md text-heading hover:bg-raised"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="container-x flex flex-1 flex-col justify-center">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-medium text-heading"
                >
                  <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="container-x pb-10">
              <a href={`mailto:${profile.email}`} className="font-mono text-sm text-accent">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
