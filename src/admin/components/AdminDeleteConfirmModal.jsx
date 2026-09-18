import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import './AdminDeleteConfirmModal.css';

export default function AdminDeleteConfirmModal({
  isOpen,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="admin-delete-overlay" onClick={onCancel}>
        <motion.div
          className="admin-delete-modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="admin-delete-header">
            <div className="admin-delete-icon">
              <FaExclamationTriangle />
            </div>
            <h3 className="admin-delete-title">{title}</h3>
            <button className="admin-delete-close" onClick={onCancel} aria-label="Close">
              <FaTimes />
            </button>
          </div>

          <div className="admin-delete-body">
            <p>{message}</p>
          </div>

          <div className="admin-delete-footer">
            <button type="button" className="admin-delete-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              className="admin-delete-btn-confirm"
              onClick={() => {
                onConfirm();
                onCancel();
              }}
            >
              <FaTrash />
              <span>Delete Permanently</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
