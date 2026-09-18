import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import AdminImageUploader from '../components/AdminImageUploader';
import './SectionEditors.css';

const DOC_CATEGORY_OPTIONS = [
  { value: 'Education', label: 'Education', color: '#4e8ef7' },
  { value: 'Info', label: 'Info & Identity', color: '#2dd4bf' },
  { value: 'Curriculum', label: 'Extra-Curriculum', color: '#f59e0b' },
  { value: 'Cards', label: 'Cards', color: '#a855f7' },
  { value: 'Martial Arts', label: 'Martial Arts', color: '#e05252' },
];

const emptyDoc = () => ({
  title: '',
  category: 'Education',
  categoryLabel: 'Education',
  image: '',
  color: '#4e8ef7',
  visibility: 'public',
});

export default function DocumentsEditor() {
  const { documents, addDocument, updateDocument, deleteDocument, reorderDocuments, sections, toggleSectionVisibility } = usePortfolioData();
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formDraft, setFormDraft] = useState(emptyDoc());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd = () => { setFormDraft(emptyDoc()); setAddOpen(true); };
  const openEdit = (doc) => { setFormDraft({ ...doc }); setEditTarget(doc.id); };

  const handleSaveAdd = () => {
    if (!formDraft.title.trim()) return;
    const cat = DOC_CATEGORY_OPTIONS.find(c => c.value === formDraft.category);
    addDocument({ ...formDraft, categoryLabel: cat?.label || formDraft.category, color: cat?.color || '#4e8ef7' });
    setAddOpen(false);
  };

  const handleSaveEdit = () => {
    if (!formDraft.title.trim() || !editTarget) return;
    const cat = DOC_CATEGORY_OPTIONS.find(c => c.value === formDraft.category);
    updateDocument(editTarget, { ...formDraft, categoryLabel: cat?.label || formDraft.category, color: cat?.color || '#4e8ef7' });
    setEditTarget(null);
  };

  const toggleVis = (doc) => updateDocument(doc.id, { visibility: doc.visibility === 'public' ? 'private' : 'public' });

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Documents ({documents.length})</h3>
          <AdminVisibilityBadge visibility={sections?.documents || 'public'} interactive onToggle={() => toggleSectionVisibility('documents')} />
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}><FaPlus /> Add Document</button>
      </div>

      <div className="items-list">
        {documents.map((doc, idx) => (
          <div key={doc.id} className={`item-row ${doc.visibility === 'private' ? 'is-private' : ''}`}>
            <div className="item-row-thumb">
              {doc.image ? <img src={encodeURI(doc.image)} alt={doc.title} className="item-thumb-img" onError={e=>e.target.style.display='none'} /> : <div className="item-thumb-placeholder">📄</div>}
            </div>
            <div className="item-row-info">
              <span className="item-row-name">{doc.title}</span>
              <span className="item-meta-badge" style={{ color: doc.color }}>{doc.categoryLabel}</span>
            </div>
            <div className="item-row-actions">
              <AdminVisibilityBadge visibility={doc.visibility || 'public'} interactive size="sm" onToggle={() => toggleVis(doc)} />
              <button className="admin-icon-btn" onClick={() => reorderDocuments(idx, idx - 1)} disabled={idx === 0}><FaChevronUp /></button>
              <button className="admin-icon-btn" onClick={() => reorderDocuments(idx, idx + 1)} disabled={idx === documents.length - 1}><FaChevronDown /></button>
              <button className="admin-icon-btn" onClick={() => openEdit(doc)}><FaEdit /></button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteTarget(doc)}><FaTrash /></button>
            </div>
          </div>
        ))}
        {!documents.length && <div className="empty-state">No documents yet.</div>}
      </div>

      {/* Add/Edit Modal */}
      <AdminModalForm isOpen={addOpen || !!editTarget} title={editTarget ? 'Edit Document' : 'Add Document'} onClose={() => { setAddOpen(false); setEditTarget(null); }} onSubmit={editTarget ? handleSaveEdit : handleSaveAdd}>
        <div className="admin-input-group">
          <label>Document Title *</label>
          <input type="text" className="admin-input-control" value={formDraft.title || ''} onChange={(e) => setFormDraft({ ...formDraft, title: e.target.value })} placeholder="e.g. Education Certificate 1" autoFocus />
        </div>
        <div className="admin-input-group">
          <label>Category</label>
          <select className="admin-input-control" value={formDraft.category || 'Education'} onChange={(e) => setFormDraft({ ...formDraft, category: e.target.value })}>
            {DOC_CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <AdminImageUploader label="Document Image / Preview" value={formDraft.image || ''} onChange={(val) => setFormDraft({ ...formDraft, image: val })} placeholder="/documents/Education/file.jpg" />
        <div className="admin-input-group">
          <label>Visibility</label>
          <select className="admin-input-control" value={formDraft.visibility || 'public'} onChange={(e) => setFormDraft({ ...formDraft, visibility: e.target.value })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </AdminModalForm>

      <AdminDeleteConfirmModal isOpen={!!deleteTarget} title={`Delete "${deleteTarget?.title}"`} message="Delete this document permanently?" onConfirm={() => { deleteDocument(deleteTarget.id); setDeleteTarget(null); }} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
