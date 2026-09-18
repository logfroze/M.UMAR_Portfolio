import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { usePortfolioData } from '../admin/context/AdminDataContext';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'internships', label: 'Internships' },
  { id: 'resume', label: 'Resume' },
  { id: 'documents', label: 'Documents' },
  { id: 'creative', label: 'Creative Work' },
  { id: 'writing', label: 'Writing' },
  { id: 'martial-arts', label: 'Martial Arts' },
  { id: 'journey', label: 'Journey' },
  { id: 'github', label: 'GitHub' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const renderCodeNavLabel = (label, isActive) => {
  if (isActive) {
    return (
      <span className="code-nav-token code-nav-active">
        <span className="code-bracket">&lt;</span>
        <span className="code-name">{label}</span>
        <span className="code-semi">;</span>
        <span className="code-bracket">&gt;</span>
      </span>
    );
  }
  return (
    <span className="code-nav-token">
      <span className="code-name">{label}</span>
      <span className="code-semi">;</span>
    </span>
  );
};

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, openAuthModal } = usePortfolioData();

  // ---- 5-click secret trigger on brand logo ----
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleBrandClick = (e) => {
    e.preventDefault();
    handleClick('home');
    if (isAdmin) return; // Already logged in, no need to trigger

    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 3000);

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      clearTimeout(clickTimerRef.current);
      openAuthModal();
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const adminBarHeight = document.body.classList.contains('admin-mode-active') ? 44 : 0;
      const scrollPos = window.scrollY + 120 + adminBarHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // When admin bar is visible (44px) the navbar sits lower, so increase the offset
      const adminBarHeight = document.body.classList.contains('admin-mode-active') ? 44 : 0;
      const navOffset = 70 + adminBarHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand-group">

          <a href="#home" className="nav-brand" onClick={handleBrandClick}>
            <img src="/logos/pwa-logo.png" alt="Alan Logo" className="brand-logo-img" />
            <span className="brand-text">Alan<span className="brand-dot">.</span></span>
          </a>
        </div>

        <div className="nav-right">
          <div className="nav-links-desktop">
            {navItems.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleClick(item.id)}
                >
                  {renderCodeNavLabel(item.label, isActive)}
                </button>
              );
            })}
          </div>
          <ThemeToggle />
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >

            {navItems.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-mobile-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleClick(item.id)}
                >
                  {renderCodeNavLabel(item.label, isActive)}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
