import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Send } from 'lucide-react'
import { profile, socials } from '../../data/content'
import { useCopy } from '../../hooks'
import { Reveal, Section, SplitText } from '../ui/Primitives'
import { SOCIAL_ICONS } from '../ui/BrandIcons'

interface FormState {
  name: string
  email: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', message: '' }

export default function Contact() {
  const { copied, copy } = useCopy()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [sent, setSent] = useState(false)

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      setErrors((err) => ({ ...err, [key]: undefined }))
    }

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (!form.name.trim()) next.name = 'Your name, please.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'That email looks off.'
    if (form.message.trim().length < 12) next.message = 'A little more detail helps.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  /**
   * No backend here — the form composes a prefilled mail draft.
   * Swap this for a fetch() to your endpoint when you have one.
   */
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`

    setSent(true)
    setForm(EMPTY)
    window.setTimeout(() => setSent(false), 6000)
  }

  return (
    <Section id="contact">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Pitch */}
          <div>
            <Reveal className="mb-4 flex items-center gap-3" y={10}>
              <span className="mono-label text-accent">06</span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="mono-label">Contact</span>
            </Reveal>

            <h2 className="text-title text-heading">
              <SplitText text="Building something" className="block" />
              <SplitText text="data-heavy?" className="block" delay={0.1} />
            </h2>

            <Reveal delay={0.15} className="mt-6 max-w-md leading-relaxed text-body">
              I am open to frontend and full-stack roles centred on real-time,
              data-heavy products. Tell me what you are building and what is
              currently painful about it.
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <button
                onClick={() => void copy(profile.email)}
                className="group flex w-full max-w-md items-center justify-between gap-4 hairline rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-line-strong"
              >
                <div className="min-w-0">
                  <p className="mono-label mb-1">Email</p>
                  <p className="truncate text-heading">{profile.email}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'done' : 'copy'}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </Reveal>

            <Reveal delay={0.25} className="mt-5 max-w-md">
              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                className="numeric text-sm text-body transition-colors hover:text-heading"
              >
                {profile.phone}
              </a>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading"
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </a>
                )
              })}
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              noValidate
              className="hairline rounded-xl border border-line bg-surface p-6 md:p-8"
            >
              <Field
                label="Name"
                id="name"
                value={form.name}
                onChange={set('name')}
                error={errors.name}
                placeholder="Your name"
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={set('email')}
                error={errors.email}
                placeholder="you@company.com"
              />
              <Field
                label="What are you building?"
                id="message"
                textarea
                value={form.message}
                onChange={set('message')}
                error={errors.message}
                placeholder="A short brief, the timeline, and what success looks like."
              />

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-lg bg-heading px-6 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-85"
              >
                {sent ? 'Draft opened in your mail app' : 'Send message'}
                {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </button>

              <p className="mt-3.5 text-center font-mono text-[11px] text-muted">
                Opens a prefilled draft — nothing is sent without you.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  placeholder?: string
  type?: string
  textarea?: boolean
}

function Field({ label, id, error, textarea, ...rest }: FieldProps) {
  const shared =
    'w-full rounded-lg border bg-ink px-3.5 py-3 text-sm text-heading outline-none transition-colors placeholder:text-muted focus:border-accent'
  const border = error ? 'border-accent' : 'border-line'

  return (
    <div className="mb-5">
      <label htmlFor={id} className="mono-label mb-2 block">
        {label}
      </label>

      {textarea ? (
        <textarea id={id} rows={5} className={`${shared} ${border} resize-none`} {...rest} />
      ) : (
        <input id={id} className={`${shared} ${border}`} {...rest} />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 font-mono text-[11px] text-accent"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
