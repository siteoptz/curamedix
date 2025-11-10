import Head from 'next/head';
import { useState } from 'react';
import { useHubspotForm } from 'next-hubspot';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // HubSpot form integration
  const { isFormCreated, isError, error } = useHubspotForm({
    portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    formId: process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID,
    target: '#hubspot-form-wrapper',
  });

  const openBookingModal = () => {
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CuraMedix - Revolutionary Shockwave Therapy Solutions</title>
        <meta name="description" content="Industry-leading extracorporeal shockwave therapy solutions delivering unprecedented patient outcomes and ROI for healthcare providers." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Header Navigation */}
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <div className={styles.navWrapper}>
              <div className={styles.logo}>
                <img src="/logo.jpg" alt="CuraMedix" className={styles.logoImg} />
              </div>
              <ul className={styles.navMenu}>
                <li><a href="#solutions">Solutions</a></li>
                <li><a href="#technology">Technology</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
              <button className={`${styles.ctaButton} ${styles.navCta}`} onClick={openBookingModal}>
                Book Consultation
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Transform Healthcare with <span className={styles.highlight}>Shockwave Therapy</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Industry-leading extracorporeal shockwave therapy solutions delivering unprecedented patient outcomes and ROI for healthcare providers.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>95%</span>
                  <span className={styles.statLabel}>Success Rate</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>500K+</span>
                  <span className={styles.statLabel}>Treatments Delivered</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>3,000+</span>
                  <span className={styles.statLabel}>Healthcare Partners</span>
                </div>
              </div>
              <div className={styles.heroCta}>
                <button className={`${styles.ctaButton} ${styles.primaryCta}`} onClick={openBookingModal}>
                  Schedule Demo
                </button>
                <button className={`${styles.ctaButton} ${styles.secondaryCta}`}>
                  Download Brochure
                </button>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img src="/image2.png" alt="Shockwave Therapy Device" className={styles.featuredImage} />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your sections would go here... */}
      {/* For brevity, I'm showing the structure with the key HubSpot integration points */}

      {/* Booking Modal with HubSpot Form */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeBookingModal}>&times;</span>
            <h2>Book Your Consultation</h2>
            <p>Take the first step towards revolutionary patient care</p>
            
            {/* HubSpot Form Integration */}
            <div id="hubspot-form-wrapper" className={styles.hubspotForm} />
            
            {isError && (
              <div className={styles.errorMessage}>
                Error loading form. Please try again or contact us directly.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

