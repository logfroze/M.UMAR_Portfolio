import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import AdminImageUploader from '../components/AdminImageUploader';
import './SectionEditors.css';

const CATEGORIES = ['Book', 'Story', 'Column', 'Creative Writing', 'Poetry', 'Essay', 'Other'];

const emptyWriting = () => ({
  title: '',
  category: 'Story',
  subtitle: '',
  status: '',
  summary: '',
  pageCount: 0,
  pages: '',       // newline-separated image paths
  linkText: 'Read',
  isReadable: false,
  isNewlyUpdated: true,
  visibility: 'public',
});

export default function WritingEditor() {
  const {
    writings,
    addWriting,
    updateWriting,
    deleteWriting,
    reorderWritings,
    toggleWritingNewlyUpdated,
    sections,
    toggleSectionVisibility,
  } = usePortfolioData();
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formDraft, setFormDraft] = useState(emptyWriting());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const getPagesStr = (draft) => {
    if (typeof draft.pages === 'string') return draft.pages;
    if (Array.isArray(draft.pages)) return draft.pages.join('\n');
    return '';
  };

  const parsePages = (str) => {
    if (!str || !str.trim()) return [];
    return str.split('\n').map((s) => s.trim()).filter(Boolean);
  };

  const openAdd = () => {
    setFormDraft(emptyWriting());
    setAddOpen(true);
  };

  const openEdit = (item) => {
    setFormDraft({
      ...item,
      pages: Array.isArray(item.pages) ? item.pages.join('\n') : (item.pages || ''),
      isNewlyUpdated: item.isNewlyUpdated !== undefined ? !!item.isNewlyUpdated : false,
    });
    setEditTarget(item.id);
  };

  const handleSave = () => {
    if (!formDraft.title.trim()) return;
    const parsedPages = parsePages(getPagesStr(formDraft));
    const payload = {
      ...formDraft,
      pages: parsedPages,
      pageCount: parsedPages.length || Number(formDraft.pageCount) || 0,
      isNewlyUpdated: formDraft.isNewlyUpdated !== undefined ? !!formDraft.isNewlyUpdated : true,
    };
    if (editTarget) {
      updateWriting(editTarget, payload);
      setEditTarget(null);
    } else {
      addWriting(payload);
      setAddOpen(false);
    }
  };

  const toggleVis = (item) =>
    updateWriting(item.id, { visibility: item.visibility === 'public' ? 'private' : 'public' });

  const CAT_COLORS = {
    Book: '#4e8ef7', Story: '#a855f7', Column: '#2dd4bf',
    'Creative Writing': '#f59e0b', Poetry: '#e05252', Essay: '#34a85a', Other: '#888',
  };

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Writing ({writings.length})</h3>
          <AdminVisibilityBadge
            visibility={sections?.writing || 'public'}
            interactive
            onToggle={() => toggleSectionVisibility('writing')}
          />
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}>
          <FaPlus /> Add Writing
        </button>
      </div>

      <div className="items-list">
        {writings.map((item, idx) => (
          <div key={item.id} className={`item-row ${item.visibility === 'private' ? 'is-private' : ''}`}>
            <div
              className="item-row-thumb"
              style={{
                background: `${CAT_COLORS[item.category] || '#888'}22`,
                color: CAT_COLORS[item.category] || '#888',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✍
            </div>
            <div className="item-row-info">
              <span className="item-row-name">{item.title}</span>
              <div className="item-row-meta">
                <span className="item-meta-badge" style={{ color: CAT_COLORS[item.category] }}>
                  {item.category}
                </span>
                {item.pageCount > 0 && (
                  <span className="item-meta-badge">{item.pageCount} pages</span>
                )}
                {item.status && <span className="item-meta-badge">{item.status}</span>}
                {item.isReadable && <span className="item-meta-badge badge-green">Readable</span>}
              </div>
            </div>
            <div className="item-row-actions">
              <button
                className={`admin-icon-btn ${item.isNewlyUpdated ? 'admin-icon-btn--active-star' : ''}`}
                onClick={() => toggleWritingNewlyUpdated(item.id)}
                title={item.isNewlyUpdated ? 'Marked as Newly Updated (Click to remove star)' : 'Click to mark as Newly Updated (Show star)'}
                style={{
                  border: item.isNewlyUpdated ? '1px solid rgba(255, 215, 0, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: item.isNewlyUpdated ? 'rgba(255, 215, 0, 0.18)' : 'transparent',
                }}
              >
                <img
                  src="/Update_star.png"
                  alt="Update Star"
                  style={{
                    width: '16px',
                    height: '16px',
                    objectFit: 'contain',
                    filter: item.isNewlyUpdated ? 'drop-shadow(0 0 5px #ffd700)' : 'grayscale(1) opacity(0.3)',
                  }}
                />
              </button>
              <AdminVisibilityBadge
                visibility={item.visibility || 'public'}
                interactive
                size="sm"
                onToggle={() => toggleVis(item)}
              />
              <button
                className="admin-icon-btn"
                onClick={() => reorderWritings(idx, idx - 1)}
                disabled={idx === 0}
              >
                <FaChevronUp />
              </button>
              <button
                className="admin-icon-btn"
                onClick={() => reorderWritings(idx, idx + 1)}
                disabled={idx === writings.length - 1}
              >
                <FaChevronDown />
              </button>
              <button className="admin-icon-btn" onClick={() => openEdit(item)}>
                <FaEdit />
              </button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteTarget(item)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {!writings.length && (
          <div className="empty-state">No writing items yet.</div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <AdminModalForm
        isOpen={addOpen || !!editTarget}
        title={editTarget ? 'Edit Writing' : 'Add Writing'}
        onClose={() => { setAddOpen(false); setEditTarget(null); }}
        onSubmit={handleSave}
        maxWidth="640px"
      >
        <div className="admin-grid-2">
          <div className="admin-input-group admin-col-span-2">
            <label>Title *</label>
            <input
              type="text"
              className="admin-input-control"
              value={formDraft.title || ''}
              onChange={(e) => setFormDraft({ ...formDraft, title: e.target.value })}
              placeholder="e.g. Sire Intendy"
              autoFocus
            />
          </div>
          <div className="admin-input-group">
            <label>Category</label>
            <select
              className="admin-input-control"
              value={formDraft.category || 'Story'}
              onChange={(e) => setFormDraft({ ...formDraft, category: e.target.value })}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="admin-input-group">
            <label>Subtitle</label>
            <input
              type="text"
              className="admin-input-control"
              value={formDraft.subtitle || ''}
              onChange={(e) => setFormDraft({ ...formDraft, subtitle: e.target.value })}
              placeholder="e.g. A story about..."
            />
          </div>
          <div className="admin-input-group admin-col-span-2">
            <label>Status</label>
            <input
              type="text"
              className="admin-input-control"
              value={formDraft.status || ''}
              onChange={(e) => setFormDraft({ ...formDraft, status: e.target.value })}
              placeholder="e.g. In Progress · Fiction"
            />
          </div>
        </div>
        <div className="admin-input-group">
          <label>Summary</label>
          <textarea
            className="admin-input-control"
            rows={4}
            value={formDraft.summary || ''}
            onChange={(e) => setFormDraft({ ...formDraft, summary: e.target.value })}
            placeholder="Brief description of this writing piece"
          />
        </div>
        <div className="admin-input-group">
          <label>Page Image Paths (one per line — auto-counted as page count)</label>
          <textarea
            className="admin-input-control"
            rows={5}
            value={getPagesStr(formDraft)}
            onChange={(e) => setFormDraft({ ...formDraft, pages: e.target.value })}
            placeholder={`/writing_rendered/story_name/page_1.webp\n/writing_rendered/story_name/page_2.webp`}
          />
          <span className="admin-helper-text">
            Leave empty if not readable. Page count is auto-calculated.
          </span>
        </div>
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>Link Text</label>
            <input
              type="text"
              className="admin-input-control"
              value={formDraft.linkText || ''}
              onChange={(e) => setFormDraft({ ...formDraft, linkText: e.target.value })}
              placeholder="e.g. Read Chapter 1"
            />
          </div>
          <div className="admin-input-group">
            <label>Visibility</label>
            <select
              className="admin-input-control"
              value={formDraft.visibility || 'public'}
              onChange={(e) => setFormDraft({ ...formDraft, visibility: e.target.value })}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div className="admin-input-group">
          <label>
            <input
              type="checkbox"
              checked={!!formDraft.isReadable}
              onChange={(e) => setFormDraft({ ...formDraft, isReadable: e.target.checked })}
            />
            {' '} Readable (shows a "Read" button to open the pages viewer)
          </label>
        </div>
        <div className="admin-input-group" style={{ marginTop: '4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!formDraft.isNewlyUpdated}
              onChange={(e) => setFormDraft({ ...formDraft, isNewlyUpdated: e.target.checked })}
            />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <img src="/Update_star.png" alt="" style={{ width: '16px', height: '16px' }} />
              Mark as Newly Updated (Show Shiny Update Star Badge on Card)
            </span>
          </label>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '22px', display: 'block', marginTop: '2px' }}>
            When enabled, the shiny neon update star logo will be displayed on the top-right corner of this writing card.
          </span>
        </div>
      </AdminModalForm>

      <AdminDeleteConfirmModal
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.title}"`}
        message="Delete this writing piece permanently?"
        onConfirm={() => { deleteWriting(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
