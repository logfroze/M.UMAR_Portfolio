import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt, FaLock, FaTimes, FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';
import { verifyPin } from './adminAuthConfig';
import { usePortfolioData } from '../context/AdminDataContext';
import './AdminLogoutModal.css';

export default function AdminLogoutModal() {
  const { logoutModalOpen, closeLogoutModal, logoutSuccess } = usePortfolioData();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!logoutModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!pin.trim()) {
      setError('Please enter your admin PIN.');
      return;
    }

    setLoading(true);
    try {
      const isValid = await verifyPin(pin);
      if (isValid) {
        setPin('');
        logoutSuccess();
      } else {
        setError('Incorrect PIN. Logout authorization failed.');
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('Verification error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="admin-logout-overlay" onClick={closeLogoutModal}>
        <motion.div
          className="admin-logout-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="admin-logout-header">
            <div className="admin-logout-title-group">
              <div className="admin-logout-icon-badge">
                <FaSignOutAlt />
              </div>
              <div>
                <h3 className="admin-logout-title">Confirm Admin Logout</h3>
                <p className="admin-logout-subtitle">
                  Enter your Security PIN to terminate this session
                </p>
              </div>
            </div>
            <button
              type="button"
              className="admin-logout-close-btn"
              onClick={closeLogoutModal}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="admin-logout-body">
            {error && (
              <div className="admin-logout-error">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            )}

            <div className="admin-logout-field">
              <label className="admin-logout-label">Security PIN Code</label>
              <div className="admin-logout-pin-wrapper">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter PIN (211817)"
                  maxLength={10}
                  className="admin-logout-input"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className="admin-logout-pin-toggle"
                  onClick={() => setShowPin(!showPin)}
                  tabIndex={-1}
                  aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  {showPin ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="admin-logout-actions">
              <button
                type="button"
                className="admin-logout-btn-cancel"
                onClick={closeLogoutModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-logout-btn-submit"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify PIN & Logout'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
