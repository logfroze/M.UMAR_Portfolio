import React, { useEffect } from 'react';
import { usePortfolioData } from '../context/AdminDataContext';
import { FaShieldAlt, FaThLarge, FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';
import './AdminBar.css';

export default function AdminBar() {
  const {
    isAdmin,
    adminSession,
    openDashboard,
    openLogoutModal,
    previewAsVisitor,
    togglePreviewAsVisitor,
    notification,
  } = usePortfolioData();

  // Toggle body class so navbar + content shift down when admin bar is visible
  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add('admin-mode-active');
    } else {
      document.body.classList.remove('admin-mode-active');
    }
    return () => document.body.classList.remove('admin-mode-active');
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <>
      <div className="admin-bar">
        <div className="admin-bar-left">
          <div className="admin-bar-status">
            <FaShieldAlt className="admin-bar-shield-icon" />
            <span className="admin-bar-label">ADMIN MODE</span>
          </div>
          {adminSession?.loginTime && (
            <span className="admin-bar-session-hint">
              Session active
            </span>
          )}
        </div>

        <div className="admin-bar-right">
          <button
            className={`admin-bar-btn admin-bar-btn--preview ${previewAsVisitor ? 'active' : ''}`}
            onClick={togglePreviewAsVisitor}
            title={previewAsVisitor ? 'Exit visitor preview — show all items' : 'Preview as visitor — hide private items'}
          >
            {previewAsVisitor ? <FaEyeSlash /> : <FaEye />}
            <span>{previewAsVisitor ? 'Exit Preview' : 'Visitor Preview'}</span>
          </button>

          <button
            className="admin-bar-btn admin-bar-btn--dashboard"
            onClick={openDashboard}
            title="Open CMS Dashboard"
          >
            <FaThLarge />
            <span>Dashboard</span>
          </button>

          <button
            className="admin-bar-btn admin-bar-btn--logout"
            onClick={openLogoutModal}
            title="Logout from Admin Mode"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Toast notifications */}
      {notification && (
        <div className={`admin-toast admin-toast--${notification.type || 'success'}`} key={notification.id}>
          <span>{notification.message}</span>
        </div>
      )}
    </>
  );
}
