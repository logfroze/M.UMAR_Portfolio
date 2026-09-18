import React, { useState } from 'react';
import { FaPlus, FaEdit, FaSave, FaTimes, FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { usePortfolioData } from '../context/AdminDataContext';
import AdminVisibilityBadge from '../components/AdminVisibilityBadge';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import AdminModalForm from '../components/AdminModalForm';
import './SectionEditors.css';

const ICON_OPTIONS = [
  'FaHtml5','FaCss3Alt','FaJsSquare','FaReact','FaGitAlt','FaGithub','FaCode','FaFigma','FaNode',
  'SiFirebase','SiCanva','SiNextdotjs','SiTailwindcss','SiLaravel','SiSupabase','SiPostgresql',
  'SiMysql','SiVercel','SiNetlify','SiC','SiCplusplus','SiPython',
  'MdDevices','MdApi','MdBrush','MdDesignServices','MdCampaign','MdArticle','MdRecordVoiceOver',
  'MdAutoStories','MdEdit','MdBrandingWatermark',
];

const emptySkill = () => ({ name: '', icon: 'FaCode', visibility: 'public' });

export default function SkillsEditor() {
  const { skills, updateSkillsData, sections, toggleSectionVisibility } = usePortfolioData();
  const [draft, setDraft] = useState(null);
  const [editing, setEditing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { catIdx, groupIdx, skillIdx }
  const [addSkillForm, setAddSkillForm] = useState(null); // { catIdx, groupIdx }
  const [newSkillDraft, setNewSkillDraft] = useState(emptySkill());

  const startEdit = () => {
    setDraft(JSON.parse(JSON.stringify(skills)));
    setEditing(true);
  };

  const cancel = () => {
    setDraft(null);
    setEditing(false);
  };

  const save = () => {
    updateSkillsData(draft);
    setEditing(false);
    setDraft(null);
  };

  const toggleSkillVisibility = (catIdx, groupIdx, skillIdx) => {
    const d = JSON.parse(JSON.stringify(draft));
    const skillList = groupIdx != null
      ? d[catIdx].subGroups[groupIdx].skills
      : d[catIdx].skills;
    skillList[skillIdx].visibility = skillList[skillIdx].visibility === 'public' ? 'private' : 'public';
    setDraft(d);
  };

  const deleteSkill = (catIdx, groupIdx, skillIdx) => {
    const d = JSON.parse(JSON.stringify(draft));
    if (groupIdx != null) {
      d[catIdx].subGroups[groupIdx].skills.splice(skillIdx, 1);
    } else {
      d[catIdx].skills.splice(skillIdx, 1);
    }
    setDraft(d);
  };

  const addSkill = () => {
    if (!newSkillDraft.name.trim()) return;
    const d = JSON.parse(JSON.stringify(draft));
    const { catIdx, groupIdx } = addSkillForm;
    const skill = { ...newSkillDraft };
    if (groupIdx != null) {
      d[catIdx].subGroups[groupIdx].skills.push(skill);
    } else {
      d[catIdx].skills = [...(d[catIdx].skills || []), skill];
    }
    setDraft(d);
    setNewSkillDraft(emptySkill());
    setAddSkillForm(null);
  };

  const moveSkill = (catIdx, groupIdx, skillIdx, dir) => {
    const d = JSON.parse(JSON.stringify(draft));
    const list = groupIdx != null ? d[catIdx].subGroups[groupIdx].skills : d[catIdx].skills;
    const target = skillIdx + dir;
    if (target < 0 || target >= list.length) return;
    [list[skillIdx], list[target]] = [list[target], list[skillIdx]];
    setDraft(d);
  };

  const renderSkillList = (skillList, catIdx, groupIdx = null) => (
    <div className="skills-editor-list">
      {skillList.map((skill, skillIdx) => (
        <div key={skillIdx} className={`skills-editor-item ${skill.visibility === 'private' ? 'is-private' : ''}`}>
          <div className="skills-editor-item-info">
            <span className="skills-editor-item-name">{skill.name}</span>
            <span className="skills-editor-item-icon">{skill.icon}</span>
          </div>
          <div className="skills-editor-item-actions">
            <AdminVisibilityBadge
              visibility={skill.visibility || 'public'}
              interactive
              size="sm"
              onToggle={() => {
                if (editing) toggleSkillVisibility(catIdx, groupIdx, skillIdx);
              }}
            />
            {editing && (
              <>
                <button className="admin-icon-btn" onClick={() => moveSkill(catIdx, groupIdx, skillIdx, -1)} title="Move Up"><FaChevronUp /></button>
                <button className="admin-icon-btn" onClick={() => moveSkill(catIdx, groupIdx, skillIdx, 1)} title="Move Down"><FaChevronDown /></button>
                <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteTarget({ catIdx, groupIdx, skillIdx })} title="Delete">
                  <FaTrash />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      {editing && (
        <button
          className="admin-btn admin-btn--ghost admin-btn--sm"
          onClick={() => { setAddSkillForm({ catIdx, groupIdx }); setNewSkillDraft(emptySkill()); }}
        >
          <FaPlus /> Add Skill
        </button>
      )}
    </div>
  );

  const displayData = editing ? draft : skills;

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <div className="section-editor-title-row">
          <h3 className="section-editor-title">Skills</h3>
          <AdminVisibilityBadge
            visibility={sections?.skills || 'public'}
            interactive
            onToggle={() => toggleSectionVisibility('skills')}
          />
        </div>
        <div className="section-editor-header-actions">
          {!editing ? (
            <button className="admin-btn admin-btn--primary" onClick={startEdit}>
              <FaEdit /> Manage Skills
            </button>
          ) : (
            <>
              <button className="admin-btn admin-btn--ghost" onClick={cancel}><FaTimes /> Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={save}><FaSave /> Save All</button>
            </>
          )}
        </div>
      </div>

      <div className="skills-categories">
        {(displayData || []).map((cat, catIdx) => (
          <div key={catIdx} className="skills-category-block">
            <div className="skills-category-header">
              <h4 className="skills-category-title">{cat.title}</h4>
              <AdminVisibilityBadge
                visibility={cat.visibility || 'public'}
                interactive={editing}
                size="sm"
                onToggle={() => {
                  if (!editing) return;
                  const d = JSON.parse(JSON.stringify(draft));
                  d[catIdx].visibility = d[catIdx].visibility === 'public' ? 'private' : 'public';
                  setDraft(d);
                }}
              />
            </div>

            {cat.subGroups ? (
              cat.subGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="skills-subgroup-block">
                  <div className="skills-subgroup-label-row">
                    <span className="skills-subgroup-label">{group.label}</span>
                    <AdminVisibilityBadge
                      visibility={group.visibility || 'public'}
                      interactive={editing}
                      size="sm"
                      onToggle={() => {
                        if (!editing) return;
                        const d = JSON.parse(JSON.stringify(draft));
                        d[catIdx].subGroups[groupIdx].visibility = d[catIdx].subGroups[groupIdx].visibility === 'public' ? 'private' : 'public';
                        setDraft(d);
                      }}
                    />
                  </div>
                  {renderSkillList(group.skills, catIdx, groupIdx)}
                </div>
              ))
            ) : (
              renderSkillList(cat.skills || [], catIdx, null)
            )}
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      <AdminModalForm
        isOpen={!!addSkillForm}
        title="Add New Skill"
        onClose={() => setAddSkillForm(null)}
        onSubmit={addSkill}
        saveLabel="Add Skill"
      >
        <div className="admin-input-group">
          <label>Skill Name *</label>
          <input
            type="text"
            className="admin-input-control"
            value={newSkillDraft.name}
            onChange={(e) => setNewSkillDraft({ ...newSkillDraft, name: e.target.value })}
            placeholder="e.g. TypeScript"
            autoFocus
          />
        </div>
        <div className="admin-input-group">
          <label>Icon Name (react-icons key)</label>
          <input
            type="text"
            className="admin-input-control"
            value={newSkillDraft.icon}
            onChange={(e) => setNewSkillDraft({ ...newSkillDraft, icon: e.target.value })}
            placeholder="e.g. SiTypescript"
          />
          <span className="admin-helper-text">Examples: FaReact, SiNextdotjs, MdDevices</span>
        </div>
        <div className="admin-input-group">
          <label>Visibility</label>
          <select
            className="admin-input-control"
            value={newSkillDraft.visibility}
            onChange={(e) => setNewSkillDraft({ ...newSkillDraft, visibility: e.target.value })}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </AdminModalForm>

      {/* Delete Confirm */}
      <AdminDeleteConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
        onConfirm={() => {
          if (deleteTarget) deleteSkill(deleteTarget.catIdx, deleteTarget.groupIdx, deleteTarget.skillIdx);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
