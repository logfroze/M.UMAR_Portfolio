import React, { useState } from 'react';
import { FaPlus, FaEdit, FaSave, FaTimes, FaTrash, FaChevronDown, FaChevronUp, FaChevronRight } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import AdminImageUploader from '../components/AdminImageUploader';
import './SectionEditors.css';

const emptyProvider = () => ({
  company: '',
  role: 'Software Engineering Intern',
  duration: '',
  durationLabel: '',
  type: 'Online / Remote',
  status: 'Completed',
  description: '',
  metrics: [],
  visibility: 'public',
  programs: [],
});

const emptyProgram = () => ({
  id: `prog-${Date.now()}`,
  label: '',
  icon: 'FaCode',
  visibility: 'public',
  projects: [],
});

const emptyProject = () => ({
  id: `proj-${Date.now()}`,
  name: '',
  program: '',
  programId: '',
  description: '',
  tech: '',
  image: '',
  github: '',
  live: '',
  status: 'live',
  visibility: 'public',
});

export default function InternshipsEditor() {
  const { internships, addInternshipProvider, updateInternshipProvider, deleteInternshipProvider, updateInternships, sections, toggleSectionVisibility } = usePortfolioData();

  const [addProviderOpen, setAddProviderOpen] = useState(false);
  const [editProviderTarget, setEditProviderTarget] = useState(null);
  const [providerDraft, setProviderDraft] = useState(emptyProvider());
  const [deleteProviderTarget, setDeleteProviderTarget] = useState(null);

  const [expandedProvider, setExpandedProvider] = useState(null);

  // Program modal
  const [addProgramModal, setAddProgramModal] = useState(null); // { providerId }
  const [editProgramModal, setEditProgramModal] = useState(null); // { providerId, programIdx }
  const [programDraft, setProgramDraft] = useState(emptyProgram());
  const [deleteProgramTarget, setDeleteProgramTarget] = useState(null);

  // Project modal
  const [addProjectModal, setAddProjectModal] = useState(null); // { providerId, programIdx }
  const [editProjectModal, setEditProjectModal] = useState(null);
  const [projectDraft, setProjectDraft] = useState(emptyProject());
  const [deleteProjectTarget, setDeleteProjectTarget] = useState(null);

  // Helpers
  const findProviderIdx = (id) => internships.findIndex((p) => p.id === id);

  const mutate = (updater) => {
    const next = updater(JSON.parse(JSON.stringify(internships)));
    updateInternships(next);
  };

  // Provider actions
  const handleSaveProvider = () => {
    if (editProviderTarget) {
      updateInternshipProvider(editProviderTarget, providerDraft);
      setEditProviderTarget(null);
    } else {
      addInternshipProvider(providerDraft);
      setAddProviderOpen(false);
    }
    setProviderDraft(emptyProvider());
  };

  const handleDeleteProvider = () => {
    deleteInternshipProvider(deleteProviderTarget.id);
    setDeleteProviderTarget(null);
  };

  const toggleProviderVis = (provider) => {
    updateInternshipProvider(provider.id, { visibility: provider.visibility === 'public' ? 'private' : 'public' });
  };

  // Program actions
  const saveProgram = () => {
    if (editProgramModal) {
      const { providerId, programIdx } = editProgramModal;
      mutate((data) => {
        const pIdx = data.findIndex((p) => p.id === providerId);
        if (pIdx === -1) return data;
        data[pIdx].programs[programIdx] = { ...data[pIdx].programs[programIdx], ...programDraft };
        return data;
      });
      setEditProgramModal(null);
    } else if (addProgramModal) {
      const { providerId } = addProgramModal;
      const newProg = { ...programDraft, id: `prog-${Date.now()}` };
      mutate((data) => {
        const pIdx = data.findIndex((p) => p.id === providerId);
        if (pIdx === -1) return data;
        data[pIdx].programs = [...(data[pIdx].programs || []), newProg];
        return data;
      });
      setAddProgramModal(null);
    }
    setProgramDraft(emptyProgram());
  };

  const deleteProgram = () => {
    const { providerId, programIdx } = deleteProgramTarget;
    mutate((data) => {
      const pIdx = data.findIndex((p) => p.id === providerId);
      if (pIdx === -1) return data;
      data[pIdx].programs.splice(programIdx, 1);
      return data;
    });
    setDeleteProgramTarget(null);
  };

  // Project actions
  const saveProject = () => {
    const techArr = typeof projectDraft.tech === 'string'
      ? projectDraft.tech.split(',').map((t) => t.trim()).filter(Boolean)
      : projectDraft.tech;

    if (editProjectModal) {
      const { providerId, programIdx, projectIdx } = editProjectModal;
      mutate((data) => {
        const pIdx = data.findIndex((p) => p.id === providerId);
        if (pIdx === -1) return data;
        data[pIdx].programs[programIdx].projects[projectIdx] = {
          ...data[pIdx].programs[programIdx].projects[projectIdx],
          ...projectDraft,
          tech: techArr,
        };
        return data;
      });
      setEditProjectModal(null);
    } else if (addProjectModal) {
      const { providerId, programIdx } = addProjectModal;
      const prog = internships.find((p) => p.id === providerId)?.programs[programIdx];
      const newProj = {
        ...projectDraft,
        id: `proj-${Date.now()}`,
        program: prog?.label || '',
        programId: prog?.id || '',
        tech: techArr,
      };
      mutate((data) => {
        const pIdx = data.findIndex((p) => p.id === providerId);
        if (pIdx === -1) return data;
        data[pIdx].programs[programIdx].projects = [...(data[pIdx].programs[programIdx].projects || []), newProj];
        return data;
      });
      setAddProjectModal(null);
    }
    setProjectDraft(emptyProject());
  };

  const deleteInternProject = () => {
    const { providerId, programIdx, projectIdx } = deleteProjectTarget;
    mutate((data) => {
      const pIdx = data.findIndex((p) => p.id === providerId);
      if (pIdx === -1) return data;
      data[pIdx].programs[programIdx].projects.splice(projectIdx, 1);
      return data;
    });
    setDeleteProjectTarget(null);
  };

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Internships</h3>
          <AdminVisibilityBadge visibility={sections?.internships || 'public'} interactive onToggle={() => toggleSectionVisibility('internships')} />
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => { setProviderDraft(emptyProvider()); setAddProviderOpen(true); }}>
          <FaPlus /> Add Provider
        </button>
      </div>

      {/* Provider List */}
      {internships.map((provider) => (
        <div key={provider.id} className={`internship-provider-block ${provider.visibility === 'private' ? 'is-private' : ''}`}>
          <div className="internship-provider-header">
            <button
              className="internship-provider-toggle"
              onClick={() => setExpandedProvider(expandedProvider === provider.id ? null : provider.id)}
            >
              {expandedProvider === provider.id ? <FaChevronUp /> : <FaChevronRight />}
              <span className="internship-provider-name">{provider.company}</span>
              <span className="internship-provider-meta">{provider.role} · {provider.durationLabel || provider.duration}</span>
            </button>
            <div className="internship-provider-actions">
              <AdminVisibilityBadge visibility={provider.visibility || 'public'} interactive size="sm" onToggle={() => toggleProviderVis(provider)} />
              <button className="admin-icon-btn" onClick={() => { setProviderDraft({ ...provider }); setEditProviderTarget(provider.id); }} title="Edit Provider"><FaEdit /></button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteProviderTarget(provider)} title="Delete Provider"><FaTrash /></button>
            </div>
          </div>

          {expandedProvider === provider.id && (
            <div className="internship-programs-area">
              <div className="internship-programs-header">
                <span className="internship-programs-title">Programs ({provider.programs?.length || 0})</span>
                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => { setProgramDraft(emptyProgram()); setAddProgramModal({ providerId: provider.id }); }}>
                  <FaPlus /> Add Program
                </button>
              </div>

              {(provider.programs || []).map((program, progIdx) => (
                <div key={program.id} className={`internship-program-block ${program.visibility === 'private' ? 'is-private' : ''}`}>
                  <div className="internship-program-header">
                    <span className="internship-program-name">{program.label}</span>
                    <div className="internship-program-actions">
                      <AdminVisibilityBadge
                        visibility={program.visibility || 'public'}
                        interactive
                        size="sm"
                        onToggle={() => mutate((data) => {
                          const pIdx = data.findIndex((p) => p.id === provider.id);
                          if (pIdx !== -1) data[pIdx].programs[progIdx].visibility = data[pIdx].programs[progIdx].visibility === 'public' ? 'private' : 'public';
                          return data;
                        })}
                      />
                      <button className="admin-icon-btn" onClick={() => { setProgramDraft({ ...program }); setEditProgramModal({ providerId: provider.id, programIdx: progIdx }); }}><FaEdit /></button>
                      <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteProgramTarget({ providerId: provider.id, programIdx: progIdx, name: program.label })}><FaTrash /></button>
                    </div>
                  </div>

                  {/* Projects in this program */}
                  <div className="internship-projects-list">
                    {(program.projects || []).map((proj, projIdx) => (
                      <div key={proj.id} className={`item-row item-row--compact ${proj.visibility === 'private' ? 'is-private' : ''}`}>
                        <div className="item-row-info">
                          <span className="item-row-name">{proj.name}</span>
                        </div>
                        <div className="item-row-actions">
                          <AdminVisibilityBadge
                            visibility={proj.visibility || 'public'}
                            interactive
                            size="sm"
                            onToggle={() => mutate((data) => {
                              const pIdx = data.findIndex((p) => p.id === provider.id);
                              if (pIdx !== -1) data[pIdx].programs[progIdx].projects[projIdx].visibility = data[pIdx].programs[progIdx].projects[projIdx].visibility === 'public' ? 'private' : 'public';
                              return data;
                            })}
                          />
                          <button className="admin-icon-btn" onClick={() => { setProjectDraft({ ...proj, tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech }); setEditProjectModal({ providerId: provider.id, programIdx: progIdx, projectIdx: projIdx }); }}><FaEdit /></button>
                          <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteProjectTarget({ providerId: provider.id, programIdx: progIdx, projectIdx: projIdx, name: proj.name })}><FaTrash /></button>
                        </div>
                      </div>
                    ))}
                    <button className="admin-btn admin-btn--ghost admin-btn--xs" onClick={() => { setProjectDraft(emptyProject()); setAddProjectModal({ providerId: provider.id, programIdx: progIdx }); }}>
                      <FaPlus /> Add Project to {program.label}
                    </button>
                  </div>
                </div>
              ))}
              {!provider.programs?.length && <p className="empty-state empty-state--sm">No programs yet. Add one above.</p>}
            </div>
          )}
        </div>
      ))}

      {!internships.length && <div className="empty-state">No internship providers yet.</div>}

      {/* Provider Modal */}
      <AdminModalForm isOpen={addProviderOpen || !!editProviderTarget} title={editProviderTarget ? 'Edit Provider' : 'Add Internship Provider'} onClose={() => { setAddProviderOpen(false); setEditProviderTarget(null); }} onSubmit={handleSaveProvider}>
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>Company Name *</label>
            <input type="text" className="admin-input-control" value={providerDraft.company || ''} onChange={(e) => setProviderDraft({ ...providerDraft, company: e.target.value })} placeholder="e.g. CodeAlpha" />
          </div>
          <div className="admin-input-group">
            <label>Role</label>
            <input type="text" className="admin-input-control" value={providerDraft.role || ''} onChange={(e) => setProviderDraft({ ...providerDraft, role: e.target.value })} />
          </div>
          <div className="admin-input-group">
            <label>Duration</label>
            <input type="text" className="admin-input-control" value={providerDraft.duration || ''} onChange={(e) => setProviderDraft({ ...providerDraft, duration: e.target.value })} placeholder="10 Sep – 10 Oct" />
          </div>
          <div className="admin-input-group">
            <label>Duration Label</label>
            <input type="text" className="admin-input-control" value={providerDraft.durationLabel || ''} onChange={(e) => setProviderDraft({ ...providerDraft, durationLabel: e.target.value })} placeholder="1 Month" />
          </div>
          <div className="admin-input-group">
            <label>Type</label>
            <input type="text" className="admin-input-control" value={providerDraft.type || ''} onChange={(e) => setProviderDraft({ ...providerDraft, type: e.target.value })} placeholder="Online / Remote" />
          </div>
          <div className="admin-input-group">
            <label>Status</label>
            <input type="text" className="admin-input-control" value={providerDraft.status || ''} onChange={(e) => setProviderDraft({ ...providerDraft, status: e.target.value })} placeholder="Completed" />
          </div>
        </div>
        <div className="admin-input-group">
          <label>Description</label>
          <textarea className="admin-input-control" rows={3} value={providerDraft.description || ''} onChange={(e) => setProviderDraft({ ...providerDraft, description: e.target.value })} />
        </div>
        <div className="admin-input-group">
          <label>Visibility</label>
          <select className="admin-input-control" value={providerDraft.visibility || 'public'} onChange={(e) => setProviderDraft({ ...providerDraft, visibility: e.target.value })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </AdminModalForm>

      {/* Program Modal */}
      <AdminModalForm isOpen={!!addProgramModal || !!editProgramModal} title={editProgramModal ? 'Edit Program' : 'Add Program'} onClose={() => { setAddProgramModal(null); setEditProgramModal(null); }} onSubmit={saveProgram}>
        <div className="admin-input-group">
          <label>Program Name *</label>
          <input type="text" className="admin-input-control" value={programDraft.label || ''} onChange={(e) => setProgramDraft({ ...programDraft, label: e.target.value })} placeholder="e.g. Frontend Development" />
        </div>
        <div className="admin-input-group">
          <label>Icon (react-icons)</label>
          <input type="text" className="admin-input-control" value={programDraft.icon || ''} onChange={(e) => setProgramDraft({ ...programDraft, icon: e.target.value })} placeholder="FaLaptopCode" />
        </div>
        <div className="admin-input-group">
          <label>Visibility</label>
          <select className="admin-input-control" value={programDraft.visibility || 'public'} onChange={(e) => setProgramDraft({ ...programDraft, visibility: e.target.value })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </AdminModalForm>

      {/* Project Modal */}
      <AdminModalForm isOpen={!!addProjectModal || !!editProjectModal} title={editProjectModal ? 'Edit Project' : 'Add Project'} onClose={() => { setAddProjectModal(null); setEditProjectModal(null); }} onSubmit={saveProject} maxWidth="640px">
        <div className="admin-input-group">
          <label>Project Name *</label>
          <input type="text" className="admin-input-control" value={projectDraft.name || ''} onChange={(e) => setProjectDraft({ ...projectDraft, name: e.target.value })} />
        </div>
        <div className="admin-input-group">
          <label>Description</label>
          <textarea className="admin-input-control" rows={3} value={projectDraft.description || ''} onChange={(e) => setProjectDraft({ ...projectDraft, description: e.target.value })} />
        </div>
        <div className="admin-input-group">
          <label>Tech Stack (comma separated)</label>
          <input type="text" className="admin-input-control" value={typeof projectDraft.tech === 'string' ? projectDraft.tech : (projectDraft.tech || []).join(', ')} onChange={(e) => setProjectDraft({ ...projectDraft, tech: e.target.value })} placeholder="HTML, CSS, JavaScript" />
        </div>
        <div className="admin-grid-2">
          <div className="admin-input-group">
            <label>GitHub URL</label>
            <input type="text" className="admin-input-control" value={projectDraft.github || ''} onChange={(e) => setProjectDraft({ ...projectDraft, github: e.target.value })} />
          </div>
          <div className="admin-input-group">
            <label>Live URL</label>
            <input type="text" className="admin-input-control" value={projectDraft.live || ''} onChange={(e) => setProjectDraft({ ...projectDraft, live: e.target.value })} />
          </div>
        </div>
        <AdminImageUploader label="Preview Image" value={projectDraft.image || ''} onChange={(val) => setProjectDraft({ ...projectDraft, image: val })} />
        <div className="admin-input-group">
          <label>Visibility</label>
          <select className="admin-input-control" value={projectDraft.visibility || 'public'} onChange={(e) => setProjectDraft({ ...projectDraft, visibility: e.target.value })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </AdminModalForm>

      <AdminDeleteConfirmModal isOpen={!!deleteProviderTarget} title={`Delete "${deleteProviderTarget?.company}"`} message="Delete this entire internship provider and ALL its programs and projects?" onConfirm={handleDeleteProvider} onCancel={() => setDeleteProviderTarget(null)} />
      <AdminDeleteConfirmModal isOpen={!!deleteProgramTarget} title={`Delete program "${deleteProgramTarget?.name}"`} message="Delete this program and all its projects?" onConfirm={deleteProgram} onCancel={() => setDeleteProgramTarget(null)} />
      <AdminDeleteConfirmModal isOpen={!!deleteProjectTarget} title={`Delete "${deleteProjectTarget?.name}"`} message="Delete this project permanently?" onConfirm={deleteInternProject} onCancel={() => setDeleteProjectTarget(null)} />
    </div>
  );
}
