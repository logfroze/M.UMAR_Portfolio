import './ResumeHeader.css';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe
} from 'react-icons/fa';

export default function ResumeHeader({ data }) {
  const { name, title, phone, email, location, github, linkedin, portfolio, photo } = data;

  return (
    <div className="resume-header">
      <div className="resume-header-photo-col">
        <div className="resume-photo-wrapper">
          <img src={photo} alt={name} className="resume-photo" />
        </div>
      </div>
      <div className="resume-header-info-col">
        <h1 className="resume-name">{name}</h1>
        <p className="resume-title">{title}</p>
        <div className="resume-contacts">
          <a href={`tel:${phone}`} className="resume-contact-item">
            <FaPhone className="resume-contact-icon" />
            <span>{phone}</span>
          </a>
          <a href={`mailto:${email}`} className="resume-contact-item">
            <FaEnvelope className="resume-contact-icon" />
            <span>{email}</span>
          </a>
          <span className="resume-contact-item">
            <FaMapMarkerAlt className="resume-contact-icon" />
            <span>{location}</span>
          </span>
          <a href={github} target="_blank" rel="noreferrer" className="resume-contact-item">
            <FaGithub className="resume-contact-icon" />
            <span>Github Profile: {github}</span>
          </a>
          <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="resume-contact-item">
            <FaLinkedin className="resume-contact-icon" />
            <span>Linked-in Profile: {linkedin}</span>
          </a>
          <a href={portfolio} target="_blank" rel="noreferrer" className="resume-contact-item">
            <FaGlobe className="resume-contact-icon" />
            <span>Portfolio: {portfolio}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
