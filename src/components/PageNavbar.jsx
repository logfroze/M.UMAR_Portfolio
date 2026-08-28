import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import './PageNavbar.css';

export default function PageNavbar({ brand, initial, navItems, colorAccent, logo }) {
  const [active, setActive] = useState(navItems[0]?.id || '');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navItems]);

  const handleClick = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`page-navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <div className="page-nav-left">
          <Link to="/" className="page-nav-home" title="Back to LOGHOUSE">
            <FaHome />
          </Link>
          <div className="page-nav-divider-v" />
          <a href={`#${navItems[0]?.id}`} className="nav-brand" onClick={() => handleClick(navItems[0]?.id || '')}>
            {logo ? (
              <img src={logo} alt={brand} className="brand-icon-logo" />
            ) : (
              <span className="brand-icon">{initial}</span>
            )}
            <span className="brand-text">{brand}<span className="brand-dot">.</span></span>
          </a>
        </div>

        <div className="nav-links-desktop">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${active === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
              {active === item.id && (
                <motion.div className="nav-indicator" layoutId="page-nav-indicator" />
              )}
            </button>
          ))}
        </div>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
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
            <Link to="/" className="nav-mobile-link nav-mobile-home" onClick={() => setMenuOpen(false)}>
              <FaHome style={{ marginRight: 8 }} /> Back to LOGHOUSE
            </Link>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-mobile-link ${active === item.id ? 'active' : ''}`}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
