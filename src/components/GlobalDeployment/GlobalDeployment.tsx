import { useInView } from 'react-intersection-observer';
import { globalDeploymentData } from '../../data';
import styles from './GlobalDeployment.module.scss';

export default function GlobalDeployment() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={styles.section} aria-label="Global Deployment" ref={ref}>
      <div className={styles.blobGlobe} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.heading}>{globalDeploymentData?.subheading}</h2>
          <p className={styles.description}>{globalDeploymentData?.description}</p>
          <div className={styles.flags}>
            {globalDeploymentData?.countries?.map((country) => (
              <div key={country?.name} className={styles.flagItem} title={country?.name}>
                <img
                  src={country?.flag}
                  alt={country?.name}
                  className={styles.flagImg}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.flagLabel}>{country?.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.right} ${inView ? styles.visible : ''}`}>
          <img
            src={globalDeploymentData?.globeImage}
            alt="Global deployment map"
            className={styles.globeImg}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
