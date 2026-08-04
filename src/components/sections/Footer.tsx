import { ArrowUp } from 'lucide-react'
import { nav, profile, socials } from '../../data/content'
import { scrollToSection } from '../system/SmoothScroll'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-x">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-medium text-heading">{profile.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-body">
              {profile.tagline}
            </p>
            <p className="mt-5 font-mono text-[11px] text-muted">
              React · Vite · TypeScript · Tailwind · Motion
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <p className="mono-label mb-1">Sections</p>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="text-sm text-body transition-colors hover:text-heading"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <p className="mono-label mb-1">Elsewhere</p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-body transition-colors hover:text-heading"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
          <p className="font-mono text-[11px] text-muted">
            © {year} {profile.name}
          </p>

          <p className="hidden font-mono text-[11px] text-muted sm:block">
            Built and maintained by hand
          </p>

          <button
            onClick={() => scrollToSection('#top')}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 font-mono text-[11px] text-body transition-colors hover:text-heading"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
