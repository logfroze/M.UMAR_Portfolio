import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes, FaShieldAlt, FaUser, FaCode, FaBriefcase, FaFileAlt, FaPalette,
  FaFeatherAlt, FaClock, FaDatabase, FaDownload, FaUpload, FaTrash, FaChevronRight,
} from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import HeroAboutEditor from '../editors/HeroAboutEditor';
import SkillsEditor from '../editors/SkillsEditor';
import ProjectsEditor from '../editors/ProjectsEditor';
import InternshipsEditor from '../editors/InternshipsEditor';
import DocumentsEditor from '../editors/DocumentsEditor';
import CreativeWorkEditor from '../editors/CreativeWorkEditor';
import WritingEditor from '../editors/WritingEditor';
import TimelineEditor from '../editors/TimelineEditor';
import './AdminDashboard.css';

const SECTIONS = [
  { id: 'hero-about', label: 'Hero & About', icon: FaUser, editor: HeroAboutEditor },
  { id: 'skills', label: 'Skills', icon: FaCode, editor: SkillsEditor },
  { id: 'projects', label: 'Projects', icon: FaBriefcase, editor: ProjectsEditor },
  { id: 'internships', label: 'Internships', icon: FaBriefcase, editor: InternshipsEditor },
  { id: 'documents', label: 'Documents', icon: FaFileAlt, editor: DocumentsEditor },
  { id: 'creative', label: 'Creative Work', icon: FaPalette, editor: CreativeWorkEditor },
  { id: 'writing', label: 'Writing', icon: FaFeatherAlt, editor: WritingEditor },
  { id: 'timeline', label: 'Timeline', icon: FaClock, editor: TimelineEditor },
];

export default function AdminDashboard({ isOpen, onClose }) {
  const { exportData, importData, resetToDefaults, notify, lastUpdatedDate, updateLastUpdatedDate } = usePortfolioData();
  const [activeSection, setActiveSection] = useState('hero-about');
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [isEditingHeaderDate, setIsEditingHeaderDate] = useState(false);
  const [headerDateDraft, setHeaderDateDraft] = useState(lastUpdatedDate || 'September 18, 2026');

  const ActiveEditor = SECTIONS.find((s) => s.id === activeSection)?.editor || null;

  const handleExport = () => {
    const data = exportData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alan-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Backup file downloaded successfully.', 'success');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        importData(parsed);
        notify('Portfolio data imported successfully!', 'success');
      } catch (err) {
        notify('Import failed. Invalid JSON file.', 'danger');
      }
    };
    input.click();
  };

  const handleReset = () => {
    resetToDefaults();
    setConfirmReset(false);
    notify('Portfolio data reset to original defaults.', 'info');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="admin-dashboard-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="admin-dashboard"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Dashboard Header */}
          <div className="admin-dashboard-header">
            <div className="admin-dashboard-brand">
              <FaShieldAlt className="admin-dashboard-brand-icon" />
              <div>
                <div className="admin-dashboard-brand-name">Portfolio CMS</div>
                <div className="admin-dashboard-brand-sub">Admin Control Mode</div>
              </div>
            </div>

            {/* Quick Portfolio Updation Date Display & Quick Edit */}
            <div className="admin-dashboard-header-date">
              <img
                src="/Update_star.png"
                alt=""
                style={{ width: '18px', height: '18px', filter: 'drop-shadow(0 0 5px #ffd700)' }}
              />
              {!isEditingHeaderDate ? (
                <div className="admin-header-date-display">
                  <span className="admin-header-date-label">Updated:</span>
                  <span className="admin-header-date-val">{lastUpdatedDate}</span>
                  <button
                    type="button"
                    className="admin-header-date-edit-btn"
                    onClick={() => {
                      setHeaderDateDraft(lastUpdatedDate);
                      setIsEditingHeaderDate(true);
                    }}
                    title="Edit portfolio update date"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="admin-header-date-edit-form">
                  <input
                    type="text"
                    value={headerDateDraft}
                    onChange={(e) => setHeaderDateDraft(e.target.value)}
                    placeholder="e.g. September 18, 2026"
                    className="admin-header-date-input"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (headerDateDraft.trim()) updateLastUpdatedDate(headerDateDraft.trim());
                        setIsEditingHeaderDate(false);
                      } else if (e.key === 'Escape') {
                        setIsEditingHeaderDate(false);
                      }
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      fontSize: '0.72rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const today = new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                      setHeaderDateDraft(today);
                    }}
                    title="Set to today"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className="admin-header-date-save-btn"
                    onClick={() => {
                      if (headerDateDraft.trim()) updateLastUpdatedDate(headerDateDraft.trim());
                      setIsEditingHeaderDate(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="admin-header-date-cancel-btn"
                    onClick={() => setIsEditingHeaderDate(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="admin-dashboard-header-actions">
              <button
                className={`admin-db-icon-btn ${showDataPanel ? 'active' : ''}`}
                onClick={() => setShowDataPanel(!showDataPanel)}
                title="Data Management"
              >
                <FaDatabase />
              </button>
              <button className="admin-db-icon-btn" onClick={onClose} title="Close Dashboard">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Data Management Panel */}
          <AnimatePresence>
            {showDataPanel && (
              <motion.div
                className="admin-data-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="admin-data-panel-inner">
                  <div className="admin-data-panel-title">
                    <FaDatabase /> Data Management
                  </div>
                  <div className="admin-data-panel-actions">
                    <button className="admin-data-btn admin-data-btn--export" onClick={handleExport}>
                      <FaDownload /> Export Backup
                    </button>
                    <button className="admin-data-btn admin-data-btn--import" onClick={handleImport}>
                      <FaUpload /> Import Backup
                    </button>
                    {!confirmReset ? (
                      <button className="admin-data-btn admin-data-btn--reset" onClick={() => setConfirmReset(true)}>
                        <FaTrash /> Reset to Defaults
                      </button>
                    ) : (
                      <div className="admin-data-confirm-reset">
                        <span>⚠️ Are you sure? This is irreversible.</span>
                        <button className="admin-data-btn admin-data-btn--confirm" onClick={handleReset}>Yes, Reset</button>
                        <button className="admin-data-btn admin-data-btn--cancel" onClick={() => setConfirmReset(false)}>Cancel</button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dashboard Body */}
          <div className="admin-dashboard-body">
            {/* Sidebar */}
            <div className="admin-sidebar">
              <div className="admin-sidebar-label">CONTENT SECTIONS</div>
              <nav className="admin-sidebar-nav">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      className={`admin-sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="admin-sidebar-item-icon" />
                      <span>{section.label}</span>
                      {activeSection === section.id && <FaChevronRight className="admin-sidebar-item-arrow" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Editor Area */}
            <div className="admin-editor-area">
              <div className="admin-editor-scroll">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {ActiveEditor && <ActiveEditor />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
