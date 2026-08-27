import { FaExternalLinkAlt } from 'react-icons/fa';
import './ResumeSection.css';

export default function ResumeEntrepreneurship({ data }) {
  return (
    <div className="resume-section resume-entrepreneurship-section">
      <div className="resume-box-item">
        <div className="resume-box-icon-sq resume-box-icon-sq--solid">
          <span className="resume-box-logo-text">lg</span>
        </div>
        <div className="resume-box-content">
          <h3 className="resume-box-title">{data.title}</h3>
          <p className="resume-entrepre-desc">{data.description}</p>
          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-entrepre-link"
            >
              <span>Visit Website: {data.link.replace('https://', '')}</span>
              <FaExternalLinkAlt className="resume-link-icon" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
