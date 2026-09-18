import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import './SectionEditors.css';

const EVENT_TYPES = ['Education', 'Work', 'Achievement', 'Personal', 'Project', 'Other'];

const emptyEvent = () => ({
  year: new Date().getFullYear().toString(),
  title: '',
  subtitle: '',
  description: '',
  type: 'Education',
  icon: 'FaGraduationCap',
  highlight: false,
  visibility: 'public',
});

export default function TimelineEditor() {
  const { timeline, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent, reorderTimeline, sections, toggleSectionVisibility } = usePortfolioData();
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formDraft, setFormDraft] = useState(emptyEvent());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd = () => { setFormDraft(emptyEvent()); setAddOpen(true); };
  const openEdit = (item) => { setFormDraft({ ...item }); setEditTarget(item.id); };

  const handleSave = () => {
    if (!formDraft.title.trim()) return;
    if (editTarget) { updateTimelineEvent(editTarget, formDraft); setEditTarget(null); }
    else { addTimelineEvent(formDraft); setAddOpen(false); }
  };

  const toggleVis = (item) => updateTimelineEvent(item.id, { visibility: item.visibility === 'public' ? 'private' : 'public' });

  const TYPE_COLORS = { Education: '#4e8ef7', Work: '#2dd4bf', Achievement: '#f59e0b', Personal: '#a855f7', Project: '#34a85a', Other: '#888' };

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Timeline ({timeline.length})</h3>
          <AdminVisibilityBadge visibility={sections?.timeline || 'public'} interactive onToggle={() => toggleSectionVisibility('timeline')} />
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}><FaPlus /> Add Event</button>
      </div>

      <div className="items-list">
        {timeline.map((item, idx) => (
          <div key={item.id} className={`item-row ${item.visibility === 'private' ? 'is-private' : ''}`}>
            <div className="item-row-thumb" style={{ background: `${TYPE_COLORS[item.type] || '#888'}22`, color: TYPE_COLORS[item.type] || '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700 }}>
              {item.year}
            </div>
            <div className="item-row-info">
              <span className="item-row-name">{item.title}</span>
              <div className="item-row-meta">
                <span className="item-meta-badge" style={{ color: TYPE_COLORS[item.type] }}>{item.type}</span>
                {item.subtitle && <span className="item-meta-badge">{item.subtitle}</span>}
                {item.highlight && <span className="item-meta-badge badge-yellow">⭐ Highlight</span>}
              </div>
            </div>
            <div className="item-row-actions">
              <AdminVisibilityBadge visibility={item.visibility || 'public'} interactive size="sm" onToggle={() => toggleVis(item)} />
              <button className="admin-icon-btn" onClick={() => reorderTimeline(idx, idx - 1)} disabled={idx === 0}><FaChevronUp /></button>
              <button className="admin-icon-btn" onClick={() => reorderTimeline(idx, idx + 1)} disabled={idx === timeline.length - 1}><FaChevronDown /></button>
              <button className="admin-icon-btn" onClick={() => openEdit(item)}><FaEdit /></button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteTarget(item)}><FaTrash /></button>
            </div>
          </div>
        ))}
        {!timeline.length && <div className="empty-state">No timeline events yet.</div>}
      </div>

      <AdminModalForm isOpen={addOpen || !!editTarget} title={editTarget ? 'Edit Timeline Event' : 'Add Timeline Event'} onClose={() => { setAddOpen(false); setEditTarget(null); }} onSubmit={handleSave} maxWidth="560px">
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>Year *</label>
            <input type="text" className="admin-input-control" value={formDraft.year || ''} onChange={(e) => setFormDraft({ ...formDraft, year: e.target.value })} placeholder="2024" />
          </div>
          <div className="admin-input-group">
            <label>Type</label>
            <select className="admin-input-control" value={formDraft.type || 'Education'} onChange={(e) => setFormDraft({ ...formDraft, type: e.target.value })}>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="admin-input-group admin-col-span-2">
            <label>Title *</label>
            <input type="text" className="admin-input-control" value={formDraft.title || ''} onChange={(e) => setFormDraft({ ...formDraft, title: e.target.value })} placeholder="e.g. Started University" autoFocus />
          </div>
          <div className="admin-input-group admin-col-span-2">
            <label>Subtitle (institution, company, etc.)</label>
            <input type="text" className="admin-input-control" value={formDraft.subtitle || ''} onChange={(e) => setFormDraft({ ...formDraft, subtitle: e.target.value })} />
          </div>
        </div>
        <div className="admin-input-group">
          <label>Description</label>
          <textarea className="admin-input-control" rows={3} value={formDraft.description || ''} onChange={(e) => setFormDraft({ ...formDraft, description: e.target.value })} />
        </div>
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>Icon (react-icons key)</label>
            <input type="text" className="admin-input-control" value={formDraft.icon || ''} onChange={(e) => setFormDraft({ ...formDraft, icon: e.target.value })} placeholder="FaGraduationCap" />
          </div>
          <div className="admin-input-group">
            <label>Visibility</label>
            <select className="admin-input-control" value={formDraft.visibility || 'public'} onChange={(e) => setFormDraft({ ...formDraft, visibility: e.target.value })}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div className="admin-input-group">
          <label>
            <input type="checkbox" checked={!!formDraft.highlight} onChange={(e) => setFormDraft({ ...formDraft, highlight: e.target.checked })} />
            {' '} Mark as Highlight (shown prominently)
          </label>
        </div>
      </AdminModalForm>

      <AdminDeleteConfirmModal isOpen={!!deleteTarget} title={`Delete "${deleteTarget?.title}"`} message="Delete this timeline event permanently?" onConfirm={() => { deleteTimelineEvent(deleteTarget.id); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
