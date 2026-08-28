import { FaBriefcase } from 'react-icons/fa';
import './ResumeSection.css';

export default function ResumeExperience({ experience }) {
  return (
    <div className="resume-section">
      <div className="resume-section-heading">
        <FaBriefcase className="resume-section-icon" />
        <h3>EXPERIENCE &amp; PROJECTS</h3>
      </div>
      {experience.map((exp, i) => (
        <div key={i} className="resume-exp-block">
          <p className="resume-exp-title">{exp.title}</p>
          <ul className="resume-list">
            {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
