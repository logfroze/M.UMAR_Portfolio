import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaFileDownload, FaEdit, FaTimes } from 'react-icons/fa';
import { usePortfolioData } from '../admin/context/AdminDataContext';
import ParticlesBackground from '../components/ParticlesBackground';
import './Hero.css';

const roles = ['Developer', 'Designer', 'Writer', 'Creator', 'Problem Solver'];

export default function Hero() {
  const { lastUpdatedDate, updateLastUpdatedDate, isAdmin } = usePortfolioData();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dateDraft, setDateDraft] = useState(lastUpdatedDate || 'September 18, 2026');

  useEffect(() => {
    setDateDraft(lastUpdatedDate || 'September 18, 2026');
  }, [lastUpdatedDate]);

  useEffect(() => {
    const currentWord = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-section">
      <ParticlesBackground />
      <div className="hero-gradient" />

      {/* Latest Portfolio Updation Date — Tilted on the right side of screen, squared & doubled */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="hero-update-wrapper"
      >
        <div
          className={`hero-update-badge ${isAdmin ? 'admin-editable' : ''}`}
          onClick={isAdmin ? () => setIsEditingDate((prev) => !prev) : undefined}
          title={isAdmin ? 'Admin Mode: Click to edit portfolio update date' : undefined}
        >
          <div className="hero-update-star-container">
            <img
              src="/Update_star.png"
              alt="Portfolio Update Star"
              className="hero-update-star-img"
            />
          </div>
          <div className="hero-update-content-block">
            <span className="hero-update-label">Latest Update</span>
            <span className="hero-update-date">{lastUpdatedDate}</span>
          </div>
          {isAdmin && (
            <span className="hero-update-edit-hint" title="Edit date">
              <FaEdit />
            </span>
          )}
        </div>

        {/* Admin Quick Date Edit Popover */}
        {isAdmin && isEditingDate && (
          <div className="hero-date-edit-popover" onClick={(e) => e.stopPropagation()}>
            <div className="hero-date-edit-header">
              <span>Edit Update Date</span>
              <button
                type="button"
                className="hero-date-edit-close"
                onClick={() => setIsEditingDate(false)}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
            <input
              type="text"
              value={dateDraft}
              onChange={(e) => setDateDraft(e.target.value)}
              placeholder="e.g. September 18, 2026"
              className="hero-date-edit-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (dateDraft.trim()) updateLastUpdatedDate(dateDraft.trim());
                  setIsEditingDate(false);
                } else if (e.key === 'Escape') {
                  setIsEditingDate(false);
                }
              }}
            />
            <div className="hero-date-edit-actions">
              <button
                type="button"
                className="hero-date-btn hero-date-btn--today"
                onClick={() => {
                  const today = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  setDateDraft(today);
                }}
              >
                Today
              </button>
              <button
                type="button"
                className="hero-date-btn hero-date-btn--month"
                style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#cbd5e1' }}
                onClick={() => {
                  const month = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  });
                  setDateDraft(month);
                }}
                title="Set to Current Month"
              >
                Month
              </button>
              <button
                type="button"
                className="hero-date-btn hero-date-btn--save"
                onClick={() => {
                  if (dateDraft.trim()) {
                    updateLastUpdatedDate(dateDraft.trim());
                  }
                  setIsEditingDate(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <div className="container profile-hero-content">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <img src="/logos/pwa-logo.png" alt="Alan" className="hero-logo" />
        </motion.div>

        <div className="hero-text-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
          >
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for Opportunities
            </div>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            MUHAMMAD UMAR<br />
            <span className="hero-name-accent">@ALAN</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="hero-role-prefix">I&apos;m a </span>
            <span className="hero-role-text">{text}</span>
            <span className="hero-cursor">|</span>
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            Building digital experiences through code, design, and storytelling.<br className="hide-mobile" />
            
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#projects" className="btn-primary-custom">
              View Projects <FaArrowRight />
            </a>
            <a href="#contact" className="btn-outline-custom">
              Contact Me <FaEnvelope />
            </a>
            <a href="/UMAR_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-custom" title="View/Download Resume">
              Resume <FaFileDownload />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="scroll-line" />
        </motion.div>
      </div>
    </section>
  );
}
