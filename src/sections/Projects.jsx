import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { projects, projectCategories } from '../data/projects';
import './Projects.css';

/* Color map for tech badges */
const techColors = {
  'React': '#61dafb',
  'Node.js': '#68a063',
  'MongoDB': '#4db33d',
  'Bootstrap': '#7952b3',
  'Firebase': '#ffca28',
  'HTML': '#e34c26',
  'CSS': '#264de4',
  'JavaScript': '#f7df1e',
  'TypeScript': '#3178c6',
  'Framer Motion': '#e055a3',
  'REST APIs': '#58a6ff',
  'Vite': '#646cff',
  'Responsive Design': '#58a6ff',
  'Figma': '#a259ff',
  'Laravel': '#ff2d20',
};

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const featuredProject = projects.find(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  const filtered = filter === 'All' ? regularProjects : regularProjects.filter(p => p.category === filter);
  const showFeatured = featuredProject && (filter === 'All' || featuredProject.category === filter);

  const renderProjectCard = (project, i, isFeatured = false) => {
    const isLive = project.status === 'live';
    const isComingSoon = project.status === 'coming-soon';

    return (
      <motion.div
        key={project.id}
        className={`project-card card-base ${isComingSoon ? 'project-card--coming-soon' : ''} ${isFeatured ? 'project-card--featured' : ''}`}
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: i * 0.04 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
      >
        <div className="project-card-image">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="project-image-real"
              loading="lazy"
            />
          ) : (
            <div className="project-image-placeholder" data-type={project.name.charAt(0).toLowerCase()}>
              <span>{project.name.charAt(0)}</span>
            </div>
          )}

          {/* Coming Soon Badge Overlay */}
          {isComingSoon && (
            <div className={`project-coming-soon-overlay ${project.image ? 'has-image' : ''}`}>
              <div className="project-coming-soon-badge">
                <FaClock />
                <span>Coming Live Soon</span>
              </div>
            </div>
          )}

          {/* Hover overlay with action buttons - only for live projects */}
          {isLive && (
            <div className="project-card-overlay">
              <a href={project.github} className="project-overlay-btn" title="GitHub" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={project.live} className="project-overlay-btn" title="Live Demo" target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt />
              </a>
            </div>
          )}
        </div>
        <div className="project-card-body">
          {project.tag && (
            <div className="project-special-tag">{project.tag}</div>
          )}
          <div className="project-category-tag">{project.category}</div>
          <h3 className="project-card-title">{project.name}</h3>
          <p className="project-card-desc">{project.description}</p>
          <div className="project-card-tech">
            {project.tech.map(t => (
              <span
                key={t}
                className="tech-badge"
                style={{ borderColor: techColors[t] || 'var(--border)', color: techColors[t] || 'var(--secondary)' }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="project-card-links">
            {isLive ? (
              <>
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Code
                </a>
                <a href={project.live} className="project-link project-link-primary" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </>
            ) : (
              <span className="project-link project-link-coming-soon">
                <FaClock /> Coming Live Soon
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="section section-alt">
      <div className="container projects-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle">
            A collection of real-world projects spanning web development, business solutions, and creative portfolios.
          </p>
        </motion.div>

        <div className="project-filters">
          {projectCategories.map(cat => (
            <button
              key={cat}
              className={`project-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {showFeatured && (
          <div className="featured-project-wrapper">
            <AnimatePresence mode="popLayout">
              {renderProjectCard(featuredProject, 0, true)}
            </AnimatePresence>
          </div>
        )}

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => renderProjectCard(project, i))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
