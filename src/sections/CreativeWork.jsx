import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPalette, FaVideo, FaInstagram, FaTimes,
  FaChevronLeft, FaChevronRight, FaExternalLinkAlt,
  FaImages, FaPlay
} from 'react-icons/fa';
import { MdDesignServices, MdBrush } from 'react-icons/md';
import './CreativeWork.css';

/* ─────────────────────────────────────────────────────────────
   Gallery data: each creative item gets an `images` array.
   Video items get a `driveLink` instead.
───────────────────────────────────────────────────────────── */
const creativeItems = [
  {
    id: 1,
    title: 'Brand Identity Design',
    category: 'Graphic Design',
    icon: MdDesignServices,
    color: '#58a6ff',
    description: 'Complete brand identity packages — logos, menus, brand colours and visual assets designed for LogFroze and PBS.',
    images: [
      // LogFroze
      '/creative/brand-identity/logfroze/1.png',
      '/creative/brand-identity/logfroze/1 (2).png',
      '/creative/brand-identity/logfroze/1 copy.png',
      '/creative/brand-identity/logfroze/2.png',
      '/creative/brand-identity/logfroze/2 (2).png',
      '/creative/brand-identity/logfroze/2 copy.png',
      '/creative/brand-identity/logfroze/3.png',
      '/creative/brand-identity/logfroze/Final updated menu.png',
      '/creative/brand-identity/logfroze/today.png',
      '/creative/brand-identity/logfroze/PXL_20260108_110614564.RAW-01.COVER.jpg',
      '/creative/brand-identity/logfroze/PXL_20260108_110623945.RAW-01.COVER.jpg',
      '/creative/brand-identity/logfroze/PXL_20260124_090932543.RAW-01.COVER.jpg',
      '/creative/brand-identity/logfroze/PXL_20260214_145026333.RAW-01.COVER.jpg',
      '/creative/brand-identity/logfroze/PXL_20260214_205911806.RAW-01.COVER.jpg',
      '/creative/brand-identity/logfroze/PXL_20260220_171310097.PORTRAIT.jpg',
      // PBS
      '/creative/brand-identity/pbs/2.png',
      '/creative/brand-identity/pbs/5.png',
      '/creative/brand-identity/pbs/10.png',
      '/creative/brand-identity/pbs/12.png',
      '/creative/brand-identity/pbs/Ahad.png',
      '/creative/brand-identity/pbs/Jamal.png',
    ],
  },
  {
    id: 2,
    title: 'Event Poster Series',
    category: 'Poster Design',
    icon: MdBrush,
    color: '#f78166',
    description: 'Professional event posters for PBS society club introductions, gym promotions, and university events.',
    images: [
      '/creative/event-posters/1-Corporate Strategy CluB.png',
      '/creative/event-posters/2-Marketing and branding.png',
      '/creative/event-posters/3-Business Analytics &.png',
      '/creative/event-posters/4-Economics and policy.png',
      '/creative/event-posters/5-Finance and investment.png',
      '/creative/event-posters/Oath posterr.png',
      '/creative/event-posters/Gym edit.png',
      '/creative/event-posters/biggest_blackhole.png',
      '/creative/event-posters/Base poster.jpeg',
      '/creative/event-posters/WhatsApp Image 2026-01-21 at 3.25.58 PM.jpeg',
    ],
  },
  {
    id: 5,
    title: 'Promotional Videos',
    category: 'Video Editing',
    icon: FaVideo,
    color: '#f85149',
    description: 'Promotional and marketing video edits. Click below to view the full collection on Google Drive.',
    coverImage: '/creative/thumbnails/promo-cover.png',
    driveLink: 'https://drive.google.com/drive/folders/1wTITfthiS7d0Fr1p7MqW8nLs5Q42rsZQ?usp=sharing',
  },
  {
    id: 6,
    title: 'Logo Collection',
    category: 'Graphic Design',
    icon: FaPalette,
    color: '#d29922',
    description: 'Logo designs created for LogFroze marketplace and PBS (Pakistan Business Society) department clubs.',
    images: [
      // LogFroze logo as cover
      '/creative/logo-collection/logfroze/Untitled design (1).png',
      // PBS
      '/creative/logo-collection/pbs/PBS.png',
      '/creative/logo-collection/pbs/Corporate.png',
      '/creative/logo-collection/pbs/Marketing.png',
      '/creative/logo-collection/pbs/Economy.png',
      '/creative/logo-collection/pbs/Investment.png',
      '/creative/logo-collection/pbs/Event M.png',
      '/creative/logo-collection/pbs/Media.png',
      '/creative/logo-collection/pbs/B A R.png',
      '/creative/logo-collection/pbs/Clubs Head.png',
      '/creative/logo-collection/pbs/Advisory council.png',
      '/creative/logo-collection/pbs/advisoryy.png',
      '/creative/logo-collection/pbs/P cabinet.png',
      '/creative/logo-collection/pbs/Bathc 1.png',
      '/creative/logo-collection/pbs/12.png',
      // LogFroze
      '/creative/logo-collection/logfroze/1 (4).png',
      '/creative/logo-collection/logfroze/Artboard 1.pdf.png',
      '/creative/logo-collection/logfroze/Latest with backgruond (11 feb 2026).png',
      '/creative/logo-collection/logfroze/Untitled design (1).png',
      // PBS
      '/creative/logo-collection/pbs/PBS.png',
      '/creative/logo-collection/pbs/Corporate.png',
      '/creative/logo-collection/pbs/Marketing.png',
      '/creative/logo-collection/pbs/Economy.png',
      '/creative/logo-collection/pbs/Investment.png',
      '/creative/logo-collection/pbs/Event M.png',
      '/creative/logo-collection/pbs/Media.png',
      '/creative/logo-collection/pbs/B A R.png',
      '/creative/logo-collection/pbs/Clubs Head.png',
      '/creative/logo-collection/pbs/Advisory council.png',
      '/creative/logo-collection/pbs/advisoryy.png',
      '/creative/logo-collection/pbs/P cabinet.png',
      '/creative/logo-collection/pbs/Bathc 1.png',
      '/creative/logo-collection/pbs/12.png',
    ],
  },
  {
    id: 8,
    title: 'Motion Graphics',
    category: 'Video Editing',
    icon: FaVideo,
    color: '#e055a3',
    description: 'Motion graphic and animated video edits. Click below to view the full collection on Google Drive.',
    coverImage: '/creative/thumbnails/motion-cover.png',
    driveLink: 'https://drive.google.com/drive/folders/1wTITfthiS7d0Fr1p7MqW8nLs5Q42rsZQ?usp=sharing',
  },
  {
    id: 9,
    title: 'Thumbnail Designs',
    category: 'Social Media',
    icon: FaInstagram,
    color: '#58a6ff',
    description: 'YouTube thumbnail designs crafted for educational maths content and social media campaigns.',
    images: [
      // Waheed's thumbnails
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail.png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (1).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (2).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (3).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (4).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (5).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (6).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (9).png',
      '/creative/thumbnails/waheed/Yellow Modern Mathematics Lecture Youtube Thumbnail (14).png',
      '/creative/thumbnails/waheed/White Purple Simple Modern Course Trailer Youtube Thumbnail.png',
      '/creative/thumbnails/waheed/Colorful Simple Fraction Practice Math Presentation.png',
      '/creative/thumbnails/waheed/Colorful Simple Fraction Practice Math Presentation (1).png',
      // other
      '/creative/thumbnails/IMG-20250628-WA0011.jpg',
      '/creative/thumbnails/WhatsApp Image 2025-06-03 at 16.56.45_cc5a06bf.jpg',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export default function CreativeWork() {
  const [gallery, setGallery] = useState(null);   // { item, index }
  const openGallery = (item, index = 0) => setGallery({ item, index });
  const closeGallery = () => setGallery(null);

  const prev = useCallback(() => {
    if (!gallery) return;
    const len = gallery.item.images.length;
    setGallery(g => ({ ...g, index: (g.index - 1 + len) % len }));
  }, [gallery]);

  const next = useCallback(() => {
    if (!gallery) return;
    const len = gallery.item.images.length;
    setGallery(g => ({ ...g, index: (g.index + 1) % len }));
  }, [gallery]);

  useEffect(() => {
    const handler = (e) => {
      if (!gallery) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [gallery, prev, next]);

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
          <h2 className="section-title">Design &amp; Visual Content</h2>
          <p className="section-subtitle">
            Showcasing graphic design, poster design, social media content, and video editing work.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="creative-grid">
          {creativeItems.map((item, i) => {
            const isVideo = !!item.driveLink;
            const coverImage = item.images?.[0] || item.coverImage || null;

            return (
              <motion.div
                key={item.id}
                className={`creative-card ${i === 0 || i === 3 ? 'creative-card-lg' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => isVideo ? window.open(item.driveLink, '_blank', 'noopener,noreferrer') : openGallery(item, 0)}
              >
                {/* Background — real image if available, gradient otherwise */}
                <div
                  className="creative-card-bg"
                  style={coverImage
                    ? { backgroundImage: `url("${encodeURI(coverImage)}")` }
                    : { background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)` }
                  }
                >
                  {!coverImage && <item.icon className="creative-card-icon" style={{ color: item.color }} />}
                  {isVideo && (
                    <div className="creative-card-play">
                      <FaPlay />
                    </div>
                  )}
                </div>

                {/* Bottom overlay */}
                <div className="creative-card-overlay">
                  <span className="creative-card-category" style={{ color: item.color }}>{item.category}</span>
                  <h4 className="creative-card-title">{item.title}</h4>
                  {!isVideo && item.images && (
                    <span className="creative-card-count">
                      <FaImages style={{ marginRight: 4 }} />{item.images.length} images
                    </span>
                  )}
                  {isVideo && (
                    <span className="creative-card-count" style={{ color: item.color }}>
                      <FaExternalLinkAlt style={{ marginRight: 4 }} />View on Drive
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox Gallery ── */}
      <AnimatePresence>
        {gallery && (
          <motion.div
            className="creative-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="creative-lightbox-content"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button className="creative-lb-close" onClick={closeGallery} aria-label="Close">
                <FaTimes />
              </button>

              {/* Main image */}
              <div className="creative-lb-img-box">
                <img
                  key={gallery.index}
                  src={encodeURI(gallery.item.images[gallery.index])}
                  alt={`${gallery.item.title} ${gallery.index + 1}`}
                  className="creative-lb-img"
                />

                {/* Prev / Next */}
                {gallery.item.images.length > 1 && (
                  <>
                    <button className="creative-lb-nav creative-lb-prev" onClick={prev} aria-label="Previous">
                      <FaChevronLeft />
                    </button>
                    <button className="creative-lb-nav creative-lb-next" onClick={next} aria-label="Next">
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="creative-lb-footer">
                <div>
                  <span className="creative-card-category" style={{ color: gallery.item.color }}>
                    {gallery.item.category}
                  </span>
                  <h3 className="creative-lb-title">{gallery.item.title}</h3>
                  <p className="creative-lb-desc">{gallery.item.description}</p>
                </div>
                <span className="creative-lb-counter">
                  {gallery.index + 1} / {gallery.item.images.length}
                </span>
              </div>

              {/* Thumbnail strip */}
              {gallery.item.images.length > 1 && (
                <div className="creative-lb-strip">
                  {gallery.item.images.map((src, idx) => (
                    <button
                      key={idx}
                      className={`creative-lb-thumb ${idx === gallery.index ? 'active' : ''}`}
                      onClick={() => setGallery(g => ({ ...g, index: idx }))}
                      style={{ borderColor: idx === gallery.index ? gallery.item.color : 'transparent' }}
                    >
                      <img src={encodeURI(src)} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
