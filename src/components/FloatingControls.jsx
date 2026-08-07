import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaWhatsapp } from 'react-icons/fa';
import './FloatingControls.css';

export default function FloatingControls() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show controls after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Right Side Controls (Scroll Arrows) */}
      <div className={`floating-controls-right ${isVisible ? 'visible' : ''}`}>
        <button className="floating-btn scroll-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </button>
        <button className="floating-btn scroll-btn" onClick={scrollToBottom} aria-label="Scroll to bottom">
          <FaArrowDown />
        </button>
      </div>

      {/* Left Side Controls (WhatsApp) */}
      <div className={`floating-controls-left ${isVisible ? 'visible' : ''}`}>
        <a 
          href="https://wa.me/923294102524" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </>
  );
}
