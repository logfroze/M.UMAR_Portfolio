import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaSearchPlus,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaFileAlt
} from 'react-icons/fa';
import { documentCategories, documentsData } from '../data/documents';
import './Documents.css';

export default function Documents() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const INITIAL_ALL_COUNT = 6;

  // Filter items based on active category
  const filteredDocuments = selectedCategory === 'all'
    ? documentsData
    : documentsData.filter((d) => d.category === selectedCategory);

  // When 'all' is selected, respect showAll toggle; otherwise show all in that category
  const displayedDocuments = (selectedCategory === 'all' && !showAll)
    ? filteredDocuments.slice(0, INITIAL_ALL_COUNT)
    : filteredDocuments;

  const activeDoc = lightboxIndex !== null ? displayedDocuments[lightboxIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : displayedDocuments.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < displayedDocuments.length - 1 ? prev + 1 : 0));
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
  }, [lightboxIndex, displayedDocuments.length]);

  return (
    <section id="documents" className="section documents-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-title">My Documents</h2>
          <p className="section-subtitle">
            Authentic certificates, academic records, credentials, martial arts achievements, and identity cards.
          </p>
        </motion.div>

        {/* Category Tabs in the required order */}
        <div className="documents-tabs">
          {documentCategories.map((cat) => {
            const Icon = cat.icon || FaFileAlt;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`documents-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowAll(false);
                  setLightboxIndex(null);
                }}
              >
                {cat.icon && <Icon className="documents-tab-icon" style={{ color: isActive ? '#fff' : cat.color }} />}
                <span>{cat.label}</span>
                <span className="documents-tab-count">{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Documents Grid */}
        <motion.div
          layout
          className="documents-grid"
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {displayedDocuments.map((doc, index) => (
            <motion.div
              layout
              key={doc.id}
              className="document-card card-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setLightboxIndex(index)}
            >
              {/* Image Frame */}
              <div className="document-card-img-wrapper">
                <img
                  src={encodeURI(doc.image)}
                  alt={doc.title}
                  loading="lazy"
                  className="document-card-img"
                />
                <div className="document-card-hover-overlay">
                  <div className="document-card-hover-icon">
                    <FaSearchPlus />
                  </div>
                  <span className="document-card-hover-text">Click to view full</span>
                </div>
                <span
                  className="document-card-badge"
                  style={{
                    backgroundColor: `${doc.color}22`,
                    color: doc.color,
                    borderColor: `${doc.color}55`
                  }}
                >
                  {doc.categoryLabel}
                </span>
              </div>

              {/* Title & Info */}
              <div className="document-card-info">
                <h4 className="document-card-title">{doc.title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All / View Less Toggle — ONLY for "All Documents" tab */}
        {selectedCategory === 'all' && filteredDocuments.length > INITIAL_ALL_COUNT && (
          <div className="documents-toggle-wrapper">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="documents-toggle-btn"
            >
              {showAll ? (
                <>
                  <span>View Less</span>
                  <FaChevronUp />
                </>
              ) : (
                <>
                  <span>View All ({filteredDocuments.length} Documents)</span>
                  <FaChevronDown />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            className="documents-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="documents-lightbox-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="documents-lightbox-btn documents-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                title="Close"
              >
                <FaTimes />
              </button>

              {/* Navigation Left Button */}
              {displayedDocuments.length > 1 && (
                <button
                  className="documents-lightbox-nav documents-lightbox-prev"
                  onClick={handlePrev}
                  aria-label="Previous Document"
                  title="Previous Document"
                >
                  <FaChevronLeft />
                </button>
              )}

              {/* Navigation Right Button */}
              {displayedDocuments.length > 1 && (
                <button
                  className="documents-lightbox-nav documents-lightbox-next"
                  onClick={handleNext}
                  aria-label="Next Document"
                  title="Next Document"
                >
                  <FaChevronRight />
                </button>
              )}

              {/* Lightbox Image Preview */}
              <div className="documents-lightbox-img-box">
                <img
                  src={encodeURI(activeDoc.image)}
                  alt={activeDoc.title}
                  className="documents-lightbox-img"
                />
              </div>

              {/* Lightbox Footer Bar */}
              <div className="documents-lightbox-footer">
                <div className="documents-lightbox-info-left">
                  <span
                    className="documents-lightbox-cat"
                    style={{ color: activeDoc.color }}
                  >
                    {activeDoc.categoryLabel}
                  </span>
                  <h3 className="documents-lightbox-title">{activeDoc.title}</h3>
                  <span className="documents-lightbox-counter">
                    {lightboxIndex + 1} of {displayedDocuments.length}
                  </span>
                </div>
                <div className="documents-lightbox-actions">
                  <a
                    href={encodeURI(activeDoc.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="documents-lightbox-open-btn"
                  >
                    <span>Open High-Res</span>
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
