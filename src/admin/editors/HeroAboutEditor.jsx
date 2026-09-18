import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import './SectionEditors.css';

export default function HeroAboutEditor() {
  const { heroAbout, updateHeroAbout, sections, toggleSectionVisibility, lastUpdatedDate, updateLastUpdatedDate } = usePortfolioData();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const startEdit = () => {
    setDraft({
      ...JSON.parse(JSON.stringify(heroAbout)),
      lastUpdatedDate: lastUpdatedDate || 'September 18, 2026',
    });
    setEditing(true);
  };

  const cancel = () => {
    setDraft(null);
    setEditing(false);
  };

  const save = () => {
    if (draft.lastUpdatedDate) {
      updateLastUpdatedDate(draft.lastUpdatedDate);
    }
    const { lastUpdatedDate: _, ...heroFields } = draft;
    updateHeroAbout(heroFields);
    setEditing(false);
    setDraft(null);
  };

  const updateParagraph = (index, value) => {
    const paras = [...draft.introParagraphs];
    paras[index] = value;
    setDraft({ ...draft, introParagraphs: paras });
  };

  const addParagraph = () => {
    setDraft({ ...draft, introParagraphs: [...(draft.introParagraphs || []), ''] });
  };

  const removeParagraph = (index) => {
    const paras = [...draft.introParagraphs];
    paras.splice(index, 1);
    setDraft({ ...draft, introParagraphs: paras });
  };

  const updateStat = (index, field, value) => {
    const stats = [...draft.stats];
    stats[index] = { ...stats[index], [field]: value };
    setDraft({ ...draft, stats });
  };

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Hero &amp; About Section</h3>
          <AdminVisibilityBadge
            visibility={sections?.about || 'public'}
            interactive
            onToggle={() => {
              toggleSectionVisibility('hero');
              toggleSectionVisibility('about');
            }}
          />
        </div>
        {!editing && (
          <button className="admin-btn admin-btn--primary" onClick={startEdit}>
            <FaEdit /> Edit Content
          </button>
        )}
      </div>

      {!editing ? (
        <div className="section-editor-preview">
          <div className="preview-field">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="/Update_star.png" alt="" style={{ width: '16px', height: '16px' }} />
              Latest Portfolio Updation Date
            </label>
            <p style={{ color: '#ffd700', fontWeight: 600 }}>{lastUpdatedDate}</p>
          </div>
          <div className="preview-field">
            <label>Title</label>
            <p>{heroAbout?.title}</p>
          </div>
          <div className="preview-field">
            <label>Introduction Paragraphs</label>
            {(heroAbout?.introParagraphs || []).map((p, i) => (
              <p key={i} className="preview-paragraph">{p}</p>
            ))}
          </div>
          <div className="preview-field">
            <label>Stats</label>
            <div className="preview-stats-row">
              {(heroAbout?.stats || []).map((s, i) => (
                <div key={i} className="preview-stat-chip">
                  <strong>{s.number}</strong> {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="section-editor-form">
          <div className="admin-input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="/Update_star.png" alt="" style={{ width: '16px', height: '16px' }} />
              Latest Portfolio Updation Date (shown above Opportunities badge)
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="admin-input-control"
                value={draft.lastUpdatedDate !== undefined ? draft.lastUpdatedDate : lastUpdatedDate}
                onChange={(e) => setDraft({ ...draft, lastUpdatedDate: e.target.value })}
                placeholder="e.g. September 18, 2026"
                style={{ flex: '1 1 200px' }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => {
                  const today = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  setDraft({ ...draft, lastUpdatedDate: today });
                }}
                title="Set to today's date"
                style={{ whiteSpace: 'nowrap' }}
              >
                Set to Today
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => {
                  const month = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  });
                  setDraft({ ...draft, lastUpdatedDate: month });
                }}
                title="Set to current month (e.g. September 2026)"
                style={{ whiteSpace: 'nowrap' }}
              >
                Set to Current Month
              </button>
            </div>
          </div>

          <div className="admin-input-group">
            <label>Title</label>
            <input
              type="text"
              className="admin-input-control"
              value={draft.title || ''}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="e.g. Full Stack - Developer"
            />
          </div>

          <div className="admin-input-group">
            <label>Subtitle (shown in section header)</label>
            <input
              type="text"
              className="admin-input-control"
              value={draft.subtitle || ''}
              onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
            />
          </div>

          <div className="admin-input-group">
            <label>Introduction Paragraphs</label>
            {(draft.introParagraphs || []).map((para, index) => (
              <div key={index} className="paragraph-editor-row">
                <textarea
                  className="admin-input-control"
                  value={para}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  rows={3}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn--danger-sm"
                  onClick={() => removeParagraph(index)}
                  title="Remove paragraph"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button className="admin-btn admin-btn--ghost" onClick={addParagraph}>
              <FaPlus /> Add Paragraph
            </button>
          </div>

          <div className="admin-input-group">
            <label>Stats</label>
            <div className="admin-grid-2">
              {(draft.stats || []).map((stat, index) => (
                <div key={index} className="stat-edit-pair">
                  <input
                    type="text"
                    className="admin-input-control"
                    value={stat.number || ''}
                    onChange={(e) => updateStat(index, 'number', e.target.value)}
                    placeholder="e.g. 15+"
                  />
                  <input
                    type="text"
                    className="admin-input-control"
                    value={stat.label || ''}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="e.g. Projects"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="section-editor-actions">
            <button className="admin-btn admin-btn--ghost" onClick={cancel}>
              <FaTimes /> Cancel
            </button>
            <button className="admin-btn admin-btn--primary" onClick={save}>
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
