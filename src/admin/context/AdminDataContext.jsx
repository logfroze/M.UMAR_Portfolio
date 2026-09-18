import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  exportPortfolioData,
  importPortfolioData,
} from '../data/portfolioStorage';
import {
  isAdminAuthenticated,
  getAdminSession,
  setAdminSession,
  clearAdminSession,
} from '../auth/adminSession';

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [data, setData] = useState(() => loadPortfolioData());
  const [isAdmin, setIsAdmin] = useState(() => isAdminAuthenticated());
  const [adminSession, setAdminSessionState] = useState(() => getAdminSession());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [previewAsVisitor, setPreviewAsVisitor] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync state with storage helper
  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      savePortfolioData(next);
      return next;
    });
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification((n) => (n && n.message === message ? null : n));
    }, 3500);
  }, []);

  // Auth operations
  const loginSuccess = useCallback((userMeta = {}) => {
    setAdminSession(userMeta);
    setIsAdmin(true);
    setAdminSessionState(getAdminSession());
    setAuthModalOpen(false);
    setDashboardOpen(true);
    showToast('Authenticated as Administrator. Welcome, Alan!');
  }, [showToast]);

  const logoutSuccess = useCallback(() => {
    clearAdminSession();
    setIsAdmin(false);
    setAdminSessionState(null);
    setLogoutModalOpen(false);
    setDashboardOpen(false);
    setPreviewAsVisitor(false);
    showToast('Admin session closed successfully.', 'info');
  }, [showToast]);

  // Section Visibility
  const toggleSectionVisibility = useCallback((sectionKey) => {
    updateData((prev) => {
      const current = prev.sections?.[sectionKey] || 'public';
      const next = current === 'public' ? 'private' : 'public';
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionKey]: next,
        },
      };
    });
  }, [updateData]);

  // Hero / About CRUD
  const updateHeroAbout = useCallback((newHeroAbout) => {
    updateData((prev) => ({
      ...prev,
      heroAbout: {
        ...prev.heroAbout,
        ...newHeroAbout,
      },
    }));
    showToast('Hero & About section updated successfully.');
  }, [updateData, showToast]);

  // Last Updated Date
  const updateLastUpdatedDate = useCallback((newDate) => {
    updateData((prev) => ({
      ...prev,
      lastUpdatedDate: newDate,
    }));
    showToast('Latest portfolio update date saved.');
  }, [updateData, showToast]);

  // Projects CRUD
  const addProject = useCallback((project) => {
    const newId = Date.now();
    const newProject = {
      id: newId,
      name: project.name || 'Untitled Project',
      description: project.description || '',
      category: project.category || 'Websites',
      tech: Array.isArray(project.tech) ? project.tech : (project.tech || '').split(',').map((t) => t.trim()).filter(Boolean),
      github: project.github || '#',
      live: project.live || '#',
      image: project.image || null,
      status: project.status || 'live',
      tag: project.tag || '',
      featured: !!project.featured,
      isNewlyUpdated: project.isNewlyUpdated !== undefined ? !!project.isNewlyUpdated : true,
      visibility: project.visibility || 'public',
    };
    updateData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    showToast(`Project "${newProject.name}" added.`);
  }, [updateData, showToast]);

  const updateProject = useCallback((id, updatedFields) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? {
        ...p,
        ...updatedFields,
        isNewlyUpdated: updatedFields.isNewlyUpdated !== undefined ? !!updatedFields.isNewlyUpdated : true,
      } : p)),
    }));
    showToast('Project updated successfully.');
  }, [updateData, showToast]);

  const toggleProjectNewlyUpdated = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, isNewlyUpdated: !p.isNewlyUpdated } : p
      ),
    }));
    showToast('Project update status toggled.');
  }, [updateData, showToast]);

  const deleteProject = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    showToast('Project deleted.', 'info');
  }, [updateData, showToast]);

  const reorderProjects = useCallback((fromIdx, toIdx) => {
    updateData((prev) => {
      const list = [...prev.projects];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return { ...prev, projects: list };
    });
  }, [updateData]);

  // Skills CRUD
  const updateSkillsData = useCallback((newSkills) => {
    updateData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
    showToast('Skills updated successfully.');
  }, [updateData, showToast]);

  // Internships CRUD (Hierarchical)
  const updateInternships = useCallback((newInternships) => {
    updateData((prev) => ({
      ...prev,
      internships: newInternships,
    }));
    showToast('Internships updated successfully.');
  }, [updateData, showToast]);

  const addInternshipProvider = useCallback((provider) => {
    const newProvider = {
      id: `provider-${Date.now()}`,
      company: provider.company || 'New Provider',
      role: provider.role || 'Software Engineering Intern',
      duration: provider.duration || '',
      durationLabel: provider.durationLabel || '',
      type: provider.type || 'Online / Remote',
      status: provider.status || 'Completed',
      description: provider.description || '',
      metrics: provider.metrics || [],
      visibility: provider.visibility || 'public',
      programs: provider.programs || [],
    };
    updateData((prev) => ({
      ...prev,
      internships: [...prev.internships, newProvider],
    }));
    showToast(`Provider "${newProvider.company}" added.`);
  }, [updateData, showToast]);

  const updateInternshipProvider = useCallback((providerId, updated) => {
    updateData((prev) => ({
      ...prev,
      internships: prev.internships.map((p) => (p.id === providerId ? { ...p, ...updated } : p)),
    }));
    showToast('Internship provider updated.');
  }, [updateData, showToast]);

  const deleteInternshipProvider = useCallback((providerId) => {
    updateData((prev) => ({
      ...prev,
      internships: prev.internships.filter((p) => p.id !== providerId),
    }));
    showToast('Internship provider deleted.', 'info');
  }, [updateData, showToast]);

  // Documents CRUD
  const addDocument = useCallback((doc) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: doc.title || 'Untitled Document',
      category: doc.category || 'Education',
      categoryLabel: doc.categoryLabel || doc.category || 'Document',
      image: doc.image || '',
      color: doc.color || '#4e8ef7',
      visibility: doc.visibility || 'public',
    };
    updateData((prev) => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
    }));
    showToast(`Document "${newDoc.title}" added.`);
  }, [updateData, showToast]);

  const updateDocument = useCallback((id, updatedFields) => {
    updateData((prev) => ({
      ...prev,
      documents: prev.documents.map((d) => (d.id === id ? { ...d, ...updatedFields } : d)),
    }));
    showToast('Document updated successfully.');
  }, [updateData, showToast]);

  const deleteDocument = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.id !== id),
    }));
    showToast('Document deleted.', 'info');
  }, [updateData, showToast]);

  const reorderDocuments = useCallback((fromIdx, toIdx) => {
    updateData((prev) => {
      const list = [...prev.documents];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return { ...prev, documents: list };
    });
  }, [updateData]);

  // Creative Work CRUD
  const addCreativeWork = useCallback((item) => {
    const newItem = {
      id: Date.now(),
      title: item.title || 'Untitled Creative Work',
      category: item.category || 'Graphic Design',
      color: item.color || '#58a6ff',
      description: item.description || '',
      images: Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []),
      coverImage: item.coverImage || '',
      driveLink: item.driveLink || '',
      isNewlyUpdated: item.isNewlyUpdated !== undefined ? !!item.isNewlyUpdated : true,
      visibility: item.visibility || 'public',
    };
    updateData((prev) => ({
      ...prev,
      creativeWork: [newItem, ...prev.creativeWork],
    }));
    showToast(`Creative item "${newItem.title}" added.`);
  }, [updateData, showToast]);

  const updateCreativeWork = useCallback((id, updatedFields) => {
    updateData((prev) => ({
      ...prev,
      creativeWork: prev.creativeWork.map((c) => (c.id === id ? {
        ...c,
        ...updatedFields,
        isNewlyUpdated: updatedFields.isNewlyUpdated !== undefined ? !!updatedFields.isNewlyUpdated : c.isNewlyUpdated,
      } : c)),
    }));
    showToast('Creative work updated successfully.');
  }, [updateData, showToast]);

  const toggleCreativeWorkNewlyUpdated = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      creativeWork: prev.creativeWork.map((c) =>
        c.id === id ? { ...c, isNewlyUpdated: !c.isNewlyUpdated } : c
      ),
    }));
    showToast('Creative work update status toggled.');
  }, [updateData, showToast]);

  const deleteCreativeWork = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      creativeWork: prev.creativeWork.filter((c) => c.id !== id),
    }));
    showToast('Creative work deleted.', 'info');
  }, [updateData, showToast]);

  const reorderCreativeWork = useCallback((fromIdx, toIdx) => {
    updateData((prev) => {
      const list = [...prev.creativeWork];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return { ...prev, creativeWork: list };
    });
  }, [updateData]);

  // Writing CRUD
  const addWriting = useCallback((item) => {
    const newItem = {
      id: Date.now(),
      category: item.category || 'Story',
      title: item.title || 'Untitled Writing',
      subtitle: item.subtitle || '',
      status: item.status || 'In Progress',
      summary: item.summary || '',
      pageCount: Number(item.pageCount) || 1,
      pages: Array.isArray(item.pages) ? item.pages : [],
      linkText: item.linkText || 'Read',
      isReadable: !!item.isReadable,
      isNewlyUpdated: item.isNewlyUpdated !== undefined ? !!item.isNewlyUpdated : true,
      visibility: item.visibility || 'public',
    };
    updateData((prev) => ({
      ...prev,
      writings: [newItem, ...prev.writings],
    }));
    showToast(`Writing item "${newItem.title}" added.`);
  }, [updateData, showToast]);

  const updateWriting = useCallback((id, updatedFields) => {
    updateData((prev) => ({
      ...prev,
      writings: prev.writings.map((w) => (w.id === id ? {
        ...w,
        ...updatedFields,
        isNewlyUpdated: updatedFields.isNewlyUpdated !== undefined ? !!updatedFields.isNewlyUpdated : w.isNewlyUpdated,
      } : w)),
    }));
    showToast('Writing updated successfully.');
  }, [updateData, showToast]);

  const toggleWritingNewlyUpdated = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      writings: prev.writings.map((w) =>
        w.id === id ? { ...w, isNewlyUpdated: !w.isNewlyUpdated } : w
      ),
    }));
    showToast('Writing update status toggled.');
  }, [updateData, showToast]);

  const deleteWriting = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      writings: prev.writings.filter((w) => w.id !== id),
    }));
    showToast('Writing deleted.', 'info');
  }, [updateData, showToast]);

  const reorderWritings = useCallback((fromIdx, toIdx) => {
    updateData((prev) => {
      const list = [...prev.writings];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return { ...prev, writings: list };
    });
  }, [updateData]);

  // Timeline CRUD
  const addTimelineItem = useCallback((item) => {
    const newItem = {
      id: `tl-${Date.now()}`,
      year: item.year || String(new Date().getFullYear()),
      title: item.title || 'New Milestone',
      description: item.description || '',
      visibility: item.visibility || 'public',
    };
    updateData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, newItem],
    }));
    showToast(`Timeline event "${newItem.title}" added.`);
  }, [updateData, showToast]);

  const updateTimelineItem = useCallback((id, updatedFields) => {
    updateData((prev) => ({
      ...prev,
      timeline: prev.timeline.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
    }));
    showToast('Timeline updated successfully.');
  }, [updateData, showToast]);

  const deleteTimelineItem = useCallback((id) => {
    updateData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((t) => t.id !== id),
    }));
    showToast('Timeline entry deleted.', 'info');
  }, [updateData, showToast]);

  const reorderTimeline = useCallback((fromIdx, toIdx) => {
    updateData((prev) => {
      const list = [...prev.timeline];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return { ...prev, timeline: list };
    });
  }, [updateData]);

  // Factory reset & Import/Export
  const handleResetData = useCallback(() => {
    const reset = resetPortfolioData();
    setData(reset);
    showToast('All portfolio data restored to factory defaults.', 'info');
  }, [showToast]);

  const handleImportData = useCallback((jsonStr) => {
    const res = importPortfolioData(jsonStr);
    if (res.success) {
      setData(res.data);
      showToast('Portfolio data imported successfully.');
      return true;
    } else {
      showToast(`Import failed: ${res.error}`, 'danger');
      return false;
    }
  }, [showToast]);

  // Active filtered views for public consumption
  const isPublicViewer = !isAdmin || previewAsVisitor;

  const value = {
    // Auth & UI States
    isAdmin,
    adminSession,
    authModalOpen,
    setAuthModalOpen,
    openAuthModal: () => setAuthModalOpen(true),
    closeAuthModal: () => setAuthModalOpen(false),
    logoutModalOpen,
    setLogoutModalOpen,
    openLogoutModal: () => setLogoutModalOpen(true),
    closeLogoutModal: () => setLogoutModalOpen(false),
    dashboardOpen,
    setDashboardOpen,
    openDashboard: () => setDashboardOpen(true),
    closeDashboard: () => setDashboardOpen(false),
    previewAsVisitor,
    setPreviewAsVisitor,
    togglePreviewAsVisitor: () => setPreviewAsVisitor((p) => !p),
    notification,
    showToast,
    loginSuccess,
    logoutSuccess,

    // Raw Data State
    portfolioData: data,
    lastUpdatedDate: data.lastUpdatedDate || 'September 18, 2026',

    // Public / Active Dynamic Data Filters
    isPublicViewer,
    sections: data.sections || {},
    heroAbout: data.heroAbout,
    skills: data.skills,
    projects: isPublicViewer ? (data.projects || []).filter(p => p.visibility !== 'private') : (data.projects || []),
    allProjects: data.projects || [],
    internships: data.internships,
    documents: data.documents,
    creativeWork: isPublicViewer ? (data.creativeWork || []).filter(c => c.visibility !== 'private') : (data.creativeWork || []),
    writings: isPublicViewer ? (data.writings || []).filter(w => w.visibility !== 'private') : (data.writings || []),
    timeline: data.timeline,

    // Mutations
    updateLastUpdatedDate,
    toggleSectionVisibility,
    updateHeroAbout,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    toggleProjectNewlyUpdated,
    updateSkillsData,
    updateInternships,
    addInternshipProvider,
    updateInternshipProvider,
    deleteInternshipProvider,
    addDocument,
    updateDocument,
    deleteDocument,
    reorderDocuments,
    addCreativeWork,
    updateCreativeWork,
    deleteCreativeWork,
    reorderCreativeWork,
    toggleCreativeWorkNewlyUpdated,
    addWriting,
    updateWriting,
    deleteWriting,
    reorderWritings,
    toggleWritingNewlyUpdated,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    reorderTimeline,
    // Timeline aliases used by TimelineEditor
    addTimelineEvent: addTimelineItem,
    updateTimelineEvent: updateTimelineItem,
    deleteTimelineEvent: deleteTimelineItem,
    // Reset / import / export aliases used by AdminDashboard
    resetToDefaults: handleResetData,
    importData: handleImportData,
    exportData: exportPortfolioData,
    notify: showToast,
    handleResetData,
    handleImportData,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function usePortfolioData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within an AdminDataProvider');
  }
  return context;
}
