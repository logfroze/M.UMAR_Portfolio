import { FaPen } from 'react-icons/fa';
import './ResumeSection.css';

export default function ResumeOtherSkills({ skills }) {
  return (
    <div className="resume-section resume-other-skills-section">
      <div className="resume-box-item">
        <div className="resume-box-icon-sq resume-box-icon-sq--outline">
          <FaPen />
        </div>
        <div className="resume-box-content">
          <h3 className="resume-box-title">Other Skills</h3>
          <ul className="resume-list resume-list--compact">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
