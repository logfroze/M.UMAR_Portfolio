import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={`theme-toggle-icon ${theme === 'dark' ? 'active' : ''}`}>
        <FaMoon />
      </span>
      <span className={`theme-toggle-icon ${theme === 'light' ? 'active' : ''}`}>
        <FaSun />
      </span>
    </button>
  );
}
