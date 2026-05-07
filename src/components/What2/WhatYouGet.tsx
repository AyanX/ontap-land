import React from 'react';
import styles from './WhatYouGet.module.scss';

export interface WhatYouGetCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface WhatYouGetData {
  label: string;
  heading: string;
  cards: WhatYouGetCard[];
}

export const whatYouGetData: WhatYouGetData = {
  label: 'WHAT YOU GET',
  heading: 'Stop Firefighting HR. Start Leading It.',
  cards: [
    {
      id: 1,
      title: 'Streamlined HR Processes',
      description:
        'Automate repetitive HR tasks from onboarding to payroll — freeing your team to focus on strategy, culture, and growth.',
      image:
        'https://ik.imagekit.io/rif2bzixm/ontap-landing-page-small%20(1).jpg?updatedAt=1777911803889',
    },
    {
      id: 2,
      title: 'Advanced People Analytics',
      description:
        'Get real-time dashboards and reports on attendance, performance, headcount, and payroll — so every decision is data-backed.',
      image: 'https://ik.imagekit.io/nal7vhb1y/otap/user%20analytics.jpg',
    },
    {
      id: 3,
      title: 'Seamless Integrations',
      description:
        'Connect OnTap with your existing ERP, accounting, and productivity tools — no messy migrations, no data silos.',
      image: 'https://ik.imagekit.io/rif2bzixm/coding-icon-vector-Photoroom%20(1).png',
    },
  ],
};

const WhatYouGet2: React.FC = () => {
  const { label, heading, cards } = whatYouGetData;
  const topCards = cards.slice(0, 2);
  const bottomCard = cards[2];

  return (
    <section className={styles.section} aria-labelledby="what-you-get-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>{label}</span>
          <h2 id="what-you-get-heading" className={styles.heading}>
            {heading}
          </h2>
        </header>

        <div className={styles.grid}>
          {/* Top Row — 2 Cards Side by Side */}
          <div className={styles.topRow}>
            {topCards.map((card) => (
              <article key={card.id} className={styles.cardTop}>
                <figure className={styles.figureTop}>
                  <img
                    src={card.image}
                    alt={`${card.title} — ${card.description}`}
                    className={styles.imageTop}
                    loading="lazy"
                    width={600}
                    height={340}
                  />
                </figure>
                <div className={styles.bodyTop}>
                  <h3 className={styles.title}>{card.title}</h3>
                  <p className={styles.description}>{card.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Row — 1 Card Full Width, Horizontal */}
          <article className={styles.cardBottom}>
            <figure className={styles.figureBottom}>
              <img
                src={bottomCard.image}
                alt={`${bottomCard.title} — ${bottomCard.description}`}
                className={styles.imageBottom}
                loading="lazy"
                width={400}
                height={300}
              />
            </figure>
            <div className={styles.bodyBottom}>
              <h3 className={styles.titleBottom}>{bottomCard.title}</h3>
              <p className={styles.descriptionBottom}>{bottomCard.description}</p>
              <a
                href="https://ontapke.com/integrations"
                className={styles.linkBottom}
                aria-label={`Explore ${bottomCard.title}`}
              >
                Explore integrations
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </article>
        </div>

        <div className={styles.ctaWrap}>
          <a
            href="https://ontapke.com/demo"
            className={styles.cta}
            aria-label="Book a free demo of OnTap HR platform"
          >
            Book a Free Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet2;
