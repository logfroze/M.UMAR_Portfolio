import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingControls from './components/FloatingControls';
import AlanPage from './pages/AlanPage';
import ResumePage from './pages/ResumePage';

// Admin CMS Components
import AdminBar from './admin/components/AdminBar';
import AdminDashboard from './admin/components/AdminDashboard';
import AdminAuthModal from './admin/auth/AdminAuthModal';
import AdminLogoutModal from './admin/auth/AdminLogoutModal';
import { usePortfolioData } from './admin/context/AdminDataContext';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const { dashboardOpen, closeDashboard } = usePortfolioData();

  return (
    <>
      {/* Admin CMS Overlays — modals read from context internally */}
      <AdminBar />
      <AdminDashboard isOpen={dashboardOpen} onClose={closeDashboard} />
      <AdminAuthModal />
      <AdminLogoutModal />

      <FloatingControls />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><AlanPage /></AnimatedPage>} />
          <Route path="/resume" element={<AnimatedPage><ResumePage /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

