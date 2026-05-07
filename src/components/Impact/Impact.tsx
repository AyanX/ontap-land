import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { impactStats,} from '../../data';
import styles from './Impact.module.scss';

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, target, duration]);

  return count;
}

function StatCard({ stat, inView, delay }: { stat: typeof impactStats[0]; inView: boolean; delay: number }) {
  const numericTarget = parseFloat(stat.value);
  const isDecimal = stat.value.includes('.');
  const count = useCountUp(numericTarget, 2000, inView);

  const displayValue = isDecimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <div
      className={`${styles.statCard} ${inView ? styles.visible : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.statValue}>
        {displayValue}
        <span className={styles.statSuffix}>{stat?.suffix}</span>
      </div>
      <div className={styles.statLabel}>{stat?.label}</div>
      {stat?.sublabel && (
        <div className={styles.statSublabel}>{stat?.sublabel}</div>
      )}
    </div>
  );
}

export default function Impact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className={styles.section} aria-label="Our Impact" ref={ref}>
      <div className={styles.blobLeft} aria-hidden="true" />
      <div className={styles.blobRight} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.container}>
       

        <div className={styles.statsGrid}>
          {impactStats?.map((stat, i) => (
            <StatCard key={i} stat={stat} inView={inView} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
