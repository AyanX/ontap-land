import { whatYouGetData } from "../../data";
import { useInView } from "../../hooks/useInView";
import styles from "./WhatYouGet.module.scss";

export default function WhatYouGet() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.08 });
  return (
    <section className={styles.section} aria-label="What You Get" ref={ref}>
      <div className={styles.blobWYG} aria-hidden="true" />
      <div className={styles.container}>
        <span className={`${styles.label} anim-fade-up ${visible ? "is-visible" : ""}`}>{whatYouGetData?.label}</span>
        <div className={`${styles.headingWrap} anim-fade-up ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.1s" }}>
          <h2 className={styles.heading}>{whatYouGetData?.heading}</h2>
        </div>

        <div className={styles.grid}>
          {whatYouGetData?.cards?.map((card, index) => (
            <div
              key={card?.id}
              className={`${styles.card} ${index === 0 ? styles.cardBig : ""} anim-fade-up ${visible ? "is-visible" : ""}`}
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <div className={styles.cardMedia}>
                <img
                  src={card.image}
                  alt={card?.title}
                  className={styles.cardImg}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card?.title}</h3>
                <p className={styles.cardDesc}>{card?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="#contact" className={styles.ctaBtn}>
          Book a Free Demo
        </a>
      </div>
    </section>
  );
}
