import { motion } from 'framer-motion';
import { GiBlackBelt, GiPunchBlast, GiMeditation, GiStrong } from 'react-icons/gi';
import './MartialArts.css';

const traits = [
  { icon: GiBlackBelt, label: 'Discipline', desc: 'Structured training builds habits that transfer to professional work.' },
  { icon: GiPunchBlast, label: 'Focus', desc: 'Sharp attention and quick decision-making under pressure.' },
  { icon: GiMeditation, label: 'Mental Toughness', desc: 'Resilience forged through consistent challenge and perseverance.' },
  { icon: GiStrong, label: 'Leadership', desc: 'Leading by example — on the training floor and in the workspace.' },
];

export default function MartialArts() {
  return (
    <section className="section martial-section">
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
            3 years of Shotokan Karate training — shaping focus, consistency, and resilience.
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
        </div>
      </div>
    </section>
  );
}
