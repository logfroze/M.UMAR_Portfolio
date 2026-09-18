import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaLock, FaTimes, FaEye, FaEyeSlash, FaExclamationTriangle, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { verifyAdminCredentials } from './adminAuthConfig';
import { usePortfolioData } from '../context/AdminDataContext';
import './AdminAuthModal.css';

export default function AdminAuthModal() {
  const { authModalOpen, closeAuthModal, loginSuccess } = usePortfolioData();

  const [formData, setFormData] = useState({
    primaryEmail: '',
    secondaryEmail: '',
    fullName: '',
    nickname: '',
    pin: '',
    dob: '',
    femaleCat: '',
    maleCat: '',
    favFood: '',
  });

  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const datePickerRef = useRef(null);

  const handleOpenDatePicker = () => {
    if (datePickerRef.current) {
      if (typeof datePickerRef.current.showPicker === 'function') {
        datePickerRef.current.showPicker();
      } else {
        datePickerRef.current.focus();
        datePickerRef.current.click();
      }
    }
  };

  if (!authModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    // Check empty fields
    const empty = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || !formData[key].trim()) {
        empty[key] = 'Required';
      }
    });

    if (Object.keys(empty).length > 0) {
      setFieldErrors(empty);
      setGeneralError('Please fill in all verification credentials.');
      return;
    }

    setLoading(true);

    try {
      const result = await verifyAdminCredentials(formData);
      if (result.success) {
        loginSuccess({
          user: formData.fullName.trim(),
          email: formData.primaryEmail.trim(),
        });
        // Reset form
        setFormData({
          primaryEmail: '',
          secondaryEmail: '',
          fullName: '',
          nickname: '',
          pin: '',
          dob: '',
          femaleCat: '',
          maleCat: '',
          favFood: '',
        });
      } else {
        setGeneralError('Verification failed. One or more credential answers do not match our security records. Please verify and try again.');
        setFieldErrors(result.errors || {});
      }
    } catch (err) {
      console.error('Auth verification error:', err);
      setGeneralError('An unexpected error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="admin-auth-overlay" onClick={closeAuthModal}>
        <motion.div
          className="admin-auth-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="admin-auth-header">
            <div className="admin-auth-title-group">
              <div className="admin-auth-icon-badge">
                <FaShieldAlt />
              </div>
              <div>
                <h2 className="admin-auth-title">Admin Identity Verification</h2>
                <p className="admin-auth-subtitle">
                  Restricted Access · Multi-factor security challenge
                </p>
              </div>
            </div>
            <button
              type="button"
              className="admin-auth-close-btn"
              onClick={closeAuthModal}
              aria-label="Close"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>

          {generalError && (
            <div className="admin-auth-alert admin-auth-alert--danger">
              <FaExclamationTriangle className="admin-auth-alert-icon" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Form */}
          <form className="admin-auth-form" onSubmit={handleSubmit} noValidate>
            <div className="admin-auth-grid">
              {/* Primary Email */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  Primary Email <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="primaryEmail"
                  value={formData.primaryEmail}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.primaryEmail ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Secondary Email */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  Secondary Email <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="secondaryEmail"
                  value={formData.secondaryEmail}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.secondaryEmail ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Full Name */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.fullName ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Nickname */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  Nickname / Alias <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.nickname ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>

              {/* PIN Code */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  PIN Code <span className="req">*</span>
                </label>
                <div className="admin-auth-pin-wrapper">
                  <input
                    type={showPin ? 'text' : 'password'}
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    maxLength={10}
                    className={`admin-auth-input ${fieldErrors.pin ? 'has-error' : ''}`}
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    className="admin-auth-pin-toggle"
                    onClick={() => setShowPin(!showPin)}
                    tabIndex={-1}
                    aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="admin-auth-field">
                <div className="admin-auth-label-row">
                  <label className="admin-auth-label">
                    Date of Birth <span className="req">*</span>
                  </label>
                  <button
                    type="button"
                    className="admin-auth-calendar-link"
                    onClick={handleOpenDatePicker}
                    title="Select from Calendar"
                  >
                    <FaCalendarAlt />
                    <span>Select from Calendar</span>
                  </button>
                </div>
                <div className="admin-auth-dob-wrapper">
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                    className={`admin-auth-input ${fieldErrors.dob ? 'has-error' : ''}`}
                    autoComplete="off"
                    required
                  />
                  <div className="admin-auth-calendar-picker-container">
                    <button
                      type="button"
                      className="admin-auth-dob-btn"
                      onClick={handleOpenDatePicker}
                      tabIndex={-1}
                      title="Open Calendar"
                      aria-label="Open Calendar"
                    >
                      <FaCalendarAlt />
                    </button>
                    <input
                      type="date"
                      ref={datePickerRef}
                      value={/^\d{4}-\d{2}-\d{2}$/.test(formData.dob) ? formData.dob : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setFormData((prev) => ({ ...prev, dob: e.target.value }));
                          if (fieldErrors.dob) {
                            setFieldErrors((prev) => ({ ...prev, dob: '' }));
                          }
                          if (generalError) {
                            setGeneralError('');
                          }
                        }
                      }}
                      className="admin-auth-native-date-trigger"
                      tabIndex={-1}
                      aria-label="Choose date from calendar"
                    />
                  </div>
                </div>
              </div>

              {/* Female Cat Name */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  Female Cat Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="femaleCat"
                  value={formData.femaleCat}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.femaleCat ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Male Cat Name */}
              <div className="admin-auth-field">
                <label className="admin-auth-label">
                  Male Cat Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="maleCat"
                  value={formData.maleCat}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.maleCat ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>

              {/* Favourite Food */}
              <div className="admin-auth-field admin-auth-field--full">
                <label className="admin-auth-label">
                  Favourite Food <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="favFood"
                  value={formData.favFood}
                  onChange={handleChange}
                  className={`admin-auth-input ${fieldErrors.favFood ? 'has-error' : ''}`}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div className="admin-auth-footer">
              <button
                type="button"
                className="admin-auth-btn-secondary"
                onClick={closeAuthModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-auth-btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <FaLock />
                    <span>Authorize &amp; Enter Admin Mode</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
