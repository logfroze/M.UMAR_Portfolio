import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PageFooter.css';

export default function PageFooter({ name, role, initial, email, socials = [] }) {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="page-footer-top">
          <div className="page-footer-brand">
            <span className="page-footer-logo">{initial}</span>
            <div>
              <h4>{name}</h4>
              <p>{role}</p>
            </div>
          </div>

          <div className="page-footer-nav">
            <Link to="/" className="page-footer-home-link">
              <FaHome /> LOGHOUSE
            </Link>
            <Link to="/alan" className="page-footer-link">Alan</Link>
            <Link to="/danish" className="page-footer-link">Danish</Link>
            <Link to="/razia" className="page-footer-link">Razia</Link>
          </div>

          <div className="page-footer-socials">
            {email && (
              <a href={`mailto:${email}`} className="page-footer-social" aria-label="Email">
                <FaEnvelope />
              </a>
            )}
            {socials.map((s, i) => (
              <a key={i} href={s.href} className="page-footer-social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        <div className="page-footer-divider" />

        <div className="page-footer-bottom">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p className="page-footer-badge">
            Part of <Link to="/" className="loghouse-badge-link">LOGHOUSE</Link> — Home of the Logicians
          </p>
        </div>
      </div>
    </footer>
  );
}
