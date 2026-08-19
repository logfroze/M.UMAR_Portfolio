import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaPen, FaDumbbell } from 'react-icons/fa';
import './About.css';

const highlights = [
  { icon: FaCode, label: 'Web & App Developer' },
  { icon: FaPalette, label: 'Graphic Designer' },
  { icon: FaPen, label: 'Content Writer' },
  { icon: FaDumbbell, label: '3 Years Martial Arts' },
];

export default function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">
            A multidisciplinary creator bridging technology, design, and communication.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-photo-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-photo">
              <div className="about-photo-placeholder">
                <img src="/about/My image.png" alt="Alan Hanma Umar" />
              </div>
              <div className="about-photo-border" />
            </div>

            <div className="about-highlights">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="about-highlight-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <h.icon />
                  <span>{h.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className="about-intro"><span className="text-primary">Full Stack</span> - Developer
            </h3>

            <p className="about-text">
              I'm Muhammad Umar.
            </p>
            
            <p className="about-text">
              A Full Stack Developer, Digital Creator, Designer, and Writer 
              passionate about building meaningful digital experiences. Currently in my final semester 
              of BSCS, I've spent the past years honing my skills across web development, app development, 
              graphic design, video editing, and content creation.
            </p>

            <p className="about-text">
              With 3 years of martial arts training in Shotokan Karate, I bring the same discipline, 
              focus, and consistency to every project I undertake. I believe in continuous learning, 
              clean code, and designs that speak louder than words.
            </p>

            <p className="about-text">
              My approach combines technical precision with creative thinking whether I'm building 
              a full-stack application, designing a brand identity, or crafting compelling content. 
              I don't just build software; I create complete digital experiences.
            </p>

            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-number">15+</span>
                <span className="about-stat-label">Projects</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">3+</span>
                <span className="about-stat-label">Years Coding</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">10+</span>
                <span className="about-stat-label">Clients</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">5+</span>
                <span className="about-stat-label">Skills</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
