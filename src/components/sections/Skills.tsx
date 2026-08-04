import { skillGroups } from '../../data/content'
import { Chip, Reveal, Section, SectionHeading } from '../ui/Primitives'

export default function Skills() {
  return (
    <Section id="skills">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Capabilities"
          title="What I reach for, grouped by where it lives."
          description="No percentage bars — a number out of 100 has never told anyone anything useful about whether you can ship."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="h-full hairline rounded-xl border border-line bg-surface p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium text-heading">{group.title}</h3>
                  <span className="mono-label">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{group.blurb}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
