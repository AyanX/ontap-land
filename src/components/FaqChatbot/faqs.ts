export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: 'what-is-ontap',
    question: 'What is OnTap HRMS?',
    answer:
      'OnTap is an all-in-one HR management platform built for African businesses. It covers the full employee lifecycle — from recruitment and onboarding to payroll, attendance, performance, and compliance — all in one place, accessible on web, mobile, and WhatsApp.',
  },
  {
    id: 'pricing',
    question: 'How much does OnTap cost?',
    answer:
      'OnTap is priced per employee per month, making it affordable whether you have 5 or 5,000 staff. We offer a free onboarding session and no setup fees. Book a demo and we will share a tailored quote based on your team size and modules needed.',
  },
  {
    id: 'free-trial',
    question: 'Is there a free trial?',
    answer:
      'Yes — we offer a free demo and a guided trial period so you can see OnTap working with your actual data before committing. No credit card required. Simply book a free demo and our team will get you set up within 24 hours.',
  },
  {
    id: 'payroll-compliance',
    question: 'Does OnTap handle Kenya payroll & compliance?',
    answer:
      'Absolutely. OnTap automatically calculates PAYE, NHIF, NSSF, and HELB deductions in line with KRA requirements. We also support payroll for Uganda, Tanzania, Rwanda, and 30+ other African jurisdictions, with multi-currency support built in.',
  },
  {
    id: 'onboarding',
    question: 'How long does implementation take?',
    answer:
      'Most businesses are fully live within 1–5 business days. Our team handles the setup, data migration, and staff training for you at no extra cost. We assign a dedicated onboarding specialist to every new account.',
  },
  {
    id: 'attendance',
    question: 'How does attendance tracking work?',
    answer:
      'OnTap supports GPS check-in via mobile app, biometric device integration, and WhatsApp-based clock-in for field teams. Managers get a live attendance dashboard and automated alerts for late arrivals, absenteeism, and overtime.',
  },
  {
    id: 'data-security',
    question: 'Is our employee data safe?',
    answer:
      'Yes. OnTap uses bank-grade AES-256 encryption, role-based access controls, and full audit trails on every action. Your data is hosted on ISO 27001-certified servers and we are fully compliant with Kenya Data Protection Act requirements.',
  },
  {
    id: 'integrations',
    question: 'Does OnTap integrate with other tools?',
    answer:
      'OnTap integrates with popular accounting systems (QuickBooks, Xero, Sage), ERP platforms, and communication tools. We also offer an open REST API for custom integrations. Our team can advise on the best setup for your existing stack.',
  },
  {
    id: 'mobile',
    question: 'Is there a mobile app?',
    answer:
      'Yes — OnTap has native iOS and Android apps for employees and managers. Staff can apply for leave, view payslips, clock in, and check schedules on the go. Managers can approve requests and view dashboards from anywhere.',
  },
  {
    id: 'support',
    question: 'What support do you offer?',
    answer:
      'Every OnTap customer gets dedicated onboarding support, a help centre, live chat, and email support. Enterprise customers get a named account manager and SLA-backed response times. We are Kenya-based, so we understand your business context.',
  },
];
