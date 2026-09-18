import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaPen, FaDumbbell } from 'react-icons/fa';
import { usePortfolioData } from '../admin/context/AdminDataContext';
import { getIconComponent } from '../admin/components/IconResolver';
import './About.css';

const staticHighlights = [
  { icon: FaCode, label: 'Web & App Developer' },
  { icon: FaPalette, label: 'Graphic Designer' },
  { icon: FaPen, label: 'Content Writer' },
  { icon: FaDumbbell, label: '3 Years Martial Arts' },
];

const staticStats = [
  { number: '15+', label: 'Projects' },
  { number: '3+', label: 'Years Coding' },
  { number: '10+', label: 'Clients' },
  { number: '5+', label: 'Skills' },
];

const staticParagraphs = [
  "I'm Muhammad Umar.",
  "A Full Stack Developer, Digital Creator, Designer, and Writer passionate about building meaningful digital experiences. Currently in my final semester of BSCS, I've spent the past years honing my skills across web development, app development, graphic design, video editing, and content creation.",
  "With 3 years of martial arts training in Shotokan Karate, I bring the same discipline, focus, and consistency to every project I undertake. I believe in continuous learning, clean code, and designs that speak louder than words.",
  "My approach combines technical precision with creative thinking whether I'm building a full-stack application, designing a brand identity, or crafting compelling content. I don't just build software; I create complete digital experiences.",
];

export default function About() {
  const { heroAbout } = usePortfolioData();

  const stats = (heroAbout?.stats && heroAbout.stats.length > 0) ? heroAbout.stats : staticStats;
  const paragraphs = (heroAbout?.introParagraphs && heroAbout.introParagraphs.length > 0)
    ? heroAbout.introParagraphs
    : staticParagraphs;
  const title = heroAbout?.title || 'Full Stack - Developer';

  // Resolve highlights — context stores string icon names, static data has components
  const highlights = (heroAbout?.highlights && heroAbout.highlights.length > 0)
    ? heroAbout.highlights.map(h => ({ ...h, icon: getIconComponent(h.icon) }))
    : staticHighlights;

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
            <h3 className="about-intro">
              {title.includes('-') ? (
                <><span className="text-primary">{title.split('-')[0].trim()}</span>{' - '}{title.split('-').slice(1).join('-').trim()}</>
              ) : title}
            </h3>

            {paragraphs.map((para, i) => (
              <p key={i} className="about-text">{para}</p>
            ))}

            <div className="about-stats">
              {stats.map((stat, i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat-number">{stat.number}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
