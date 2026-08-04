import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import { projects, type Project } from '../../data/content'
import { Chip, Reveal, Section, SectionHeading } from '../ui/Primitives'
import { setScrollLocked } from '../system/SmoothScroll'

export default function Work() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const open = projects.find((p) => p.slug === openSlug) ?? null

  useEffect(() => {
    setScrollLocked(open !== null)
    return () => setScrollLocked(false)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenSlug(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Section id="work" divider={false}>
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Selected work"
          title="Three systems, four years, one constant: too much data for the browser."
          description="All three shipped at Distronix. Each one is a case study with the real numbers attached."
        />

        <div className="mt-12 space-y-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectRow project={project} index={i} onOpen={() => setOpenSlug(project.slug)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpenSlug(null)} />}
      </AnimatePresence>
    </Section>
  )
}

/* ------------------------------------------------------------------ */

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="group hairline block w-full rounded-xl border border-line bg-surface p-6 text-left transition-colors duration-300 hover:border-line-strong hover:bg-raised md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <span className="mono-label shrink-0 pt-1 transition-colors duration-300 group-hover:text-accent md:w-10">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl font-medium text-heading md:text-3xl">
              {project.title}
            </h3>
            <span className="mono-label">{project.period}</span>
          </div>

          <p className="mt-1 text-sm text-muted">{project.subtitle}</p>

          <p className="mt-4 max-w-2xl leading-relaxed text-body">{project.summary}</p>

          {/* Metrics rail — the reason to click through. */}
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="numeric text-base text-heading">{m.value}</dt>
                <dd className="mono-label mt-1">{m.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {project.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start text-sm text-muted transition-colors group-hover:text-accent md:pt-1.5">
          Case study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  )
}

/* ------------------------------------------------------------------ */

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-250 flex items-end justify-center md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        /* Lenis preventDefaults wheel events across the document, so a nested
           scroller stays frozen without this opt-out. Touch needs it too. */
        data-lenis-prevent
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border border-line bg-surface md:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface px-6 py-5 md:px-9">
          <div className="min-w-0">
            <p className="mono-label">
              {project.category} · {project.period}
            </p>
            <h3 className="mt-1.5 truncate text-2xl font-medium text-heading">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-body transition-colors hover:bg-raised hover:text-heading"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-7 md:px-9 md:py-9">
          <p className="text-lg leading-relaxed text-heading">{project.summary}</p>

          <Block label="The problem">
            <p className="leading-relaxed text-body">{project.problem}</p>
          </Block>

          <Block label="What I built">
            <ul className="space-y-3">
              {project.points.map((point, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-body">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Numbers">
            <dl className="grid grid-cols-2 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-lg border border-line p-4">
                  <dt className="numeric text-lg text-heading">{m.value}</dt>
                  <dd className="mono-label mt-1">{m.label}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="Impact">
            <p className="border-l-2 border-accent pl-4 leading-relaxed text-heading">
              {project.impact}
            </p>
          </Block>

          <Block label="Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </Block>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-9">
      <p className="mono-label mb-3.5">{label}</p>
      {children}
    </div>
  )
}
