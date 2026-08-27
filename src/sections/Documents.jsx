import { motion } from 'framer-motion';
import { FaFileAlt, FaFolderOpen } from 'react-icons/fa';
import './Documents.css';

export default function Documents() {
  return (
    <section id="documents" className="section documents-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Documents</span>
          <h2 className="section-title">My Documents</h2>
          <p className="section-subtitle">
            Certificates, academic transcripts, and professional documentation.
          </p>
        </motion.div>

        <motion.div
          className="documents-placeholder-card card-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="documents-placeholder-icon">
            <FaFolderOpen />
          </div>
          <h3 className="documents-placeholder-title">My Documents</h3>
          <p className="documents-placeholder-text">
            Documents and credential files will be displayed here soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
