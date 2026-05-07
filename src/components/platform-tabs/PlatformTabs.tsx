import React, { useState, useEffect, useRef } from 'react';
import {
  FaShieldAlt,
  FaUserPlus,
  FaClock,
  FaCogs,
  FaTrophy,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBullseye,
  FaChevronRight,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';
import styles from './PlatformTabs.module.scss';

export interface TabContent {
  title: string;
  description: string;
  bullets: string[];
  image: string;
}

export const platformTabContents: Record<string, TabContent> = {
  'Staff Documents': {
    title: 'Secure Staff & Organisational Document Vault',
    description:
      'Store, organise, and control access to every employee and company document in one encrypted, permission-controlled vault — accessible anywhere, any time.',
    bullets: [
      'Contracts, IDs, Certifications & Policy Acknowledgements',
      'Expiry Alerts for Visas, Licences & Compliance Documents',
      'Role-Based Access — Staff See Only Their Own Files',
      'Audit Trail on Every Document View, Edit & Download',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/security.jpg',
  },
  'Recruitment & Onboarding': {
    title: 'Recruit Faster, Onboard Smarter',
    description:
      'Post jobs, track applicants, send offer letters, and onboard new hires — all without leaving OnTap. Get new employees productive from day one.',
    bullets: [
      'Centralized Job Posting & Applicant Tracking',
      'Automated Offer Letters & Digital Contracts',
      'Structured Onboarding Checklists & Task Automation',
      'Accessible via Desktop, Mobile App, or WhatsApp',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/onboard.jpg',
  },
  'Attendance & Leave': {
    title: 'Real-Time Attendance & Leave Management',
    description:
      "Track who's in, who's out, and who's on leave — in real time. Eliminate buddy-punching with GPS and biometric check-ins across all sites.",
    bullets: [
      'GPS & Biometric Attendance Tracking',
      'Automated Leave Approvals & Balance Accruals',
      'Dynamic Shift Scheduling & Swap Management',
      'Live Attendance Dashboard & Custom Reports',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/attendance.jpg',
  },
  'HR Control': {
    title: 'Full HR Command Center',
    description:
      'Manage employee records, documents, policies, and workflows from one secure dashboard with complete audit trails and role-based access.',
    bullets: [
      'Centralized Employee Records & Document Storage',
      'Policy Management & Digital Acknowledgements',
      'Role-Based Access Control & Audit Trails',
      'Automated Workflow Approvals & Escalations',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/hr.jpg',
  },
  'Employee Success': {
    title: 'Drive Performance & Engagement',
    description:
      'Set goals, run performance reviews, celebrate wins, and foster a culture where your team wants to stay and grow with you.',
    bullets: [
      'Goal Setting & OKR Tracking for All Levels',
      'Performance Reviews & 360-Degree Feedback',
      'Employee Recognition & Rewards Programs',
      'Learning & Development Module Integration',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/success.jpg',
  },
  Payroll: {
    title: 'Accurate Payroll. Zero Stress.',
    description:
      'Run compliant payroll for Kenya, Uganda, Tanzania, and 30+ countries. Handle taxes, statutory deductions, and payslip distribution automatically.',
    bullets: [
      'Kenya PAYE, NHIF, NSSF & Statutory Compliance',
      'Multi-Currency & Multi-Jurisdiction Payroll',
      'Automated Tax Calculations & Digital Payslips',
      'Seamless Integration with Accounting Systems',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/salary.jpg',
  },
  'Calendar & Tasks': {
    title: 'Universal Calendar & Task Management',
    description:
      'Keep your entire workforce aligned with a shared calendar and task system. Schedule meetings, assign work, track deadlines, and never miss a critical HR date again.',
    bullets: [
      'Shared Team & Company-Wide Calendar',
      'Task Assignment, Deadlines & Priority Tracking',
      'HR Event Reminders — Renewals, Reviews & Probations',
      'Integrated with Leave, Payroll & Compliance Timelines',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/universal-calendar.jpg',
  },
  Appraisals: {
    title: 'Structured Appraisals & Performance Reviews',
    description:
      'Replace subjective annual reviews with structured, data-driven appraisals. Set competencies, rate performance, gather peer feedback, and build a culture of continuous improvement.',
    bullets: [
      'Customizable Appraisal Templates & Scoring Frameworks',
      '360-Degree Feedback from Peers, Managers & Direct Reports',
      'Linked to Goals, KPIs & Development Plans',
      'Automated Appraisal Cycles & Email Reminders',
    ],
    image: 'https://ik.imagekit.io/nal7vhb1y/otap/appraisal.jpg',
  },
};

const tabIcons: Record<string, React.ReactNode> = {
  'Staff Documents': <FaShieldAlt />,
  'Recruitment & Onboarding': <FaUserPlus />,
  'Attendance & Leave': <FaClock />,
  'HR Control': <FaCogs />,
  'Employee Success': <FaTrophy />,
  Payroll: <FaMoneyBillWave />,
  'Calendar & Tasks': <FaCalendarAlt />,
  Appraisals: <FaBullseye />,
};

const tabOrder = Object.keys(platformTabContents);

const PlatformTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabOrder[0]);
  const [animating, setAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState<string>(tabOrder[0]);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setDisplayTab(tab);
      setAnimating(false);
    }, 250);
  };

  const activeIndex = tabOrder.indexOf(activeTab);
  const currentData = platformTabContents[displayTab];

  return (
    <section className={styles.platformSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.overline}>Complete HR Platform</span>
          <h2 className={styles.heading}>
            Everything your workforce needs,{' '}
            <span className={styles.highlight}>in one intelligent platform</span>
          </h2>
          <p className={styles.subheading}>
            OnTap brings together 24+ HR and workforce tools across eight product
            pillars — so you never need to stitch together multiple systems again.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Tabs */}
          <div className={styles.tabsPanel}>
            {tabOrder.map((tab, index) => {
              const isActive = tab === activeTab;
              const data = platformTabContents[tab];
              return (
                <button
                  key={tab}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                  onClick={() => handleTabClick(tab)}
                  aria-expanded={isActive}
                  aria-controls="tab-content-panel"
                >
                  <div className={styles.tabHeader}>
                    <span className={styles.tabNumber}>{index + 1}</span>
                    <span className={styles.tabIcon}>{tabIcons[tab]}</span>
                    <span className={styles.tabTitle}>{tab}</span>
                    <FaChevronRight
                      className={`${styles.tabChevron} ${
                        isActive ? styles.tabChevronActive : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`${styles.tabBody} ${
                      isActive ? styles.tabBodyActive : ''
                    }`}
                  >
                    <p className={styles.tabDescription}>{data.description}</p>
                    <div className={styles.tabBullets}>
                      {data.bullets.slice(0, 2).map((bullet) => (
                        <span key={bullet} className={styles.tabBullet}>
                          <FaCheckCircle className={styles.tabBulletIcon} />
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Pagination dots */}
            <div className={styles.pagination}>
              {tabOrder.map((tab, index) => (
                <button
                  key={tab}
                  className={`${styles.dot} ${
                    index === activeIndex ? styles.dotActive : ''
                  }`}
                  onClick={() => handleTabClick(tab)}
                  aria-label={`Go to ${tab}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div
            id="tab-content-panel"
            className={styles.contentPanel}
            ref={contentRef}
          >
            <div
              className={`${styles.contentCard} ${
                animating ? styles.contentExit : styles.contentEnter
              }`}
            >
              <div className={styles.contentHeader}>
                <span className={styles.contentBadge}>
                  Step {activeIndex + 1} of {tabOrder.length}
                </span>
                <h3 className={styles.contentTitle}>{currentData.title}</h3>
                <p className={styles.contentDescription}>
                  {currentData.description}
                </p>
              </div>

              <div className={styles.contentBody}>
                <h4 className={styles.contentSubheading}>Key Features</h4>
                <ul className={styles.bulletList}>
                  {currentData.bullets.map((bullet) => (
                    <li key={bullet} className={styles.bulletItem}>
                      <span className={styles.bulletIcon}>
                        <FaCheckCircle />
                      </span>
                      <span className={styles.bulletText}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.contentFooter}>
                <a href="#contact" className={styles.ctaButton}>
                  Book a Free Demo
                  <FaArrowRight className={styles.ctaIcon} />
                </a>
                <a
                  href="https://ontapke.com/solutions/hr-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.learnMore}
                >
                  Learn more about {displayTab}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformTabs;
