import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '../../assets/ontap-logo-green.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="OnTap Home">
          <img src={logo} alt="OnTap Logo" className={styles.logoImage} />
        </Link>

        <div className={styles.actions}>
         
            <a href="#contact" className={`${styles.ctaButton} ${styles.demoBtn}`}>
              Book a Free Demo
            </a>
        
          <a href="https://hrms.ontapke.com/create-account/" className={`${styles.ctaButton} ${styles.signupBtn}`}>
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
