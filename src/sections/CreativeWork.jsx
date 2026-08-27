import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaVideo, FaCamera, FaInstagram, FaTimes } from 'react-icons/fa';
import { MdDesignServices, MdBrush } from 'react-icons/md';
import './CreativeWork.css';

const creativeItems = [
  { id: 1, title: 'Brand Identity Design', category: 'Graphic Design', icon: MdDesignServices, color: '#58a6ff' },
  { id: 2, title: 'Event Poster Series', category: 'Poster Design', icon: MdBrush, color: '#f78166' },
  { id: 5, title: 'Promotional Video', category: 'Video Editing', icon: FaVideo, color: '#f85149', link: 'https://drive.google.com/drive/folders/1wTITfthiS7d0Fr1p7MqW8nLs5Q42rsZQ?usp=sharing' },
  { id: 6, title: 'Logo Collection', category: 'Graphic Design', icon: FaPalette, color: '#d29922' },
  { id: 8, title: 'Motion Graphics', category: 'Video Editing', icon: FaVideo, color: '#e055a3', link: 'https://drive.google.com/drive/folders/1wTITfthiS7d0Fr1p7MqW8nLs5Q42rsZQ?usp=sharing' },
  { id: 9, title: 'Thumbnail Designs', category: 'Social Media', icon: FaInstagram, color: '#58a6ff' },
];

export default function CreativeWork() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="creative" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Creative Work</span>
          <h2 className="section-title">Design & Visual Content</h2>
          <p className="section-subtitle">
            Showcasing graphic design, poster design, social media content, and video editing work.
          </p>
        </motion.div>

        <div className="creative-grid">
          {creativeItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`creative-card ${i === 0 || i === 3 ? 'creative-card-lg' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setLightbox(item)}
            >
              <div className="creative-card-bg" style={{ background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)` }}>
                <item.icon className="creative-card-icon" style={{ color: item.color }} />
              </div>
              <div className="creative-card-overlay">
                <span className="creative-card-category">{item.category}</span>
                <h4 className="creative-card-title">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="creative-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="creative-lightbox-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={e => e.stopPropagation()}
              >
                <button className="lightbox-close" onClick={() => setLightbox(null)}><FaTimes /></button>
                <div className="lightbox-preview" style={{ background: `linear-gradient(135deg, ${lightbox.color}20, ${lightbox.color}08)` }}>
                  <lightbox.icon style={{ color: lightbox.color, fontSize: '4rem' }} />
                </div>
                <div className="lightbox-info">
                  <span className="creative-card-category">{lightbox.category}</span>
                  <h3>{lightbox.title}</h3>
                  <p>
                    {lightbox.category === 'Video Editing' 
                      ? 'Click the link below to view my complete video editing portfolio on Google Drive.'
                      : 'This is a sample creative work placeholder. Actual design work will be showcased here with full-resolution previews.'}
                  </p>
                  {lightbox.link && (
                    <a 
                      href={lightbox.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn mt-3"
                      style={{
                        display: 'inline-block',
                        background: lightbox.color,
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        marginTop: '15px'
                      }}
                    >
                      View on Google Drive
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
