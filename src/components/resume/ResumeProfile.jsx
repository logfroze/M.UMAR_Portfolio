import './ResumeProfile.css';

export default function ResumeProfile({ summary }) {
  return (
    <div className="resume-profile-band">
      <h2 className="resume-profile-heading">PROFILE</h2>
      <p className="resume-profile-text">{summary}</p>
    </div>
  );
}
