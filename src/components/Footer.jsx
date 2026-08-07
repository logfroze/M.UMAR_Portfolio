import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">A</span>
            <div>
              <h4>ALAN HANMA UMAR</h4>
              <p>Full Stack Developer & Digital Creator</p>
            </div>
          </div>

          <div className="footer-links">
            {['home', 'about', 'skills', 'projects', 'journey', 'contact'].map(id => (
              <a key={id} href={`#${id}`} className="footer-link">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          <div className="footer-socials">
            <a href="https://github.com/logfrozeofficial" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" className="footer-social" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:logfrozeofficial@gmail.com" className="footer-social" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Alan Hanma Umar. All rights reserved.</p>
          <p className="footer-made">
            Made with <FaHeart className="footer-heart" /> and clean code.
          </p>
        </div>
      </div>
    </footer>
  );
}
