import { useInView } from 'react-intersection-observer';
import { complianceData } from '../../data';
import styles from './Compliance.module.scss';

export default function Compliance() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={styles.section} aria-label="HR Compliance and Security" ref={ref}>
      <div className={styles.container}>
        <div className={`${styles.topCard} ${inView ? styles.visible : ''}`}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{complianceData?.hrCompliance?.title}</h3>
            <p className={styles.cardDesc}>{complianceData?.hrCompliance?.description}</p>
            <div className={styles.tags}>
              {complianceData?.hrCompliance?.tags?.map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.cardImage}>
            <img
              src={complianceData?.hrCompliance?.image}
              alt="HR Compliance"
              className={styles.img}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={`${styles.bottomCard} ${styles.cardSecurity} ${inView ? styles.visible : ''}`} style={{ animationDelay: '0.15s' }}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{complianceData?.security?.title}</h3>
              <p className={styles.cardDesc}>{complianceData?.security?.description}</p>
              <div className={styles.badges}>
                {complianceData?.security?.badges?.map((badge, i) => (
                  <span key={i} className={styles.badge}>{badge}</span>
                ))}
              </div>
              <div className={styles.tags}>
                {complianceData?.security?.tags?.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.bottomCard} ${styles.cardImageOnly} ${inView ? styles.visible : ''}`} style={{ animationDelay: '0.25s' }}>
      
                <img 
                  src={complianceData?.security?.image[0]}
                  alt={`Enterprise-Grade Security`}
                  className={styles.bottomImg}
                  loading="lazy"
                  decoding="async"
                />
          
        
          </div>
        </div>

        <a href="#contact" className={styles.ctaBtn}>{complianceData?.ctaLabel}</a>
      </div>
    </section>
  );
}
