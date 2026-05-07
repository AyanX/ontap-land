import { useState } from 'react';
import { useInView } from '../../hooks/useInView';

import star from "../../assets/star.png";
import arrow from "../../assets/arrow-white.png";
import check from "../../assets/check-circle.png";

import { heroData } from '../../data';
import { useToast } from '../../hooks/useToast';
import Toast from '../Toast/Toast';
import styles from './Hero.module.scss';

const benefits = ['No setup fees', 'Free onboarding support', 'Cancel anytime'];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  agreed: boolean;
}

const initialForm: FormState = {
  firstName: '', lastName: '', email: '', phone: '', company: '', agreed: false,
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Hero() {
  const { ref: heroRef, visible: heroVisible } = useInView<HTMLDivElement>({ threshold: 0.08 });
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const validate = (): string | null => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!isValidEmail(form.email)) return 'Please enter a valid email address.';
    if (!form.phone.trim()) return 'Phone number is required.';
    if (!form.company.trim()) return 'Company name is required.';
    if (!form.agreed) return 'Please agree to the Terms of Service.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) { showToast(error, 'error'); return; }

    setLoading(true);
    try {
      const apiUrl = "https://hrms-api.ontapke.com/contact/demo"
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          message: 'Demo request from hero form.',
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
    <section className={styles.hero} aria-label="Hero section">
      <div className={styles.blobTopRight} aria-hidden="true" />
      <div className={styles.blobBottomLeft} aria-hidden="true" />
      <div className={styles.blobMid} aria-hidden="true" />
      <div className={styles.gridMesh} aria-hidden="true" />

      <svg className={styles.vectorCircles} viewBox="0 0 220 220" fill="none" aria-hidden="true">
        <circle cx="110" cy="110" r="100" stroke="#1a73e8" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.18" />
        <circle cx="110" cy="110" r="65" stroke="#1a73e8" strokeWidth="1" strokeDasharray="4 8" opacity="0.12" />
        <circle cx="110" cy="110" r="30" stroke="#1a73e8" strokeWidth="1" opacity="0.08" />
      </svg>

      <svg className={styles.vectorSquare} viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="144" height="144" rx="22" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="7 5" opacity="0.22" />
        <rect x="28" y="28" width="104" height="104" rx="14" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 7" opacity="0.13" />
      </svg>

      <svg className={styles.vectorDots} viewBox="0 0 130 130" fill="none" aria-hidden="true">
        {[0,1,2,3,4].map(row =>
          [0,1,2,3,4].map(col => (
            <circle key={`${row}-${col}`} cx={col * 26 + 13} cy={row * 26 + 13} r="2.8" fill="#1a73e8" opacity="0.2" />
          ))
        )}
      </svg>

      <svg className={styles.vectorWave} viewBox="0 0 400 80" fill="none" aria-hidden="true">
        <path d="M0 40 C60 10, 120 70, 180 40 S300 10, 400 40" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.15" fill="none" />
        <path d="M0 55 C60 25, 120 85, 180 55 S300 25, 400 55" stroke="#1a73e8" strokeWidth="1" opacity="0.1" fill="none" />
      </svg>

      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className={styles.container} ref={heroRef}>
        <div className={`${styles.left} anim-fade-up ${heroVisible ? "is-visible" : ""}`}>
          <div className={styles.taglinePill}>
            <span className={styles.taglineDot} />
            {heroData?.tagline}
          </div>

          <h1 className={styles.headline}>{heroData?.headline}</h1>
          <p className={styles.description}>{heroData?.description}</p>

          <div className={styles.benefitsList}>
            {benefits.map((b) => (
              <div key={b} className={styles.benefitItem}>
                <img src={check} alt="check" width={16} height={16} className={styles.benefitIcon} />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <a href="#contact" className={styles.ctaPrimary}>
              {heroData?.ctaPrimary}
              <img src={arrow} alt="arrow right" width={18} height={18} />
            </a>
            <a href="#features" className={styles.ctaSecondary}>
              {heroData?.ctaSecondary}
            </a>
          </div>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={star} alt={i < 4 ? 'filled star' : 'empty star'} width={15} height={15} />
              ))}
            </div>
            <span className={styles.ratingValue}>{heroData?.rating}/5</span>
            <span className={styles.ratingDivider}>·</span>
            <span className={styles.ratingLabel}>{heroData?.ratingLabel}</span>
          </div>
        </div>

        <div className={`${styles.right} anim-slide-right ${heroVisible ? "is-visible" : ""}`} style={{ animationDelay: "0.15s" }}>
          <div className={styles.formCardWrap}>
            <div className={styles.formCardGlow} aria-hidden="true" />
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>{heroData?.demoTitle}</h2>
                <p className={styles.formSubtitle}>Join 4,000+ businesses already saving time</p>
              </div>
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.row}>
                  <input type="text" placeholder="First Name" className={styles.input} value={form.firstName} onChange={set('firstName')} required />
                  <input type="text" placeholder="Last Name" className={styles.input} value={form.lastName} onChange={set('lastName')} required />
                </div>
                <input type="email" placeholder="Work Email" className={styles.input} value={form.email} onChange={set('email')} required />
                <input type="tel" placeholder="Phone Number" className={styles.input} value={form.phone} onChange={set('phone')} required />
                <input type="text" placeholder="Company Name" className={styles.input} value={form.company} onChange={set('company')} required />
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" checked={form.agreed} onChange={set('agreed')} />
                  <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</span>
                </label>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Sending...' : 'Book My Free Demo'}
                  {!loading && <img src={arrow} alt="arrow right" width={18} height={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
