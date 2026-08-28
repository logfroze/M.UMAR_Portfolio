import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaPlus, FaTimes, FaStar, FaPaperPlane } from 'react-icons/fa';
import { testimonials as staticTestimonials } from '../data/testimonials';
import './Testimonials.css';

const STORAGE_KEY = 'alan_portfolio_reviews';

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || '')
    .join('');
}

export default function Testimonials() {
  const [userReviews, setUserReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5 });
  const [errors, setErrors] = useState({});

  const allTestimonials = [...staticTestimonials, ...userReviews];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
  }, [userReviews]);

  // Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name = 'Name is required';
    if (!form.role.trim())       e.role = 'Your role / relation is required';
    if (form.text.trim().length < 20) e.text = 'Review must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      role: form.role.trim(),
      text: form.text.trim(),
      rating: form.rating,
      avatar: getInitials(form.name.trim()),
      isUserReview: true,
    };
    setUserReviews(prev => [...prev, newReview]);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setForm({ name: '', role: '', text: '', rating: 5 });
      setErrors({});
    }, 1800);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setForm({ name: '', role: '', text: '', rating: 5 });
    setErrors({});
  };

  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Feedback from clients and collaborators I've had the pleasure of working with.
          </p>
        </motion.div>

        {/* ── Review Cards Grid ── */}
        <div className="testimonials-grid">
          {allTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className={`testimonial-card card-base ${t.isUserReview ? 'testimonial-card--user' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <FaQuoteLeft className="testimonial-quote-icon" />

              {/* Star Rating (for user reviews) */}
              {t.isUserReview && t.rating && (
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <FaStar
                      key={si}
                      className={si < t.rating ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                </div>
              )}

              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <h4 className="testimonial-name">{t.name}</h4>
                  <span className="testimonial-role">{t.role}</span>
                </div>
                {t.isUserReview && (
                  <span className="testimonial-user-badge">Public Review</span>
                )}
              </div>
            </motion.div>
          ))}

          {/* ── Add Review Card (always last) ── */}
          <motion.button
            className="testimonial-add-card card-base"
            onClick={() => setShowModal(true)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: allTestimonials.length * 0.08, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
          >
            <div className="testimonial-add-inner">
              <div className="testimonial-add-icon">
                <FaPlus />
              </div>
              <h4 className="testimonial-add-label">Leave a Review</h4>
              <p className="testimonial-add-hint">Worked with me? Share your experience.</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* ── Add Review Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="review-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="review-modal"
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="review-modal-header">
                <div>
                  <h3 className="review-modal-title">Leave a Review</h3>
                  <p className="review-modal-sub">Your feedback will appear publicly on this portfolio.</p>
                </div>
                <button className="review-modal-close" onClick={closeModal} aria-label="Close">
                  <FaTimes />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    className="review-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="review-success-icon">🎉</div>
                    <h4>Thank you for your review!</h4>
                    <p>It has been added to the testimonials.</p>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    className="review-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Star Rating Picker */}
                    <div className="review-field">
                      <label className="review-label">Your Rating</label>
                      <div className="review-star-picker">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <button
                            type="button"
                            key={si}
                            className={`review-star-btn ${si < form.rating ? 'active' : ''}`}
                            onClick={() => setForm(f => ({ ...f, rating: si + 1 }))}
                          >
                            <FaStar />
                          </button>
                        ))}
                        <span className="review-star-label">{form.rating}/5</span>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="review-field">
                      <label className="review-label" htmlFor="rv-name">Your Name</label>
                      <input
                        id="rv-name"
                        className={`review-input ${errors.name ? 'review-input--error' : ''}`}
                        type="text"
                        placeholder="e.g. John Smith"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        maxLength={60}
                      />
                      {errors.name && <span className="review-error">{errors.name}</span>}
                    </div>

                    {/* Role */}
                    <div className="review-field">
                      <label className="review-label" htmlFor="rv-role">Your Role / Relation</label>
                      <input
                        id="rv-role"
                        className={`review-input ${errors.role ? 'review-input--error' : ''}`}
                        type="text"
                        placeholder="e.g. Client · Fashion Brand Owner"
                        value={form.role}
                        onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                        maxLength={80}
                      />
                      {errors.role && <span className="review-error">{errors.role}</span>}
                    </div>

                    {/* Review Text */}
                    <div className="review-field">
                      <label className="review-label" htmlFor="rv-text">Your Review</label>
                      <textarea
                        id="rv-text"
                        className={`review-textarea ${errors.text ? 'review-input--error' : ''}`}
                        placeholder="Share your experience working with Alan..."
                        value={form.text}
                        onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                        rows={4}
                        maxLength={600}
                      />
                      <span className="review-char-count">{form.text.length}/600</span>
                      {errors.text && <span className="review-error">{errors.text}</span>}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="review-submit-btn">
                      <FaPaperPlane />
                      <span>Submit Review</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
