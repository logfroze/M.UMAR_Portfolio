import React from 'react';
import { FaGlobeAmericas, FaLock } from 'react-icons/fa';
import './AdminVisibilityBadge.css';

export default function AdminVisibilityBadge({
  visibility = 'public',
  onToggle,
  interactive = false,
  size = 'md',
}) {
  const isPublic = visibility === 'public';

  if (!interactive) {
    return (
      <span className={`admin-vis-badge ${isPublic ? 'admin-vis-badge--public' : 'admin-vis-badge--private'} admin-vis-badge--${size}`}>
        {isPublic ? <FaGlobeAmericas /> : <FaLock />}
        <span>{isPublic ? 'PUBLIC' : 'PRIVATE'}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`admin-vis-btn ${isPublic ? 'admin-vis-btn--public' : 'admin-vis-btn--private'} admin-vis-btn--${size}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle && onToggle(isPublic ? 'private' : 'public');
      }}
      title={`Click to switch to ${isPublic ? 'Private' : 'Public'}`}
    >
      {isPublic ? <FaGlobeAmericas /> : <FaLock />}
      <span>{isPublic ? 'PUBLIC' : 'PRIVATE'}</span>
    </button>
  );
}
