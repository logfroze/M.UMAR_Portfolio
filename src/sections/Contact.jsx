import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp, FaPaperPlane, FaFileDownload, FaFileAlt } from 'react-icons/fa';
import './Contact.css';

const contactLinks = [
  { icon: FaEnvelope, label: 'logfrozeofficial@gmail.com', href: 'mailto:logfrozeofficial@gmail.com', color: '#58a6ff' },
  { icon: FaGithub, label: 'logfrozeofficial', href: 'https://github.com/logfrozeofficial', color: '#f0f6fc' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/logfrozeofficial/', color: '#0a66c2' },
  { icon: FaWhatsapp, label: '+92 329 4102524', href: 'https://wa.me/923294102524', color: '#25d366' },
  { icon: FaFileAlt, label: 'View/Download CV', href: '/M.UMAR_CV.pdf', color: '#ffb000' },
  { icon: FaFileDownload, label: 'View/Download Resume', href: '/UMAR_Resume.pdf', color: '#ff5722' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-info-title">Get in Touch</h3>
            <p className="contact-info-text">
              Whether it's a web development project, design work, content writing, 
              or just a friendly conversation — feel free to reach out.
            </p>

            <div className="contact-links">
              {contactLinks.map((link, i) => (
                <a key={i} href={link.href} className="contact-link-item card-base" target="_blank" rel="noopener noreferrer">
                  <div className="contact-link-icon" style={{ color: link.color }}>
                    <link.icon />
                  </div>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact-form card-base"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
              />
            </div>
            <button type="submit" className="btn-primary-custom contact-submit">
              {submitted ? 'Message Sent! ✓' : <><FaPaperPlane /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
