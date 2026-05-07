import { useState, useCallback } from 'react';
import { useCaseData, industryCaseStudies } from '../../data';
import Skeleton from '../Skeleton/Skeleton';
import styles from './UseCases.module.scss';
import { useInView } from '../../hooks/useInView';

export default function UseCases() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.06 });
  const [activeIndustry, setActiveIndustry] = useState(useCaseData?.industries?.[0]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleIndustryClick = useCallback((industry: string) => {
    setActiveIndustry(industry);
  }, []);

  const caseStudy = industryCaseStudies[activeIndustry ?? ''];

  return (
    <section className={styles.section} aria-label="Use Cases" ref={ref}>
      <div className={styles.container}>
        <span className={`${styles.label} anim-fade-up ${visible ? "is-visible" : ""}`}>{useCaseData?.label}</span>
        <h2 className={`${styles.heading} anim-fade-up ${visible ? "is-visible" : ""}`}>{useCaseData?.heading}</h2>

        <div className={`${styles.tabs} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.12s" }} role="tablist">
          {useCaseData?.industries?.map((industry) => (
            <button
              key={industry}
              role="tab"
              aria-selected={activeIndustry === industry}
              className={`${styles.tab} ${activeIndustry === industry ? styles.tabActive : ''}`}
              onClick={() => handleIndustryClick(industry)}
            >
              {industry}
            </button>
          ))}
        </div>

        <div className={`${styles.caseStudy} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.22s" }}>
          <div className={styles.caseImage}>
            {!imgLoaded && <Skeleton width="100%" height="100%" className={styles.skeletonLoader} />}
            <img
              src="https://ik.imagekit.io/rif2bzixm/hero-BGg-ghgu%20(1).png"
              alt={`${activeIndustry} use case`}
              className={styles.img}
              style={{ opacity: imgLoaded ? 1 : 0 }}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.caseContent}>
            <h3 className={styles.caseTitle}>{activeIndustry}</h3>
            <p className={styles.caseDesc}>{caseStudy?.description}</p>
            <ul className={styles.challenges}>
              {caseStudy?.challenges?.map((c, i) => (
                <li key={i} className={styles.challengeItem}>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className={styles.outcome}>
              <h4 className={styles.outcomeLabel}>Outcome</h4>
              <p className={styles.outcomeText}>{caseStudy?.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
