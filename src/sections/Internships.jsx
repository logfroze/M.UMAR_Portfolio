import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaGlobeAmericas,
  FaLaptopCode,
  FaCheckCircle,
  FaCode,
  FaLayerGroup,
  FaTerminal
} from 'react-icons/fa';
import {
  internshipMeta,
  internshipPrograms,
  internshipProjects
} from '../data/internships';
import './Internships.css';

/* Color map for tech badges matching the portfolio theme */
const techColors = {
  'HTML': '#e34c26',
  'CSS': '#264de4',
  'JavaScript': '#f7df1e',
  'Python': '#3776ab',
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Tailwind CSS': '#38bdf8',
  'Automation': '#10b981',
  'NLP': '#a855f7',
  'Web Audio': '#ec4899',
  'Responsive Design': '#58a6ff',
};

export default function Internships() {
  const [activeProgram, setActiveProgram] = useState('All');

  const filteredProjects = activeProgram === 'All'
    ? internshipProjects
    : internshipProjects.filter(p => p.program === activeProgram);

  return (
    <section id="internships" className="section section-internships">
      <div className="container internships-container">
        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Internships</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Industry-driven internship focused on hands-on software development, featuring 8 delivered projects across dual engineering tracks.
          </p>
        </motion.div>

        {/* ── Featured Internship Showcase Card ─────────────── */}
        <motion.div
          className="internship-banner card-base"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="internship-banner-glow"></div>
          <div className="internship-banner-header">
            <div className="internship-company-badge">
              <span className="company-logo-pill">CodeAlpha</span>
              <span className="internship-status-tag">
                <span className="status-indicator-dot"></span>
                Verified Internship
              </span>
            </div>
            <div className="internship-period-badge">
              <FaCalendarAlt className="badge-icon" />
              <span>10th September – 10th October</span>
            </div>
          </div>

          <div className="internship-banner-content">
            <h3 className="internship-banner-title">
              1st One Month Internship <span className="internship-highlight">@ CodeAlpha</span>
            </h3>
            <p className="internship-banner-desc">
              {internshipMeta.description}
            </p>

            <div className="internship-meta-grid">
              <div className="internship-meta-item">
                <div className="meta-icon-box">
                  <FaCalendarAlt />
                </div>
                <div className="meta-info">
                  <span className="meta-label">Duration</span>
                  <span className="meta-val">1 Month (10 Sep – 10 Oct)</span>
                </div>
              </div>

              <div className="internship-meta-item">
                <div className="meta-icon-box meta-icon-globe">
                  <FaGlobeAmericas />
                </div>
                <div className="meta-info">
                  <span className="meta-label">Category / Type</span>
                  <span className="meta-val">Online / Remote</span>
                </div>
              </div>

              <div className="internship-meta-item">
                <div className="meta-icon-box meta-icon-tracks">
                  <FaLayerGroup />
                </div>
                <div className="meta-info">
                  <span className="meta-label">Specialized Tracks</span>
                  <span className="meta-val">FrontEnd & Python</span>
                </div>
              </div>

              <div className="internship-meta-item">
                <div className="meta-icon-box meta-icon-projects">
                  <FaCheckCircle />
                </div>
                <div className="meta-info">
                  <span className="meta-label">Delivered Projects</span>
                  <span className="meta-val">8 Production Projects</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Program Filter Switcher ────────────────────────── */}
        <div className="internship-program-tabs">
          {internshipPrograms.map(prog => {
            const isActive = activeProgram === prog.id;
            return (
              <button
                key={prog.id}
                className={`internship-program-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveProgram(prog.id)}
              >
                {prog.id === 'FrontEnd Development' ? (
                  <FaLaptopCode className="program-btn-icon" />
                ) : prog.id === 'Python Programming' ? (
                  <FaTerminal className="program-btn-icon" />
                ) : (
                  <FaCode className="program-btn-icon" />
                )}
                <span>{prog.label}</span>
                <span className="internship-program-count">{prog.count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Projects Grid ─────────────────────────────────── */}
        <motion.div className="internship-projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card card-base internship-project-card"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Project Image & Live Hover Overlay */}
                <div className="project-card-image">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="project-image-real"
                    loading="lazy"
                  />
                  <div className="project-card-overlay">
                    <a
                      href={project.github}
                      className="project-overlay-btn"
                      title="GitHub Repository"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.live}
                      className="project-overlay-btn"
                      title="Live Demonstration"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>

                {/* Project Body */}
                <div className="project-card-body">
                  <div className="internship-card-badges">
                    <span className={`internship-track-badge ${project.program === 'FrontEnd Development' ? 'track-frontend' : 'track-python'}`}>
                      {project.program === 'FrontEnd Development' ? 'FrontEnd Track' : 'Python Track'}
                    </span>
                    <span className="codealpha-tag">CodeAlpha</span>
                  </div>

                  <h3 className="project-card-title">{project.name}</h3>
                  <p className="project-card-desc">{project.description}</p>

                  {/* Tech stack badges */}
                  <div className="project-card-tech">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="tech-badge"
                        style={{
                          borderColor: techColors[t] || 'var(--border)',
                          color: techColors[t] || 'var(--secondary)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links footer */}
                  <div className="project-card-links">
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> Code
                    </a>
                    <a
                      href={project.live}
                      className="project-link project-link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
