import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaBook,
  FaBookOpen,
  FaNewspaper,
  FaLaptopCode,
  FaFeatherAlt,
  FaTimes,
  FaLock,
  FaShieldAlt,
  FaEye,
  FaUtensils,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus
} from 'react-icons/fa';
import { writings } from '../data/writings';
import './Writing.css';

const icons = {
  'Book': FaBook,
  'Story': FaBookOpen,
  'Stories': FaBookOpen,
  'Column': FaUtensils,
  'Food Column': FaUtensils,
  'Articles': FaNewspaper,
  'Technical Blogs': FaLaptopCode,
  'Creative Writing': FaFeatherAlt,
};

const colors = {
  'Book': '#a855f7',
  'Story': '#e05252',
  'Stories': '#e05252',
  'Column': '#f59e0b',
  'Food Column': '#f59e0b',
  'Articles': '#58a6ff',
  'Technical Blogs': '#3fb950',
  'Creative Writing': '#f78166',
};

export default function Writing() {
  const [activeReading, setActiveReading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100); // in percent
  const scrollContainerRef = useRef(null);

  // Prevent background scrolling and intercept copy/print/save/select shortcuts while reader is open
  useEffect(() => {
    if (!activeReading) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveReading(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentPage((p) => Math.min(activeReading.pages.length, p + 1));
      }
      // Block Ctrl+A (Select All), Ctrl+C (Copy), Ctrl+S (Save), Ctrl+P (Print), Ctrl+U (View Source)
      if (
        (e.ctrlKey || e.metaKey) &&
        ['a', 'c', 's', 'p', 'u', 'x'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const preventDefaultEvent = (e) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', preventDefaultEvent);
    window.addEventListener('cut', preventDefaultEvent);
    window.addEventListener('contextmenu', preventDefaultEvent);
    window.addEventListener('dragstart', preventDefaultEvent);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', preventDefaultEvent);
      window.removeEventListener('cut', preventDefaultEvent);
      window.removeEventListener('contextmenu', preventDefaultEvent);
      window.removeEventListener('dragstart', preventDefaultEvent);
    };
  }, [activeReading]);

  // Scroll to top when flipping pages
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const openReader = (item) => {
    if (item.isReadable && item.pages && item.pages.length > 0) {
      setActiveReading(item);
      setCurrentPage(1);
      setZoomLevel(100);
    }
  };

  return (
    <section id="writing" className="section section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Writing</span>
          <h2 className="section-title">Words That Matter</h2>
          <p className="section-subtitle">
            Exploring ideas through personal books, stories, articles, technical blogs, and creative prose.
          </p>
        </motion.div>

        <div className="writing-grid">
          {writings.map((w, i) => {
            const Icon = icons[w.category] || FaBookOpen;
            const color = colors[w.category] || 'var(--primary)';
            const isReadable = w.isReadable && w.pages && w.pages.length > 0;

            return (
              <motion.div
                key={w.id}
                className={`writing-card card-base ${w.category === 'Book' ? 'writing-card--book' : ''} ${isReadable ? 'writing-card--clickable' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => isReadable && openReader(w)}
              >
                {/* Header with Icon and Status badge */}
                <div className="writing-card-top">
                  <div
                    className="writing-card-icon"
                    style={{ background: `${color}18`, color }}
                  >
                    <Icon />
                  </div>
                  {w.status && (
                    <span
                      className="writing-card-status"
                      style={{
                        color,
                        background: `${color}15`,
                        borderColor: `${color}35`
                      }}
                    >
                      {w.status}
                    </span>
                  )}
                </div>

                <span className="writing-card-category" style={{ color }}>
                  {w.category}
                </span>

                <h3 className="writing-card-title">{w.title}</h3>

                {w.subtitle && (
                  <p className="writing-card-subtitle" style={{ borderColor: color }}>
                    "{w.subtitle}"
                  </p>
                )}

                <p className="writing-card-summary">{w.summary}</p>

                <div className="writing-card-action">
                  {isReadable ? (
                    <button
                      type="button"
                      className="writing-card-btn"
                      style={{ color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openReader(w);
                      }}
                    >
                      <FaEye className="writing-link-icon" />
                      <span>{w.linkText || 'Read in Viewer'}</span>
                      {w.pageCount && (
                        <span className="writing-page-badge">
                          {w.pageCount} {w.pageCount === 1 ? 'Page' : 'Pages'}
                        </span>
                      )}
                      <FaArrowRight className="writing-link-arrow" />
                    </button>
                  ) : (
                    <span className="writing-card-link writing-card-link--muted">
                      <span>{w.linkText || 'Coming Soon'}</span>
                      <FaArrowRight className="writing-link-arrow" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── 100% Protected In-Portfolio Reader Modal (Zero Text Layer) ── */}
      <AnimatePresence>
        {activeReading && (
          <motion.div
            className="writing-reader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReading(null)}
          >
            <motion.div
              className="writing-reader-container unselectable"
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              {/* Reader Header */}
              <div className="writing-reader-header">
                <div className="writing-reader-info">
                  <div className="writing-reader-badge-row">
                    <span
                      className="writing-reader-category"
                      style={{ color: colors[activeReading.category] || 'var(--primary)' }}
                    >
                      {activeReading.category}
                    </span>
                    <span className="writing-reader-protected-badge">
                      <FaLock /> Protected Viewer · Copy Disabled
                    </span>
                  </div>
                  <h3 className="writing-reader-title">{activeReading.title}</h3>
                  {activeReading.subtitle && (
                    <p className="writing-reader-subtitle">"{activeReading.subtitle}"</p>
                  )}
                </div>

                {/* Reader Controls */}
                <div className="writing-reader-header-actions">
                  {/* Zoom controls */}
                  <div className="writing-reader-zoom-group">
                    <button
                      className="writing-reader-btn"
                      onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                      title="Zoom Out"
                      aria-label="Zoom Out"
                    >
                      <FaSearchMinus />
                    </button>
                    <span className="writing-reader-zoom-label">{zoomLevel}%</span>
                    <button
                      className="writing-reader-btn"
                      onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                      title="Zoom In"
                      aria-label="Zoom In"
                    >
                      <FaSearchPlus />
                    </button>
                  </div>

                  {/* Close button */}
                  <button
                    className="writing-reader-close-btn"
                    onClick={() => setActiveReading(null)}
                    aria-label="Close Reader"
                    title="Close (Esc)"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Protected Notice Banner */}
              <div className="writing-reader-banner">
                <FaShieldAlt className="writing-reader-banner-icon" />
                <span>
                  <strong>Protected Preview:</strong> Content rendered with strict ownership protection. Text selection, copy-pasting, and raw downloads are completely blocked.
                </span>
              </div>

              {/* Reader Canvas/Page Area */}
              <div
                className="writing-reader-viewport"
                ref={scrollContainerRef}
              >
                {/* Visual Page View */}
                <div
                  className="writing-reader-page-wrapper"
                  style={{ width: `${zoomLevel}%` }}
                >
                  <div className="writing-reader-page-card">
                    {/* Watermark Pattern Overlay */}
                    <div className="writing-reader-watermark-layer" aria-hidden="true">
                      <span>© M. UMAR (ALAN) · ALL RIGHTS RESERVED</span>
                    </div>

                    {/* Page Image (Zero Text Layer — Cannot be selected or copied) */}
                    <img
                      src={activeReading.pages[currentPage - 1]}
                      alt={`${activeReading.title} - Page ${currentPage}`}
                      className="writing-reader-page-img"
                      draggable={false}
                      loading="eager"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              </div>

              {/* Reader Footer Navigation Bar */}
              <div className="writing-reader-footer">
                <div className="writing-reader-footer-left">
                  <span className="writing-reader-footer-copy">
                    © M. Umar (Alan) · All Rights Reserved
                  </span>
                </div>

                {/* Page Navigation Controls */}
                <div className="writing-reader-pagination">
                  <button
                    className="writing-reader-nav-btn"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    title="Previous Page (←)"
                    aria-label="Previous Page"
                  >
                    <FaChevronLeft />
                    <span>Prev</span>
                  </button>

                  <span className="writing-reader-page-counter">
                    Page <strong>{currentPage}</strong> of <strong>{activeReading.pages.length}</strong>
                  </span>

                  <button
                    className="writing-reader-nav-btn"
                    disabled={currentPage >= activeReading.pages.length}
                    onClick={() => setCurrentPage((p) => Math.min(activeReading.pages.length, p + 1))}
                    title="Next Page (→)"
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <FaChevronRight />
                  </button>
                </div>

                <div className="writing-reader-footer-right">
                  <span className="writing-reader-footer-hint">
                    Use <kbd>←</kbd> <kbd>→</kbd> or <kbd>Esc</kbd>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
