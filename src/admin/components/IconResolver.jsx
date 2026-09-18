import React from 'react';
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaGithub, FaCode,
  FaFigma, FaPalette, FaPen, FaDumbbell, FaVideo, FaInstagram, FaImages,
  FaPlay, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaLaptopCode,
  FaTerminal, FaBriefcase, FaGraduationCap, FaBuilding, FaAward, FaCalendarAlt,
  FaCheckCircle, FaRocket, FaGlobe, FaLightbulb, FaStar, FaTrophy, FaMedal,
  FaBook, FaCertificate, FaUserTie, FaUser, FaTools, FaEnvelope, FaLinkedin,
  FaWhatsapp, FaDownload, FaPrint, FaBars, FaTimes, FaSun, FaMoon,
  FaArrowRight, FaArrowUp, FaArrowDown, FaQuoteLeft, FaPaperPlane,
  FaClock, FaHourglassHalf, FaThLarge, FaSearchPlus, FaHome, FaUsers,
  FaUserFriends, FaCodeBranch
} from 'react-icons/fa';

import {
  SiFirebase, SiCanva, SiNextdotjs, SiTailwindcss, SiLaravel, SiSupabase,
  SiPostgresql, SiMysql, SiVercel, SiNetlify, SiC, SiCplusplus, SiPython,
  SiTypescript, SiJavascript, SiNodedotjs, SiExpress, SiMongodb, SiDocker,
  SiLinux, SiRedux, SiVite, SiFlutter, SiDjango, SiPhp, SiWordpress,
  SiBootstrap, SiGit, SiGraphql, SiKubernetes, SiGooglecloud
} from 'react-icons/si';

import {
  MdDevices, MdApi, MdBrush, MdDesignServices, MdCampaign, MdArticle,
  MdAutoStories, MdEdit, MdRecordVoiceOver, MdBrandingWatermark
} from 'react-icons/md';

import {
  GiBlackBelt, GiPunchBlast, GiMeditation, GiStrong
} from 'react-icons/gi';

// Curated registry of portfolio icons
const iconRegistry = {
  // FontAwesome
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaGithub, FaCode,
  FaFigma, FaPalette, FaPen, FaDumbbell, FaVideo, FaInstagram, FaImages,
  FaPlay, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaLaptopCode,
  FaTerminal, FaBriefcase, FaGraduationCap, FaBuilding, FaAward, FaCalendarAlt,
  FaCheckCircle, FaRocket, FaGlobe, FaLightbulb, FaStar, FaTrophy, FaMedal,
  FaBook, FaCertificate, FaUserTie, FaUser, FaTools, FaEnvelope, FaLinkedin,
  FaWhatsapp, FaDownload, FaPrint, FaBars, FaTimes, FaSun, FaMoon,
  FaArrowRight, FaArrowUp, FaArrowDown, FaQuoteLeft, FaPaperPlane,
  FaClock, FaHourglassHalf, FaThLarge, FaSearchPlus, FaHome, FaUsers,
  FaUserFriends, FaCodeBranch,

  // SimpleIcons
  SiFirebase, SiCanva, SiNextdotjs, SiTailwindcss, SiLaravel, SiSupabase,
  SiPostgresql, SiMysql, SiVercel, SiNetlify, SiC, SiCplusplus, SiPython,
  SiTypescript, SiJavascript, SiNodedotjs, SiExpress, SiMongodb, SiDocker,
  SiLinux, SiRedux, SiVite, SiFlutter, SiDjango, SiPhp, SiWordpress,
  SiBootstrap, SiGit, SiGraphql, SiKubernetes, SiGooglecloud,

  // Material Design
  MdDevices, MdApi, MdBrush, MdDesignServices, MdCampaign, MdArticle,
  MdAutoStories, MdEdit, MdRecordVoiceOver, MdBrandingWatermark,

  // Game Icons (Martial Arts)
  GiBlackBelt, GiPunchBlast, GiMeditation, GiStrong,
};

/**
 * Resolves an icon name or component to a valid React element
 */
export function resolveIcon(icon, props = {}) {
  if (!icon) {
    const Fallback = FaCode;
    return <Fallback {...props} />;
  }

  // If icon is already a React component or function
  if (typeof icon === 'function' || typeof icon === 'object') {
    const IconComponent = icon;
    return <IconComponent {...props} />;
  }

  // If icon is a string name like 'FaReact' or 'SiPython'
  if (typeof icon === 'string') {
    const Component = iconRegistry[icon];
    if (Component) {
      return <Component {...props} />;
    }
  }

  const Fallback = FaCode;
  return <Fallback {...props} />;
}

export function getIconComponent(iconName) {
  if (!iconName) return FaCode;
  if (typeof iconName === 'function') return iconName;
  return iconRegistry[iconName] || FaCode;
}
