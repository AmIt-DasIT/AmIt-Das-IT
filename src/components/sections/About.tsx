import { education, profile, socials } from '../../data/content'
import { useClock } from '../../hooks'
import { Reveal, Section, SectionHeading } from '../ui/Primitives'
import { SOCIAL_ICONS } from '../ui/BrandIcons'

export default function About() {
  const clock = useClock(profile.timezone)

  return (
    <Section id="about">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="About"
          title="The unglamorous parts are the ones that matter."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          {/* Bio */}
          <Reveal>
            <div className="space-y-5">
              {profile.bio.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-lg leading-relaxed text-heading md:text-xl'
                      : 'leading-relaxed text-body'
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="mono-label mb-5">Education</p>
              <div className="space-y-5">
                {education.map((item) => (
                  <div
                    key={item.qualification}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div>
                      <p className="text-heading">{item.qualification}</p>
                      <p className="text-sm text-muted">{item.institution}</p>
                    </div>
                    <p className="mono-label shrink-0 sm:text-right">
                      {item.period} · {item.result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Facts */}
          <Reveal delay={0.1}>
            <div className="hairline rounded-xl border border-line bg-surface">
              <div className="flex items-center gap-3.5 border-b border-line p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-heading font-mono text-sm font-semibold text-ink">
                  {profile.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-heading">{profile.name}</p>
                  <p className="truncate text-sm text-muted">{profile.role}</p>
                </div>
              </div>

              <dl className="divide-y divide-line">
                <Row label="Based in" value="Kolkata, WB, India" />
                <Row label="Local time" value={`${clock} IST`} mono />
                <Row label="Experience" value="4+ years" />
                <Row label="Status" value={profile.availability} accent />
              </dl>

              <div className="border-t border-line p-2">
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon]
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-raised"
                    >
                      <span className="flex items-center gap-3 text-sm text-heading">
                        <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                        {s.label}
                      </span>
                      <span className="truncate font-mono text-[11px] text-muted">
                        ↗
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Row({
  label,
  value,
  mono,
  accent,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3">
      <dt className="mono-label">{label}</dt>
      <dd
        className={`truncate text-right text-sm ${accent ? 'text-accent' : 'text-heading'} ${
          mono ? 'numeric text-xs' : ''
        }`}
      >
        {value}
      </dd>
    </div>
  )
}
