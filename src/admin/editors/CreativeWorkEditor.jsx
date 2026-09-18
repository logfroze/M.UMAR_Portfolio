import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import AdminImageUploader from '../components/AdminImageUploader';
import './SectionEditors.css';

const CATEGORIES = ['Graphic Design', 'Poster Design', 'Video Editing', 'Social Media', 'Other'];

const emptyItem = () => ({
  title: '',
  category: 'Graphic Design',
  color: '#58a6ff',
  description: '',
  images: '',
  coverImage: '',
  driveLink: '',
  isNewlyUpdated: true,
  visibility: 'public',
});

export default function CreativeWorkEditor() {
  const {
    creativeWork,
    addCreativeWork,
    updateCreativeWork,
    deleteCreativeWork,
    reorderCreativeWork,
    toggleCreativeWorkNewlyUpdated,
    sections,
    toggleSectionVisibility,
  } = usePortfolioData();
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formDraft, setFormDraft] = useState(emptyItem());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const getImagesStr = (draft) => {
    if (typeof draft.images === 'string') return draft.images;
    if (Array.isArray(draft.images)) return draft.images.join('\n');
    return '';
  };

  const parseImages = (str) => {
    if (!str.trim()) return [];
    return str.split('\n').map(s => s.trim()).filter(Boolean);
  };

  const openAdd = () => { setFormDraft(emptyItem()); setAddOpen(true); };
  const openEdit = (item) => {
    setFormDraft({
      ...item,
      images: Array.isArray(item.images) ? item.images.join('\n') : (item.images || ''),
      isNewlyUpdated: item.isNewlyUpdated !== undefined ? !!item.isNewlyUpdated : false,
    });
    setEditTarget(item.id);
  };

  const handleSave = () => {
    const payload = {
      ...formDraft,
      images: parseImages(typeof formDraft.images === 'string' ? formDraft.images : ''),
      isNewlyUpdated: formDraft.isNewlyUpdated !== undefined ? !!formDraft.isNewlyUpdated : true,
    };
    if (editTarget) { updateCreativeWork(editTarget, payload); setEditTarget(null); }
    else { addCreativeWork(payload); setAddOpen(false); }
  };

  const toggleVis = (item) => updateCreativeWork(item.id, { visibility: item.visibility === 'public' ? 'private' : 'public' });

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Creative Work ({creativeWork.length})</h3>
          <AdminVisibilityBadge visibility={sections?.creative || 'public'} interactive onToggle={() => toggleSectionVisibility('creative')} />
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}><FaPlus /> Add Creative Work</button>
      </div>

      <div className="items-list">
        {creativeWork.map((item, idx) => (
          <div key={item.id} className={`item-row ${item.visibility === 'private' ? 'is-private' : ''}`}>
            <div className="item-row-thumb">
              {(item.images?.[0] || item.coverImage) ? (
                <img src={encodeURI(item.images?.[0] || item.coverImage)} alt={item.title} className="item-thumb-img" onError={e => e.target.style.display='none'} />
              ) : <div className="item-thumb-placeholder" style={{background:`${item.color}22`, color: item.color}}>🎨</div>}
            </div>
            <div className="item-row-info">
              <span className="item-row-name">{item.title}</span>
              <span className="item-meta-badge" style={{ color: item.color }}>{item.category}</span>
            </div>
            <div className="item-row-actions">
              <button
                className={`admin-icon-btn ${item.isNewlyUpdated ? 'admin-icon-btn--active-star' : ''}`}
                onClick={() => toggleCreativeWorkNewlyUpdated(item.id)}
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
              <AdminVisibilityBadge visibility={item.visibility || 'public'} interactive size="sm" onToggle={() => toggleVis(item)} />
              <button className="admin-icon-btn" onClick={() => reorderCreativeWork(idx, idx - 1)} disabled={idx === 0}><FaChevronUp /></button>
              <button className="admin-icon-btn" onClick={() => reorderCreativeWork(idx, idx + 1)} disabled={idx === creativeWork.length - 1}><FaChevronDown /></button>
              <button className="admin-icon-btn" onClick={() => openEdit(item)}><FaEdit /></button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteTarget(item)}><FaTrash /></button>
            </div>
          </div>
        ))}
        {!creativeWork.length && <div className="empty-state">No creative work items yet.</div>}
      </div>

      <AdminModalForm isOpen={addOpen || !!editTarget} title={editTarget ? 'Edit Creative Work' : 'Add Creative Work'} onClose={() => { setAddOpen(false); setEditTarget(null); }} onSubmit={handleSave} maxWidth="660px">
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>Title *</label>
            <input type="text" className="admin-input-control" value={formDraft.title || ''} onChange={(e) => setFormDraft({ ...formDraft, title: e.target.value })} placeholder="e.g. Brand Identity Design" autoFocus />
          </div>
          <div className="admin-input-group">
            <label>Category</label>
            <select className="admin-input-control" value={formDraft.category || 'Graphic Design'} onChange={(e) => setFormDraft({ ...formDraft, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="admin-input-group">
          <label>Description</label>
          <textarea className="admin-input-control" rows={3} value={formDraft.description || ''} onChange={(e) => setFormDraft({ ...formDraft, description: e.target.value })} />
        </div>
        <div className="admin-input-group">
          <label>Image Paths (one per line) — for image gallery</label>
          <textarea className="admin-input-control" rows={5} value={getImagesStr(formDraft)} onChange={(e) => setFormDraft({ ...formDraft, images: e.target.value })} placeholder={`/creative/brand-identity/logfroze/1.png\n/creative/brand-identity/logfroze/2.png`} />
        </div>
        <div className="admin-input-group">
          <label>Google Drive Link (for video items — leave blank if image gallery)</label>
          <input type="url" className="admin-input-control" value={formDraft.driveLink || ''} onChange={(e) => setFormDraft({ ...formDraft, driveLink: e.target.value })} placeholder="https://drive.google.com/..." />
        </div>
        <AdminImageUploader label="Cover Image (optional)" value={formDraft.coverImage || ''} onChange={(val) => setFormDraft({ ...formDraft, coverImage: val })} />
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>Accent Color</label>
            <input type="color" className="admin-input-control" value={formDraft.color || '#58a6ff'} onChange={(e) => setFormDraft({ ...formDraft, color: e.target.value })} style={{ height: 42, padding: '4px 8px' }} />
          </div>
          <div className="admin-input-group">
            <label>Visibility</label>
            <select className="admin-input-control" value={formDraft.visibility || 'public'} onChange={(e) => setFormDraft({ ...formDraft, visibility: e.target.value })}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
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
            When enabled, the shiny neon update star logo will be displayed on the top-right corner of this creative work card.
          </span>
        </div>
      </AdminModalForm>

      <AdminDeleteConfirmModal isOpen={!!deleteTarget} title={`Delete "${deleteTarget?.title}"`} message="Delete this creative work item permanently?" onConfirm={() => { deleteCreativeWork(deleteTarget.id); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
