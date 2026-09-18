import React, { useState } from 'react';
import { FaPlus, FaEdit, FaSave, FaTimes, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import AdminImageUploader from '../components/AdminImageUploader';
import './SectionEditors.css';

const CATEGORIES = ['All', 'Websites', 'Apps', 'Business', 'Portfolio', 'Other'];
const STATUS_OPTIONS = [
  { value: 'live', label: 'Completed / Live' },
  { value: 'coming-soon', label: 'Pending / In Progress' },
];

const emptyProject = () => ({
  name: '',
  description: '',
  category: 'Websites',
  tech: '',
  github: '#',
  live: '#',
  image: null,
  status: 'live',
  tag: '',
  featured: false,
  isNewlyUpdated: true,
  visibility: 'public',
});

export default function ProjectsEditor() {
  const {
    projects: publicProjects,
    allProjects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    toggleProjectNewlyUpdated,
    sections,
    toggleSectionVisibility,
  } = usePortfolioData();

  const projects = allProjects || publicProjects;
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formDraft, setFormDraft] = useState(emptyProject());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd = () => {
    setFormDraft(emptyProject());
    setAddModalOpen(true);
  };

  const openEdit = (project) => {
    setFormDraft({
      ...project,
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech,
    });
    setEditTarget(project.id);
  };

  const handleSaveAdd = () => {
    if (!formDraft.name.trim()) return;
    addProject({
      ...formDraft,
      tech: typeof formDraft.tech === 'string'
        ? formDraft.tech.split(',').map((t) => t.trim()).filter(Boolean)
        : formDraft.tech,
    });
    setAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!formDraft.name.trim() || !editTarget) return;
    updateProject(editTarget, {
      ...formDraft,
      tech: typeof formDraft.tech === 'string'
        ? formDraft.tech.split(',').map((t) => t.trim()).filter(Boolean)
        : formDraft.tech,
    });
    setEditTarget(null);
  };

  const toggleVis = (project) => {
    updateProject(project.id, { visibility: project.visibility === 'public' ? 'private' : 'public' });
  };

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Projects ({projects.length})</h3>
          <AdminVisibilityBadge
            visibility={sections?.projects || 'public'}
            interactive
            onToggle={() => toggleSectionVisibility('projects')}
          />
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openAdd}>
          <FaPlus /> Add New Project
        </button>
      </div>

      <div className="items-list">
        {projects.map((project, idx) => (
          <div key={project.id} className={`item-row ${project.visibility === 'private' ? 'is-private' : ''}`}>
            <div className="item-row-thumb">
              {project.image ? (
                <img src={project.image} alt={project.name} className="item-thumb-img" onError={(e) => e.target.style.display='none'} />
              ) : (
                <div className="item-thumb-placeholder">{(project.name || 'P').charAt(0)}</div>
              )}
            </div>
            <div className="item-row-info">
              <span className="item-row-name">{project.name}</span>
              <div className="item-row-meta">
                <span className="item-meta-badge">{project.category}</span>
                <span className={`item-meta-badge ${project.status === 'live' ? 'badge-green' : 'badge-yellow'}`}>
                  {project.status === 'live' ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
            <div className="item-row-actions">
              <button
                className={`admin-icon-btn ${project.isNewlyUpdated ? 'admin-icon-btn--active-star' : ''}`}
                onClick={() => toggleProjectNewlyUpdated(project.id)}
                title={project.isNewlyUpdated ? 'Marked as Newly Updated (Click to remove star)' : 'Click to mark as Newly Updated (Show star)'}
                style={{
                  border: project.isNewlyUpdated ? '1px solid rgba(255, 215, 0, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: project.isNewlyUpdated ? 'rgba(255, 215, 0, 0.18)' : 'transparent',
                }}
              >
                <img
                  src="/Update_star.png"
                  alt="Update Star"
                  style={{
                    width: '16px',
                    height: '16px',
                    objectFit: 'contain',
                    filter: project.isNewlyUpdated ? 'drop-shadow(0 0 5px #ffd700)' : 'grayscale(1) opacity(0.3)',
                  }}
                />
              </button>
              <AdminVisibilityBadge
                visibility={project.visibility || 'public'}
                interactive
                size="sm"
                onToggle={() => toggleVis(project)}
              />
              <button className="admin-icon-btn" onClick={() => reorderProjects(idx, idx - 1)} title="Move Up" disabled={idx === 0}><FaChevronUp /></button>
              <button className="admin-icon-btn" onClick={() => reorderProjects(idx, idx + 1)} title="Move Down" disabled={idx === projects.length - 1}><FaChevronDown /></button>
              <button className="admin-icon-btn" onClick={() => openEdit(project)} title="Edit"><FaEdit /></button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteTarget(project)} title="Delete"><FaTrash /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="empty-state">No projects yet. Click "Add New Project" to start.</div>
        )}
      </div>

      {/* Add Modal */}
      <AdminModalForm
        isOpen={addModalOpen}
        title="Add New Project"
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleSaveAdd}
        saveLabel="Add Project"
        maxWidth="680px"
      >
        <ProjectForm draft={formDraft} setDraft={setFormDraft} />
      </AdminModalForm>

      {/* Edit Modal */}
      <AdminModalForm
        isOpen={!!editTarget}
        title="Edit Project"
        onClose={() => setEditTarget(null)}
        onSubmit={handleSaveEdit}
        saveLabel="Save Changes"
        maxWidth="680px"
      >
        <ProjectForm draft={formDraft} setDraft={setFormDraft} />
      </AdminModalForm>

      {/* Delete Confirm */}
      <AdminDeleteConfirmModal
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}"`}
        message="Are you sure you want to permanently delete this project? This cannot be undone."
        onConfirm={() => { deleteProject(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

function ProjectForm({ draft, setDraft }) {
  return (
    <>
      <div className="admin-grid-2">
        <div className="admin-input-group">
          <label>Project Name *</label>
          <input type="text" className="admin-input-control" value={draft.name || ''} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Project title" />
        </div>
        <div className="admin-input-group">
          <label>Category</label>
          <select className="admin-input-control" value={draft.category || 'Websites'} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="admin-input-group">
        <label>Description</label>
        <textarea className="admin-input-control" value={draft.description || ''} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} placeholder="Brief description of the project" />
      </div>
      <div className="admin-input-group">
        <label>Tech Stack (comma separated)</label>
        <input type="text" className="admin-input-control" value={typeof draft.tech === 'string' ? draft.tech : (draft.tech || []).join(', ')} onChange={(e) => setDraft({ ...draft, tech: e.target.value })} placeholder="React, Node.js, Firebase" />
      </div>
      <div className="admin-grid-2">
        <div className="admin-input-group">
          <label>Status</label>
          <select className="admin-input-control" value={draft.status || 'live'} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className="admin-input-group">
          <label>Visibility</label>
          <select className="admin-input-control" value={draft.visibility || 'public'} onChange={(e) => setDraft({ ...draft, visibility: e.target.value })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      <div className="admin-grid-2">
        <div className="admin-input-group">
          <label>GitHub URL</label>
          <input type="url" className="admin-input-control" value={draft.github || ''} onChange={(e) => setDraft({ ...draft, github: e.target.value })} placeholder="https://github.com/..." />
        </div>
        <div className="admin-input-group">
          <label>Live Demo URL</label>
          <input type="url" className="admin-input-control" value={draft.live || ''} onChange={(e) => setDraft({ ...draft, live: e.target.value })} placeholder="https://..." />
        </div>
      </div>
      <div className="admin-input-group">
        <label>Special Tag (optional)</label>
        <input type="text" className="admin-input-control" value={draft.tag || ''} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} placeholder="e.g. My biggest project this far" />
      </div>
      <AdminImageUploader
        label="Preview Image"
        value={draft.image || ''}
        onChange={(val) => setDraft({ ...draft, image: val || null })}
        placeholder="/projects/preview.png"
      />
      <div className="admin-input-group">
        <label>
          <input type="checkbox" checked={!!draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
          {' '} Featured Project (shown prominently at top)
        </label>
      </div>
      <div className="admin-input-group" style={{ marginTop: '4px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={!!draft.isNewlyUpdated}
            onChange={(e) => setDraft({ ...draft, isNewlyUpdated: e.target.checked })}
          />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <img src="/Update_star.png" alt="" style={{ width: '16px', height: '16px' }} />
            Mark as Newly Updated (Show Shiny Update Star Badge on Card)
          </span>
        </label>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '22px', display: 'block', marginTop: '2px' }}>
          When enabled, the shiny neon update star logo will be displayed on the top-right corner of this project card.
        </span>
      </div>
    </>
  );
}
