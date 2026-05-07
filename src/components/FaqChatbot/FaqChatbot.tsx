import { useState, useEffect, useRef } from 'react';
import { faqs, Faq } from './faqs';
import styles from './FaqChatbot.module.scss';
import logo from '../../assets/ontap-logo-green.png';

// ─── Types ────────────────────────────────────────────────────────────────────
type Message =
  | { type: 'welcome' }
  | { type: 'user'; text: string }
  | { type: 'bot'; text: string }
  | { type: 'contact-nudge' }
  | { type: 'contact-form' }
  | { type: 'contact-success' };

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const emptyContact: ContactForm = {
  firstName: '', lastName: '', email: '', phone: '', company: '', message: '',
};

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}

// ─── Inline contact form (rendered inside a chat bubble) ──────────────────────
function InlineContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<ContactForm>(emptyContact);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = (): string | null => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!isValidEmail(form.email)) return 'Enter a valid email address.';
    if (!form.phone.trim()) return 'Phone number is required.';
    if (!form.company.trim()) return 'Company name is required.';
    if (!form.message.trim()) return 'Please write a brief message.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL as string;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.inlineForm} onSubmit={handleSubmit} noValidate>
      <p className={styles.inlineFormIntro}>
        Fill in the form below and we'll get back to you shortly. 👋
      </p>
      <div className={styles.inlineRow}>
        <input
          className={styles.inlineInput}
          type="text"
          placeholder="First name"
          value={form.firstName}
          onChange={set('firstName')}
        />
        <input
          className={styles.inlineInput}
          type="text"
          placeholder="Last name"
          value={form.lastName}
          onChange={set('lastName')}
        />
      </div>
      <input
        className={styles.inlineInput}
        type="email"
        placeholder="Work email"
        value={form.email}
        onChange={set('email')}
      />
      <div className={styles.inlineRow}>
        <input
          className={styles.inlineInput}
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={set('phone')}
        />
        <input
          className={styles.inlineInput}
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={set('company')}
        />
      </div>
      <textarea
        className={`${styles.inlineInput} ${styles.inlineTextarea}`}
        placeholder="How can we help you?"
        rows={3}
        value={form.message}
        onChange={set('message')}
      />
      {error && <p className={styles.inlineError}>{error}</p>}
      <button type="submit" className={styles.inlineSubmit} disabled={loading}>
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send message
          </>
        )}
      </button>
    </form>
  );
}

// ─── Main chatbot component ───────────────────────────────────────────────────
export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ type: 'welcome' }]);
  const [inputVal, setInputVal] = useState('');
  const [hasAsked, setHasAsked] = useState(false);
  const [formShown, setFormShown] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const appendBotReply = (answer: string) => {
    setMessages(prev => [
      ...prev,
      { type: 'bot', text: answer },
      { type: 'contact-nudge' },
    ]);
  };

  const handleFaqClick = (faq: Faq) => {
    setHasAsked(true);
    setMessages(prev => [
      ...prev,
      { type: 'user', text: faq.question },
      { type: 'bot', text: faq.answer },
      { type: 'contact-nudge' },
    ]);
  };

  const handleTalkToTeam = () => {
    if (formShown) return;
    setFormShown(true);
    setMessages(prev => [
      ...prev,
      { type: 'contact-form' },
    ]);
  };

  const handleFormSuccess = () => {
    setMessages(prev => [
      ...prev.filter(m => m.type !== 'contact-form'),
      { type: 'contact-success' },
    ]);
    setFormShown(false);
  };

  const handleNewChat = () => {
    setMessages([{ type: 'welcome' }]);
    setHasAsked(false);
    setInputVal('');
    setFormShown(false);
  };

  const handleInputSend = () => {
    const val = inputVal.trim();
    if (!val) return;
    const lower = val.toLowerCase();
    const matched = faqs.find(f =>
      f.question.toLowerCase().split(' ').some(w => w.length > 3 && lower.includes(w))
    );
    setHasAsked(true);
    setInputVal('');
    if (matched) {
      setMessages(prev => [
        ...prev,
        { type: 'user', text: val },
      ]);
      setTimeout(() => appendBotReply(matched.answer), 320);
    } else {
      setMessages(prev => [
        ...prev,
        { type: 'user', text: val },
      ]);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            text: "I don't have a specific answer for that — but our team does! Use the form below to reach us directly.",
          },
          { type: 'contact-nudge' },
        ]);
      }, 320);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInputSend();
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open FAQ chat'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && <span className={styles.fabPulse} />}
      </button>

      {/* Panel */}
      <div
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-label="OnTap FAQ Assistant"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>
              <img src={logo} alt="OnTap" className={styles.avatarImg} />
            </div>
            <div className={styles.headerInfo}>
              <span className={styles.botName}>OnTap Assistant</span>
              <span className={styles.onlineRow}>
                <span className={styles.onlineDot} />
                Online · replies instantly
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.newChatBtn} onClick={handleNewChat}>New chat</button>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={styles.body} ref={bodyRef}>
          {messages.map((msg, i) => {
            /* Welcome */
            if (msg.type === 'welcome') return (
              <div key={i} className={styles.welcomeBlock}>
                <div className={styles.welcomeCard}>
                  <span className={styles.welcomeLabel}>ONTAP ASSISTANT</span>
                  <h3 className={styles.welcomeTitle}>Instant answers about OnTap HRMS</h3>
                  <p className={styles.welcomeDesc}>
                    Ask anything about our features, pricing, compliance, or onboarding process.
                  </p>
                </div>
                {!hasAsked && (
                  <div className={styles.faqGrid}>
                    {faqs.slice(0, 6).map(faq => (
                      <button key={faq.id} className={styles.faqPill} onClick={() => handleFaqClick(faq)}>
                        {faq.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );

            /* User bubble */
            if (msg.type === 'user') return (
              <div key={i} className={styles.userMsg}>
                <span>{msg.text}</span>
              </div>
            );

            /* Bot bubble */
            if (msg.type === 'bot') return (
              <div key={i} className={`${styles.botMsgRow} ${styles.fadeIn}`}>
                <div className={styles.botAvatarSmall}>
                  <img src={logo} alt="" className={styles.avatarImg} />
                </div>
                <div className={styles.botMsg}>
                  <span className={styles.botSender}>OnTap Assistant</span>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
 
            if (msg.type === 'contact-nudge') return (
              <div key={i} className={styles.nudgeRow}>
                <span>Still need help?</span>
                <button className={styles.nudgeLink} onClick={handleTalkToTeam}>
                  Talk to our team →
                </button>
              </div>
            );

            /* Inline contact form bubble */
            if (msg.type === 'contact-form') return (
              <div key={i} className={`${styles.botMsgRow} ${styles.fadeIn}`}>
                <div className={styles.botAvatarSmall}>
                  <img src={logo} alt="" className={styles.avatarImg} />
                </div>
                <div className={`${styles.botMsg} ${styles.botMsgForm}`}>
                  <span className={styles.botSender}>OnTap Assistant</span>
                  <p className={styles.formIntroText}>
                    Happy to connect you with our team! Just fill in your details below and someone will be in touch within the hour.
                  </p>
                  <InlineContactForm onSuccess={handleFormSuccess} />
                </div>
              </div>
            );

            /* Success bubble */
            if (msg.type === 'contact-success') return (
              <div key={i} className={`${styles.botMsgRow} ${styles.fadeIn}`}>
                <div className={styles.botAvatarSmall}>
                  <img src={logo} alt="" className={styles.avatarImg} />
                </div>
                <div className={`${styles.botMsg} ${styles.successMsg}`}>
                  <span className={styles.botSender}>OnTap Assistant</span>
                  <div className={styles.successContent}>
                    <div className={styles.successIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.successTitle}>Message sent!</p>
                      <p className={styles.successDesc}>Our team will reach out to you shortly. We look forward to connecting!</p>
                    </div>
                  </div>
                </div>
              </div>
            );

            return null;
          })}
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Ask a question..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.sendBtn}
            onClick={handleInputSend}
            disabled={!inputVal.trim()}
            aria-label="Send"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className={styles.disclaimer}>Press Enter to send · Shift + Enter for a new line</p>
      </div>
    </>
  );
}
