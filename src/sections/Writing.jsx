import { motion } from 'framer-motion';
import { FaArrowRight, FaBookOpen, FaNewspaper, FaLaptopCode, FaFeatherAlt } from 'react-icons/fa';
import { writings } from '../data/writings';
import './Writing.css';

const icons = {
  'Stories': FaBookOpen,
  'Articles': FaNewspaper,
  'Technical Blogs': FaLaptopCode,
  'Creative Writing': FaFeatherAlt,
};

const colors = {
  'Stories': '#d2a8ff',
  'Articles': '#58a6ff',
  'Technical Blogs': '#3fb950',
  'Creative Writing': '#f78166',
};

export default function Writing() {
  return (
    <section className="section section-alt">
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
            Exploring ideas through stories, articles, technical blogs, and creative prose.
          </p>
        </motion.div>

        <div className="writing-grid">
          {writings.map((w, i) => {
            const Icon = icons[w.category] || FaBookOpen;
            const color = colors[w.category] || 'var(--primary)';
            return (
              <motion.div
                key={w.id}
                className="writing-card card-base"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="writing-card-icon" style={{ background: `${color}12`, color }}>
                  <Icon />
                </div>
                <span className="writing-card-category" style={{ color }}>{w.category}</span>
                <h3 className="writing-card-title">{w.title}</h3>
                <p className="writing-card-summary">{w.summary}</p>
                <a href={w.link} className="writing-card-link" style={{ color }}>
                  Read More <FaArrowRight />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
