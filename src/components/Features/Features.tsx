import { useState, useCallback } from 'react';
import { useInView } from '../../hooks/useInView';
import { platformFeature, platformTabs, platformTabContents } from '../../data';
import Skeleton from '../Skeleton/Skeleton';
import styles from './Features.module.scss';

export default function Features() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.06 });
  const [activeTab, setActiveTab] = useState(platformTabs[0]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
    setImgLoaded(false);
  }, []);

  const tabContent = platformTabContents[activeTab];
  return (
    <section className={styles.section} aria-label="HR Platform Features" id="features" ref={ref}>
      <div className={styles.sectionBlob} aria-hidden="true" />
      <div className={styles.container}>
        <span className={`${styles.label} anim-fade-up ${visible ? "is-visible" : ""}`}>{platformFeature?.label}</span>
        <h2 className={`${styles.heading} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.1s" }}>{platformFeature?.heading}</h2>
        <p className={`${styles.description} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.18s" }}>{platformFeature?.description}</p>

        <div className={`${styles.tabs} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.26s" }} role="tablist" aria-label="HR Platform tabs">
          {platformTabs?.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.content} role="tabpanel">
          <div className={styles.contentLeft}>
            <h3 className={styles.contentTitle}>{tabContent?.title}</h3>
            <p className={styles.contentDesc}>{tabContent?.description}</p>
            <ul className={styles.bullets}>
              {tabContent?.bullets?.map((bullet, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.bulletDot} aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.ctaBtn}>Book a Free Demo</a>
          </div>
          <div className={styles.contentRight}>
            {!imgLoaded ? <Skeleton className={styles.skeletonLoader} /> : null}
            <img
              src={tabContent?.image}
              alt={tabContent?.title}
              className={styles.featureImage}
           style={{ opacity: imgLoaded ? 1 : 0 }}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
