import { FaTools } from 'react-icons/fa';
import './ResumeSection.css';

export default function ResumeSkills({ skillCategories, otherSkills }) {
  // Flatten skills for a clean two-column display on the CV
  const devSkills = skillCategories.find(c => c.title === 'Development');
  const coreSkills = [
    'Programming / Coding',
    'Website Development',
    'Web App Development',
    'Android App Development (Basic)',
    'Video Editing',
    'Content Writing',
    'Graphic Designing',
  ];

  return (
    <div className="resume-section">
      <div className="resume-section-heading">
        <FaTools className="resume-section-icon" />
        <h3>SKILLS</h3>
      </div>
      <ul className="resume-list">
        {coreSkills.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}
