import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { experience, profile } from '../../data/content'
import { Reveal, Section, SectionHeading } from '../ui/Primitives'

export default function Experience() {
  return (
    <Section id="experience">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Experience"
          title="One company, four years, increasing scope."
        />

        <div className="mt-12 space-y-10">
          {experience.map((role) => (
            <Reveal key={role.company}>
              <div className="hairline rounded-xl border border-line bg-surface p-6 md:p-9">
                <div className="flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div>
                    <h3 className="text-xl font-medium text-heading md:text-2xl">
                      {role.title}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-accent">
                      {role.company}
                      <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                        Current
                      </span>
                    </p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="numeric text-sm text-heading">{role.period}</p>
                    <p className="mono-label mt-1">{role.location}</p>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl leading-relaxed text-body">
                  {role.summary}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {role.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-8%' }}
                      transition={{ delay: 0.05 * i, duration: 0.45 }}
                      className="flex max-w-3xl gap-3.5 text-sm leading-relaxed text-body"
                    >
                      <span className="mono-label shrink-0 pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          {/* `download` so the button does what its label says — the Hero one
              deliberately opens in a tab for a quick look instead. */}
          <a
            href={profile.resumeUrl}
            download
            className="group inline-flex items-center gap-2.5 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-heading transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download full résumé
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
