import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaWhatsapp, FaDownload } from 'react-icons/fa';
import './FloatingControls.css';

export default function FloatingControls() {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show controls after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'To install this portfolio as an app on your device:\n\n' +
        '• Desktop (Chrome/Edge/Brave): Click the Install icon in the address bar (top-right) or Menu > "Install Alan Portfolio".\n' +
        '• Android (Chrome): Tap Menu (⋮) > "Add to Home screen" / "Install app".\n' +
        '• iPhone/iPad (Safari): Tap Share (⎋) > "Add to Home Screen".'
      );
    }
  };

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

      {/* Left Side Controls (WhatsApp & Install) */}
      <div className={`floating-controls-left ${isVisible ? 'visible' : ''}`}>
        <button
          className="floating-btn install-btn"
          onClick={handleInstallClick}
          aria-label="Install Portfolio App"
          title="Install Portfolio App"
        >
          <FaDownload />
        </button>
        <a
          href="https://wa.me/923294102524"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </>
  );
}
