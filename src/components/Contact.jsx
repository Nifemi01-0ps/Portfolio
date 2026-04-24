import { useState } from 'react';
import styles from '../styles/Contact.module.css';

const FORMSPREE_URL = 'https://formspree.io/f/xpqkkvjo';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const disabled =
    status === 'sending' ||
    !form.name ||
    !form.email ||
    !form.message;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.label}>Get In Touch</p>
          <h2 className={styles.title}>Let's build something.</h2>
        </div>

        <div className={styles.grid}>

          {/* Left Info */}
          <div className={styles.info}>
            <p className={styles.desc}>
              Open to freelance projects, full-time frontend roles, and interesting collaborations.
              I'll reply within 24 hours.
            </p>

            <div className={styles.contactList}>
              {[
                { l: 'Email', v: 'raphaeledafesnr@gmail.com', h: 'mailto:raphaeledafesnr@gmail.com' },
                { l: 'Phone', v: '+234 903 448 3597', h: 'tel:+2349034483597' },
                { l: 'GitHub', v: 'github.com/nifemi01-0ps', h: 'https://github.com/nifemi01-0ps' },
              ].map(({ l, v, h }) => (
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

          {/* Form */}
          <div className={styles.formBox}>

            {status === 'sent' ? (
              <div className={styles.success}>
                <span className={styles.check}>✓</span>
                <h3 className={styles.successTitle}>Message sent!</h3>
                <p className={styles.successText}>
                  Thanks for reaching out. I'll reply soon.
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className={styles.secondaryBtn}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>

                <div className={styles.row}>
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label>Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === 'error' && (
                  <p className={styles.error}>
                    Something went wrong — please email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={disabled}
                  className={`${styles.submitBtn} ${
                    disabled ? styles.disabled : ''
                  }`}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}