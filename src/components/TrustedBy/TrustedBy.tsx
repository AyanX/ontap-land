import { trustedBrands } from '../../data';
import { useInView } from '../../hooks/useInView';
import styles from './TrustedBy.module.scss';

export default function TrustedBy() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.1 });
  return (
    <section className={styles.section} aria-label="Trusted by top brands" ref={ref}>
      <div className={styles.container}>
        <h2 className={`${styles.heading} anim-fade-up ${visible ? "is-visible" : ""}`}>Trusted by Top Brands</h2>
        <div className={`${styles.logoTrack} anim-fade-in ${visible ? "is-visible" : ""}`} style={{ animationDelay: "0.2s" }} aria-hidden="true">
          <div className={styles.logoSlide}>
            {[...trustedBrands, ...trustedBrands]?.map((brand, i) => (
              <div key={`${brand?.id}-${i}`} className={styles.logoItem}>
                <img
                  src={brand?.logo}
                  alt={brand?.name}
                  className={styles.logoImg}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
