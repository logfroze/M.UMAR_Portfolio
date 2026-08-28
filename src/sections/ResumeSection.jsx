import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { FaDownload, FaPrint } from 'react-icons/fa';

import { resumeData } from '../data/resumeData';

import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeProfile from '../components/resume/ResumeProfile';
import ResumeEducation from '../components/resume/ResumeEducation';
import ResumeSkills from '../components/resume/ResumeSkills';
import ResumeExperience from '../components/resume/ResumeExperience';
import ResumeTechStack from '../components/resume/ResumeTechStack';
import ResumeEntrepreneurship from '../components/resume/ResumeEntrepreneurship';
import ResumeOtherSkills from '../components/resume/ResumeOtherSkills';
import ResumePersonalInfo from '../components/resume/ResumePersonalInfo';
import { skillCategories } from '../data/skills';

import './ResumeSection.css';

export default function ResumeSection() {
  const cvRef = useRef(null);

  const handlePrint = () => window.print();

  const handleDownloadPng = async () => {
    if (!cvRef.current) return;
    try {
      const dataUrl = await toPng(cvRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = 'Muhammad_Umar_CV.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('PNG export failed:', err);
    }
  };

  return (
    <section id="resume" className="section resume-inline-section">
      <div className="container">
        {/* Section heading — matches portfolio style */}
        <div className="section-header">
          <span className="section-label">Resume</span>
          <h2 className="section-title">My CV</h2>
          <p className="section-subtitle">
            Professional document summary.<br />Download or print using the controls below.
          </p>
        </div>

        {/* Toolbar */}
        <div className="resume-inline-toolbar no-print">
          <button onClick={handleDownloadPng} className="resume-btn resume-btn--outline" title="Download PNG">
            <FaDownload />
            <span>Download PNG</span>
          </button>
          <button onClick={handlePrint} className="resume-btn resume-btn--primary" title="Print or Save as PDF">
            <FaPrint />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* A4 CV Document */}
        <div className="resume-a4-container resume-a4-inline" ref={cvRef}>
          <ResumeHeader data={resumeData.personalInfo} />
          <ResumeProfile summary={resumeData.summary} />

          {/* Two-column body */}
          <div className="resume-body-grid">
            {/* Left Column */}
            <div className="resume-left-col">
              <ResumeEducation education={resumeData.education} />
              <ResumeSkills skillCategories={skillCategories} otherSkills={resumeData.otherSkills} />
              <ResumeEntrepreneurship data={resumeData.entrepreneurship} />
            </div>

            {/* Right Column */}
            <div className="resume-right-col">
              <ResumeExperience experience={resumeData.experience} />
              <ResumeTechStack />
              <ResumeOtherSkills skills={resumeData.otherSkills} />
            </div>
          </div>

          {/* Full-width Personal Information bottom card */}
          <ResumePersonalInfo data={resumeData.personalDetails} />

          {/* Document Footer */}
          <div className="resume-footer">
            <span className="resume-last-updated">Last Updated: {resumeData.lastUpdated}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
