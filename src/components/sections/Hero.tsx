import { ArrowDown, MapPin } from 'lucide-react'
import { marqueeStack, profile, socials, stats } from '../../data/content'
import { useClock } from '../../hooks'
import { CountUp, Marquee, SplitText } from '../ui/Primitives'
import Constellation from '../visual/Constellation'
// import Terminal from '../visual/Terminal'
import { scrollToSection } from '../system/SmoothScroll'

export default function Hero() {
  const clock = useClock(profile.timezone)

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden pt-16"
    >
      <div aria-hidden className="absolute inset-0 grid-bg opacity-70" />
      <Constellation />

      {/* flex-1 centres the content in whatever space the rail leaves,
          so the rail lands on the fold instead of floating mid-page. */}
      <div className="container-x relative z-10 flex flex-1 items-center py-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* ------------------------------------------------ Left */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
              {profile.available && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              )}
              <span className="text-xs text-body">{profile.availability}</span>
            </div>

            <h1 className="text-display font-medium text-heading">
              <SplitText text={profile.name} className="block" />
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="font-mono text-sm text-heading">
                {profile.role} · {profile.location.split(',')[0]}
              </p>
            </div>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection('#work')}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-heading px-5 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
              >
                View case studies
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-heading transition-colors hover:border-accent hover:text-accent"
              >
                Résumé
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Kolkata, IN
              </span>
              <span className="numeric">{clock} IST</span>
              {socials.slice(0, 3).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-heading"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ Right */}
          <div className="space-y-3">
            {/* <Terminal /> */}

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="hairline rounded-xl border border-line bg-surface p-4"
                >
                  <p className="text-2xl font-medium text-heading">
                    <CountUp
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-1 text-xs text-body">{stat.label}</p>
                  <p className="mono-label mt-1.5">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-y border-line py-3.5">
        <Marquee items={marqueeStack} />
      </div>
    </section>
  )
}
