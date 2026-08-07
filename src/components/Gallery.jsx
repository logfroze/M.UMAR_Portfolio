import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearchPlus } from 'react-icons/fa';
import './Gallery.css';

export default function Gallery({ items, columns = 3 }) {
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);

  return (
    <>
      <div className="gallery-masonry" style={{ '--gallery-cols': columns }} ref={gridRef}>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="gallery-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => setLightbox(item)}
          >
            <div
              className="gallery-item-visual"
              style={{ background: `linear-gradient(135deg, ${item.color}18, ${item.color}08)` }}
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span className="gallery-item-initial" style={{ color: item.color }}>
                  {item.title.charAt(0)}
                </span>
              )}
              <div className="gallery-item-hover-overlay">
                <FaSearchPlus />
              </div>
            </div>
            <div className="gallery-item-info">
              <span className="gallery-item-category">{item.category}</span>
              <h4 className="gallery-item-title">{item.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="gallery-lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="gallery-lightbox-close" onClick={() => setLightbox(null)}>
                <FaTimes />
              </button>
              <div
                className="gallery-lightbox-preview"
                style={{ background: `linear-gradient(135deg, ${lightbox.color}20, ${lightbox.color}08)` }}
              >
                {lightbox.image ? (
                  <img 
                    src={lightbox.image} 
                    alt={lightbox.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} 
                  />
                ) : (
                  <span className="gallery-lightbox-initial" style={{ color: lightbox.color }}>
                    {lightbox.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="gallery-lightbox-info">
                <span className="gallery-item-category">{lightbox.category}</span>
                <h3>{lightbox.title}</h3>
                <p>{lightbox.description || 'Artwork placeholder — full-resolution image will be showcased here.'}</p>
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
                    View Project
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
