import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiBlackBelt, GiPunchBlast, GiMeditation, GiStrong } from 'react-icons/gi';
import {
  FaAward,
  FaSearchPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { martialArtsCertificates } from '../data/documents';
import './MartialArts.css';

const traits = [
  { icon: GiBlackBelt, label: 'Discipline', desc: 'Structured training builds habits that transfer to professional work.' },
  { icon: GiPunchBlast, label: 'Focus', desc: 'Sharp attention and quick decision-making under pressure.' },
  { icon: GiMeditation, label: 'Mental Toughness', desc: 'Resilience forged through consistent challenge and perseverance.' },
  { icon: GiStrong, label: 'Leadership', desc: 'Leading by example — on the training floor and in the workspace.' },
];

const INITIAL_CERTS_COUNT = 6;

export default function MartialArts() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAllCerts, setShowAllCerts] = useState(false);

  const displayedCerts = showAllCerts
    ? martialArtsCertificates
    : martialArtsCertificates.slice(0, INITIAL_CERTS_COUNT);

  const activeDoc = lightboxIndex !== null ? martialArtsCertificates[lightboxIndex] : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : martialArtsCertificates.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev < martialArtsCertificates.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="martial-arts" className="section martial-section">
      <div className="martial-bg-pattern" />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Beyond Technology</span>
          <h2 className="section-title">Discipline Beyond Code</h2>
          <p className="section-subtitle">
            3 years of Shotokan Karate training shaping focus, consistency, and resilience.
          </p>
        </motion.div>

        <div className="martial-content">
          <motion.div
            className="martial-story"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="martial-years">
              <span className="martial-years-number">3</span>
              <span className="martial-years-text">Years of<br />Training</span>
            </div>
            <div className="martial-info">
              <h3>Shotokan Karate</h3>
              <p>
                The discipline, consistency, and mental toughness developed through martial arts directly 
                shapes my approach to software development and creative work. Every kata, every sparring 
                session teaches patience, precision, and the value of continuous improvement.
              </p>
              <p>
                These qualities aren't just physical — they define how I tackle complex problems, 
                meet deadlines, and maintain quality in every project I deliver.
              </p>
            </div>
          </motion.div>

          <div className="martial-traits">
            {traits.map((t, i) => (
              <motion.div
                key={t.label}
                className="martial-trait card-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="martial-trait-icon">
                  <t.icon />
                </div>
                <h4>{t.label}</h4>
                <p>{t.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Martial Arts Certificates & Achievements Showcase ── */}
          <div className="martial-certs-wrapper">
            <motion.div
              className="martial-certs-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="martial-certs-title-row">
                <FaAward className="martial-certs-badge-icon" />
                <h3 className="martial-certs-title">Certificates &amp; Achievements</h3>
                <span className="martial-certs-count-badge">
                  {martialArtsCertificates.length} Verified Credentials
                </span>
              </div>
              <p className="martial-certs-subtitle">
                Official tournament championships, belt rank promotions, and martial arts development awards.
              </p>
            </motion.div>

            <div className="martial-certs-grid">
              {displayedCerts.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  className="martial-cert-card card-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.05, duration: 0.3 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="martial-cert-img-wrapper">
                    <img
                      src={encodeURI(doc.image)}
                      alt={doc.title}
                      loading="lazy"
                      className="martial-cert-img"
                    />
                    <div className="martial-cert-hover-overlay">
                      <FaSearchPlus className="martial-cert-hover-icon" />
                      <span>View Full Certificate</span>
                    </div>
                    <span className="martial-cert-badge">
                      {doc.categoryLabel}
                    </span>
                  </div>

                  <div className="martial-cert-info">
                    <h4 className="martial-cert-name">{doc.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All / View Less Toggle Button */}
            {martialArtsCertificates.length > INITIAL_CERTS_COUNT && (
              <div className="martial-toggle-wrapper">
                <button
                  onClick={() => setShowAllCerts((prev) => !prev)}
                  className="martial-toggle-btn"
                >
                  {showAllCerts ? (
                    <>
                      <span>View Less</span>
                      <FaChevronUp />
                    </>
                  ) : (
                    <>
                      <span>View All ({martialArtsCertificates.length} Certificates)</span>
                      <FaChevronDown />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Martial Arts Lightbox Modal ── */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            className="martial-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="martial-lightbox-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="martial-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                title="Close"
              >
                <FaTimes />
              </button>

              {martialArtsCertificates.length > 1 && (
                <>
                  <button
                    className="martial-lightbox-nav martial-lightbox-prev"
                    onClick={handlePrev}
                    aria-label="Previous Certificate"
                    title="Previous (←)"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="martial-lightbox-nav martial-lightbox-next"
                    onClick={handleNext}
                    aria-label="Next Certificate"
                    title="Next (→)"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              <div className="martial-lightbox-img-box">
                <img
                  src={encodeURI(activeDoc.image)}
                  alt={activeDoc.title}
                  className="martial-lightbox-img"
                />
              </div>

              <div className="martial-lightbox-footer">
                <div>
                  <span className="martial-lightbox-badge">{activeDoc.categoryLabel}</span>
                  <h3 className="martial-lightbox-title">{activeDoc.title}</h3>
                  <span className="martial-lightbox-counter">
                    {lightboxIndex + 1} of {martialArtsCertificates.length}
                  </span>
                </div>
                <a
                  href={encodeURI(activeDoc.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="martial-lightbox-open-btn"
                >
                  <span>Open High-Res</span>
                  <FaExternalLinkAlt />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
