import { useState } from 'react'
import styles from '../styles/Contact.module.css'

const FORMSPREE_URL = 'https://formspree.io/f/xpqkkvjo'

const CONTACT_ITEMS = [
  { l:'Email',  v:'raphaeledafesnr@gmail.com',  h:'mailto:raphaeledafesnr@gmail.com' },
  { l:'Phone',  v:'+234 903 448 3597',          h:'tel:+2349034483597' },
  { l:'GitHub', v:'github.com/nifemi01-0ps',    h:'https://github.com/nifemi01-0ps' },
]

export default function Contact() {
  const [form,   setForm]   = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState('idle')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name:'', email:'', message:'' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const disabled = status === 'sending' || !form.name || !form.email || !form.message

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>

        {/* ── Heading ── */}
        <div className={styles.heading}>
          <p className={`reveal ${styles.label}`}>Get In Touch</p>
          <h2 className={`reveal d1 ${styles.title}`}>Let's build something.</h2>
        </div>

        {/* ── Two-column grid ── */}
        <div className={styles.grid}>

          {/* Left — contact info */}
          <div className="reveal">
            <p className={styles.intro}>
              Open to freelance projects, full-time frontend roles, and interesting collaborations.
              I'll reply within 24 hours.
            </p>

            <div className={styles.contactList}>
              {CONTACT_ITEMS.map(({ l, v, h }) => (
                <div key={l} className={styles.contactItem}>
                  <p className={styles.contactLabel}>{l}</p>
                  <a
                    href={h}
                    target={h.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    {v}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal d2">
            {status === 'sent' ? (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>✓</span>
                <h3 className={styles.successTitle}>Message sent!</h3>
                <p className={styles.successText}>Thanks for reaching out. I'll reply soon.</p>
                <button onClick={() => setStatus('idle')} className={styles.sendAgainBtn}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className={styles.form}>

                <div className={styles.formRow}>
                  <div>
                    <label className={styles.fieldLabel} htmlFor="name">Name</label>
                    <input
                      id="name" type="text" required placeholder="Your name"
                      value={form.name} onChange={e => set('name', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <div>
                    <label className={styles.fieldLabel} htmlFor="email">Email</label>
                    <input
                      id="email" type="email" required placeholder="your@email.com"
                      value={form.email} onChange={e => set('email', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div>
                  <label className={styles.fieldLabel} htmlFor="message">Message</label>
                  <textarea
                    id="message" required rows={5} placeholder="Tell me about your project..."
                    value={form.message} onChange={e => set('message', e.target.value)}
                    className={styles.input}
                  />
                </div>

                {status === 'error' && (
                  <p className={styles.errorMsg}>
                    Something went wrong — please email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={disabled}
                  className={`${styles.submitBtn} ${disabled ? styles.submitBtnDisabled : ''}`}
                >
                  {status === 'sending'
                    ? <><span className={styles.spinner} />Sending…</>
                    : 'Send Message →'}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}