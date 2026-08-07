import {
  FaPalette, FaPaintBrush, FaFilm, FaPenFancy, FaBookOpen,
  FaSwatchbook, FaMosque, FaVideo, FaCamera, FaLayerGroup,
} from 'react-icons/fa';
import {
  MdDesignServices, MdBrush, MdAnimation, MdAutoStories,
  MdColorLens, MdArticle, MdSchool, MdMovie,
} from 'react-icons/md';

export const danishSkillCategories = [
  {
    title: 'Design',
    skills: [
      { name: 'Graphic Design', icon: MdDesignServices },
      { name: 'Character Design', icon: FaPaintBrush },
      { name: 'Visual Branding', icon: FaSwatchbook },
      { name: 'Creative Storytelling', icon: MdAutoStories },
      { name: 'Color Theory', icon: MdColorLens },
      { name: 'Poster Design', icon: MdBrush },
    ],
  },
  {
    title: 'Animation',
    skills: [
      { name: 'Animation', icon: MdAnimation },
      { name: 'Motion Graphics', icon: MdMovie },
      { name: 'Video Editing', icon: FaVideo },
      { name: 'Storyboarding', icon: FaLayerGroup },
      { name: 'Character Animation', icon: FaFilm },
      { name: 'Visual Effects', icon: FaCamera },
    ],
  },
  {
    title: 'Research',
    skills: [
      { name: 'Islamic Studies', icon: FaMosque },
      { name: 'Research Writing', icon: FaPenFancy },
      { name: 'Academic Research', icon: MdSchool },
      { name: 'Content Creation', icon: MdArticle },
      { name: 'Critical Analysis', icon: FaBookOpen },
      { name: 'Creative Writing', icon: FaPalette },
    ],
  },
];

export const danishCreativeWorks = [
  { 
    id: 10, 
    title: 'LogHouse Ecosystem', 
    category: 'Web Platform', 
    icon: MdDesignServices, 
    color: '#10b981',
    description: 'The digital home and unified portfolio showcasing the combined works and crafts of our family ecosystem.',
    link: 'https://loghouse-portfolio.vercel.app/',
    image: '/projects/loghouse.png'
  },
  { id: 1, title: 'Fantasy Character Series', category: 'Character Design', icon: FaPaintBrush, color: '#f78166' },
  { id: 2, title: 'Brand Identity Concepts', category: 'Graphic Design', icon: MdDesignServices, color: '#58a6ff' },
  { id: 3, title: 'Motion Poster Design', category: 'Animation', icon: MdAnimation, color: '#d2a8ff' },
  { id: 4, title: 'Villain Character Sheet', category: 'Character Design', icon: FaPaintBrush, color: '#3fb950' },
  { id: 5, title: 'Animated Logo Reveal', category: 'Animation', icon: FaFilm, color: '#f85149' },
  { id: 6, title: 'Islamic Calligraphy Art', category: 'Graphic Design', icon: FaPalette, color: '#d29922' },
  { id: 7, title: 'Hero Character Concept', category: 'Character Design', icon: FaPaintBrush, color: '#79c0ff' },
  { id: 8, title: 'Visual Storytelling Reel', category: 'Animation', icon: MdMovie, color: '#e055a3' },
  { id: 9, title: 'Event Poster Collection', category: 'Graphic Design', icon: MdBrush, color: '#58a6ff' },
];

export const danishCharacters = [
  { id: 1, title: 'Shadow Knight', category: 'Fantasy', color: '#6e40c9' },
  { id: 2, title: 'Storm Archer', category: 'Fantasy', color: '#58a6ff' },
  { id: 3, title: 'Fire Mage', category: 'Fantasy', color: '#f85149' },
  { id: 4, title: 'Forest Guardian', category: 'Nature', color: '#3fb950' },
  { id: 5, title: 'Ice Warrior', category: 'Fantasy', color: '#79c0ff' },
  { id: 6, title: 'Dragon Rider', category: 'Fantasy', color: '#d29922' },
  { id: 7, title: 'Night Assassin', category: 'Dark', color: '#8b949e' },
  { id: 8, title: 'Crystal Mage', category: 'Fantasy', color: '#d2a8ff' },
];

export const danishAnimations = [
  { id: 1, title: 'Character Walk Cycle', type: 'Animation', duration: '0:30', color: '#58a6ff' },
  { id: 2, title: 'Logo Reveal Animation', type: 'Motion Graphics', duration: '0:15', color: '#d2a8ff' },
  { id: 3, title: 'Fight Scene Preview', type: 'Animation', duration: '1:20', color: '#f85149' },
  { id: 4, title: 'Nature Ambiance Loop', type: 'Motion Graphics', duration: '0:45', color: '#3fb950' },
];

export const danishResearch = [
  { id: 1, title: 'The Art of Islamic Geometry', category: 'Islamic Studies', description: 'Exploring the mathematical beauty behind Islamic geometric patterns and their applications in modern design.' },
  { id: 2, title: 'Character Design Principles', category: 'Design Theory', description: 'A deep dive into the fundamental principles that make character designs memorable and effective.' },
  { id: 3, title: 'Animation History & Evolution', category: 'Animation', description: 'Tracing the evolution of animation from traditional hand-drawn to modern digital techniques.' },
  { id: 4, title: 'Visual Storytelling Techniques', category: 'Creative Arts', description: 'Research into how visual elements can be used to tell compelling stories without words.' },
];
