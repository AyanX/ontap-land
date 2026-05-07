import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { contactData } from '../../data';
import { useToast } from '../../hooks/useToast';
import Toast from '../Toast/Toast';
import styles from './Contact.module.scss';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  agreed: boolean;
}

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  agreed: false,
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.08 });
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({
        ...form,
        [field]:
          e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value,
      });

  const validate = (): string | null => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!isValidEmail(form.email)) return 'Please enter a valid email address.';
    if (!form.phone.trim()) return 'Phone number is required.';
    if (!form.company.trim()) return 'Company name is required.';
    if (!form.message.trim()) return 'Message is required.';
    if (!form.agreed) return 'Please agree to the Terms of Service.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) { showToast(error, 'error'); return; }

    setLoading(true);
    try {
      const apiUrl =  "https://hrms-api.ontapke.com/contact/demo"
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
        showToast('Message sent successfully! We will be in touch soon.', 'success');
        setForm(initialForm);
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch {
      showToast('Failed to send message. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} aria-label="Contact us" ref={ref}>
      <div className={styles.blobContact} aria-hidden="true" />
      <div className={styles.blobContactBL} aria-hidden="true" />
      <svg className={styles.vectorDotsContact} viewBox="0 0 120 120" fill="none" aria-hidden="true">
        {[0,1,2,3,4].map(row =>
          [0,1,2,3,4].map(col => (
            <circle key={`${row}-${col}`} cx={col * 24 + 12} cy={row * 24 + 12} r="2.5" fill="#1a73e8" />
          ))
        )}
      </svg>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <div className={styles.container}>
        <div className={`${styles.left} anim-fade-up ${visible ? "is-visible" : ""}`}>
          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>{contactData?.demoCard?.title}</h3>
            <p className={styles.ctaDesc}>{contactData?.demoCard?.description}</p>
            <a href="#" className={styles.ctaBtn}>{contactData?.demoCard?.cta}</a>
          </div>
          <div className={`${styles.ctaCard} ${styles.ctaCardAlt}`}>
            <h3 className={styles.ctaTitle}>{contactData?.pricingCard?.title}</h3>
            <p className={styles.ctaDesc}>{contactData?.pricingCard?.description}</p>
            <a href="#" className={styles.ctaBtnAlt}>{contactData?.pricingCard?.cta}</a>
          </div>
        </div>

        <div className={`${styles.right} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.15s" }} id="contact">
          <h2 className={styles.formHeading}>{contactData?.contactForm?.heading}</h2>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <input type="text" placeholder="First Name" className={styles.input} value={form.firstName} onChange={set('firstName')} required />
              <input type="text" placeholder="Last Name" className={styles.input} value={form.lastName} onChange={set('lastName')} required />
            </div>
            <input type="email" placeholder="Email" className={styles.input} value={form.email} onChange={set('email')} required />
            <div className={styles.row}>
              <input type="tel" placeholder="Phone" className={styles.input} value={form.phone} onChange={set('phone')} required />
              <input type="text" placeholder="Company" className={styles.input} value={form.company} onChange={set('company')} required />
            </div>
            <textarea placeholder="Message" className={styles.textarea} rows={4} value={form.message} onChange={set('message')} required />
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={form.agreed} onChange={set('agreed')} />
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</span>
            </label>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Sending...' : contactData?.contactForm?.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
