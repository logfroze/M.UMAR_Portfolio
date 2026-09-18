import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave } from 'react-icons/fa';
import './AdminModalForm.css';

export default function AdminModalForm({
  isOpen,
  title = 'Edit Item',
  subtitle = '',
  onClose,
  onSubmit,
  children,
  saveLabel = 'Save Changes',
  loading = false,
  maxWidth = '640px',
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="admin-form-overlay" onClick={onClose}>
        <motion.div
          className="admin-form-modal"
          style={{ maxWidth }}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="admin-form-header">
            <div>
              <h3 className="admin-form-title">{title}</h3>
              {subtitle && <p className="admin-form-subtitle">{subtitle}</p>}
            </div>
            <button
              type="button"
              className="admin-form-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Form */}
          <form
            className="admin-form-content"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit && onSubmit(e);
            }}
          >
            <div className="admin-form-body">{children}</div>

            <div className="admin-form-footer">
              <button
                type="button"
                className="admin-form-btn-cancel"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-form-btn-save"
                disabled={loading}
              >
                <FaSave />
                <span>{loading ? 'Saving...' : saveLabel}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
