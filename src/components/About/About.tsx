import target from '../../assets/target.png';
import eye from '../../assets/eye.png';
import diamond from '../../assets/diamond.png';
import groups from '../../assets/groups.png';

import { useInView } from 'react-intersection-observer';
import { aboutData } from '../../data';
import styles from './About.module.scss';

const iconMap: Record<string, React.ReactNode> = {
  target: <img src={target} alt="target" width={28} height={28} />,
  eye: <img src={eye} alt="eye" width={28} height={28} />,
  gem: <img src={diamond} alt="diamond" width={28} height={28} />,
  users: <img src={groups} alt="users" width={28} height={28} />,
};

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className={styles.section} aria-label="About OnTap" id="about" ref={ref}>
      <div className={styles.blobAbout} aria-hidden="true" />
      <div className={styles.blobContainer}>
        <div className={styles.blobAboutRight} aria-hidden="true" />
      </div>
      <div className={styles.container} style={{background: aboutData.backgroundImage ? `url(${aboutData.backgroundImage})` : 'none'}}>
        <div className={`${styles.header} anim-fade-up ${inView ? "is-visible" : ""}`}>
          <h2 className={styles.heading}>
            {aboutData?.heading?.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className={styles.description}>{aboutData?.description}</p>
        </div>

        <div className={styles.grid}>
          {aboutData?.cards?.map((card, i) => (
            <div
              key={card?.title}
              className={`${styles.card} ${inView ? styles.visible : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                {iconMap[card?.icon] ?? <img src={target} alt="target" width={28} height={28} />}
              </div>
              <div className={styles.cardContents}>
              <h3 className={styles.cardTitle}>{card?.title}</h3>
              <p className={styles.cardBody}>{card?.body}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
