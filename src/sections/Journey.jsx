import { motion } from 'framer-motion';
import { timelineEvents } from '../data/timeline';
import './Journey.css';

export default function Journey() {
  return (
    <section id="journey" className="section section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-title">My Timeline</h2>
          <p className="section-subtitle">
            Key milestones in my journey through technology, development, and creative growth.
          </p>
        </motion.div>

        <div className="timeline">
          <div className="timeline-line" />
          {timelineEvents.map((event, i) => (
            <motion.div
              key={i}
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="timeline-dot">
                <div className="timeline-dot-inner" />
              </div>
              <div className="timeline-content card-base">
                <span className="timeline-year">{event.year}</span>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-desc">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
