import { FaCode } from 'react-icons/fa';
import './ResumeSection.css';
import { skillCategories } from '../../data/skills';

export default function ResumeTechStack() {
  const devCat = skillCategories.find(c => c.title === 'Development');
  const toolsCat = skillCategories.find(c => c.title === 'Tools');

  const renderCol = (label, skills) => (
    <div className="tech-stack-col">
      <p className="tech-stack-sublabel">{label}</p>
      <ul className="resume-list no-bullets">
        {skills.map((s, i) => <li key={i}>{s.name}</li>)}
      </ul>
    </div>
  );

  return (
    <div className="resume-section">
      <div className="resume-section-heading">
        <FaCode className="resume-section-icon" />
        <h3>TECH STACK (That I have worked with)</h3>
      </div>
      <div className="tech-stack-grid">
        {devCat?.subGroups?.map((grp, i) => renderCol(grp.label, grp.skills))}
        {toolsCat && (
          <div className="tech-stack-col">
            <p className="tech-stack-sublabel">Version Control & Deployment</p>
            <ul className="resume-list no-bullets">
              {toolsCat.skills.filter(s => ['Git', 'GitHub', 'Vercel', 'Netlify'].includes(s.name)).map((s, i) => (
                <li key={i}>{s.name}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="tech-stack-col">
          <p className="tech-stack-sublabel">AI</p>
          <ul className="resume-list no-bullets">
            <li>ChatGPT</li>
            <li>Gemini</li>
            <li>Antigravity</li>
            <li>Emergent</li>
            <li>AI-assisted Development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
