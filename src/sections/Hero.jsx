import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import './Hero.css';

const roles = ['Developer', 'Designer', 'Writer', 'Creator', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

      <div className="container profile-hero-content">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <img src="/logos/My image Passport size white background.png" alt="Alan" className="hero-logo" />
        </motion.div>

        <div className="hero-text-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
