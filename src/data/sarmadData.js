import { FaGamepad, FaTrophy, FaHeadset, FaCrosshairs } from 'react-icons/fa';

export const sarmadSkillCategories = [
  {
    title: 'Gaming & Esports',
    skills: [
      { name: 'PUBG Mobile', icon: FaGamepad },
      { name: 'Tactical Gameplay', icon: FaCrosshairs },
      { name: 'Team Strategy', icon: FaHeadset },
      { name: 'Competitive Ranking', icon: FaTrophy },
    ]
  }
];

export const sarmadGamingHighlights = [
  { 
    id: 10, 
    title: 'LogHouse Ecosystem', 
    category: 'Web Platform', 
    color: '#10b981',
    description: 'The digital home and unified portfolio showcasing the combined works and crafts of our family ecosystem.',
    link: 'https://loghouse-portfolio.vercel.app/',
    image: '/projects/loghouse.png'
  },
  { id: 1, title: 'Ranked 85th Globally', category: 'Achievement', color: '#a1a1aa' },
  { id: 2, title: 'Squad Wipes', category: 'Clips', color: '#d4d4d8' },
  { id: 3, title: 'Sniper Highlights', category: 'Clips', color: '#e4e4e7' },
  { id: 4, title: 'Tournament Matches', category: 'Competitive', color: '#71717a' },
];

export const sarmadStats = [
  { id: 1, category: 'Experience', title: '5-6 Years PUBG', description: 'Extensive experience in competitive mobile gaming, mastering game mechanics, map knowledge, and tactical positioning over half a decade.' },
  { id: 2, category: 'Rank', title: 'Top 85 / 100', description: 'Achieved elite ranking status against top players, demonstrating consistent high-level performance and competitive survival skills.' },
  { id: 3, category: 'Role', title: 'Pro Player', description: 'Specialized in tactical gameplay, quick reflexes, precision aiming, and leading squad coordination in high-pressure situations.' },
];
