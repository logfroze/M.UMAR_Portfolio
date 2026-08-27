import { FaGraduationCap } from 'react-icons/fa';
import './ResumeSection.css';

export default function ResumeEducation({ education }) {
  return (
    <div className="resume-section">
      <div className="resume-section-heading">
        <FaGraduationCap className="resume-section-icon" />
        <h3>EDUCATION</h3>
      </div>
      {education.map((edu, i) => (
        <div key={i} className="resume-edu-block">
          <p className="resume-edu-degree">{edu.degree}</p>
          <p className="resume-edu-institution">{edu.institution}</p>
          <ul className="resume-list">
            <li>{edu.college}</li>
            <li>{edu.duration}</li>
            <li>{edu.status}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
