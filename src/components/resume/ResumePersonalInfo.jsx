import { FaUser } from 'react-icons/fa';
import './ResumeSection.css';

export default function ResumePersonalInfo({ data }) {
  return (
    <div className="resume-personal-card">
      <div className="resume-personal-header">
        <div className="resume-personal-icon-circle">
          <FaUser />
        </div>
        <h3 className="resume-personal-title">PERSONAL INFORMATION</h3>
        <div className="resume-personal-line" />
      </div>

      <div className="resume-personal-cols">
        {/* Col 1 */}
        <div className="resume-personal-col">
          <div className="resume-personal-row">
            <span className="resume-personal-label">Father's Name</span>
            <span className="resume-personal-sep">:</span>
            <span className="resume-personal-val">{data.fathersName}</span>
          </div>
          <div className="resume-personal-row">
            <span className="resume-personal-label">Date of Birth</span>
            <span className="resume-personal-sep">:</span>
            <span className="resume-personal-val">{data.dateOfBirth}</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="resume-personal-col">
          <div className="resume-personal-row">
            <span className="resume-personal-label">Nationality</span>
            <span className="resume-personal-sep">:</span>
            <span className="resume-personal-val">{data.nationality}</span>
          </div>
          <div className="resume-personal-row">
            <span className="resume-personal-label">Religion</span>
            <span className="resume-personal-sep">:</span>
            <span className="resume-personal-val">{data.religion}</span>
          </div>
        </div>

        {/* Col 3 */}
        <div className="resume-personal-col">
          <div className="resume-personal-row">
            <span className="resume-personal-label">Languages</span>
            <span className="resume-personal-sep">:</span>
            <span className="resume-personal-val">{data.languages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
