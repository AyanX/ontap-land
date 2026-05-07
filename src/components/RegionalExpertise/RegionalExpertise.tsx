import arrow from "../../assets/arrow-white.png";
import map from "../../assets/location.png"

import { useInView } from 'react-intersection-observer';
import { regionalData } from '../../data';
import styles from './RegionalExpertise.module.scss';


export default function RegionalExpertise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.section} aria-label="Regional Expertise" ref={ref}>
      <div className={styles.blobRE} aria-hidden="true" />
      <div className={styles.blobRERight} aria-hidden="true" />
      <div className={`${styles.container} ${inView ? styles.visible : ''}`}>
        <div className={styles.badge}>
          <img src={map} alt="location" width={14} height={14} />
          Nairobi, Kenya — Built for East Africa
        </div>
        <h2 className={styles.heading}>{regionalData?.heading}</h2>
        <p className={styles.description}>{regionalData?.description}</p>
        <div className={styles.ctaGroup}>
          <a href="#contact" className={styles.ctaPrimary}>
            Start Your Free Demo
            <img src={arrow} alt="arrow right" width={18} height={18} />
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}
