import {
  FaPaintBrush, FaPalette, FaPencilAlt, FaCut, FaHandSparkles,
  FaRulerCombined, FaStar, FaHeart,
} from 'react-icons/fa';
import {
  MdBrush, MdColorLens, MdDesignServices, MdDraw, MdAutoStories,
  MdCheckroom, MdSpa, MdGridOn,
} from 'react-icons/md';

export const raziaSkillCategories = [
  {
    title: 'Art',
    skills: [
      { name: 'Sketching', icon: FaPencilAlt },
      { name: 'Painting', icon: FaPalette },
      { name: 'Drawing', icon: MdDraw },
      { name: 'Illustration', icon: MdBrush },
      { name: 'Color Theory', icon: MdColorLens },
      { name: 'Artistic Design', icon: MdDesignServices },
    ],
  },
  {
    title: 'Craft',
    skills: [
      { name: 'Fabric Arts', icon: FaCut },
      { name: 'Mehndi Design', icon: FaHandSparkles },
      { name: 'Stitching', icon: MdCheckroom },
      { name: 'Pattern Making', icon: MdGridOn },
      { name: 'Handmade Crafts', icon: FaStar },
      { name: 'Creative Design', icon: FaRulerCombined },
    ],
  },
  {
    title: 'Creative',
    skills: [
      { name: 'Visual Storytelling', icon: MdAutoStories },
      { name: 'Decorative Art', icon: MdSpa },
      { name: 'Mixed Media', icon: FaPaintBrush },
      { name: 'Creative Expression', icon: FaHeart },
    ],
  },
];

export const raziaSketchCollection = [
  { 
    id: 10, 
    title: 'LogHouse Ecosystem', 
    category: 'Web Platform', 
    color: '#10b981',
    description: 'The digital home and unified portfolio showcasing the combined works and crafts of our family ecosystem.',
    link: 'https://loghouse-portfolio.vercel.app/',
    image: '/projects/loghouse.png'
  },
  { id: 1, title: 'Portrait Study I', category: 'Portrait', color: '#8b949e' },
  { id: 2, title: 'Floral Composition', category: 'Nature', color: '#3fb950' },
  { id: 3, title: 'Architectural Sketch', category: 'Architecture', color: '#58a6ff' },
  { id: 4, title: 'Figure Drawing', category: 'Figure', color: '#d2a8ff' },
  { id: 5, title: 'Still Life Study', category: 'Still Life', color: '#d29922' },
  { id: 6, title: 'Portrait Study II', category: 'Portrait', color: '#f78166' },
  { id: 7, title: 'Animal Sketch', category: 'Nature', color: '#79c0ff' },
  { id: 8, title: 'Landscape Pencil Art', category: 'Landscape', color: '#3fb950' },
];

export const raziaPaintings = [
  { id: 1, title: 'Sunset Horizon', category: 'Landscape', color: '#f78166' },
  { id: 2, title: 'Floral Dreams', category: 'Floral', color: '#d2a8ff' },
  { id: 3, title: 'Abstract Emotions', category: 'Abstract', color: '#58a6ff' },
  { id: 4, title: 'Mountain Serenity', category: 'Landscape', color: '#3fb950' },
  { id: 5, title: 'Golden Twilight', category: 'Landscape', color: '#d29922' },
  { id: 6, title: 'Rose Garden', category: 'Floral', color: '#f85149' },
];

export const raziaDrawings = [
  { id: 1, title: 'Mandala Design', category: 'Mandala', color: '#d2a8ff' },
  { id: 2, title: 'Eye Detail Study', category: 'Detail', color: '#58a6ff' },
  { id: 3, title: 'Ornamental Pattern', category: 'Pattern', color: '#d29922' },
  { id: 4, title: 'Hand Study', category: 'Anatomy', color: '#8b949e' },
  { id: 5, title: 'Geometric Art', category: 'Geometric', color: '#3fb950' },
  { id: 6, title: 'Zentangle Design', category: 'Pattern', color: '#f78166' },
];

export const raziaFabricArts = [
  { id: 1, title: 'Embroidered Dupatta', category: 'Embroidery', color: '#d2a8ff' },
  { id: 2, title: 'Patchwork Cushion', category: 'Patchwork', color: '#f78166' },
  { id: 3, title: 'Cross-Stitch Design', category: 'Cross-Stitch', color: '#58a6ff' },
  { id: 4, title: 'Fabric Painting', category: 'Painting', color: '#3fb950' },
];

export const raziaMehndiDesigns = [
  { id: 1, title: 'Bridal Full Hand', category: 'Bridal', color: '#d29922' },
  { id: 2, title: 'Arabic Style', category: 'Arabic', color: '#f78166' },
  { id: 3, title: 'Moroccan Pattern', category: 'Moroccan', color: '#d2a8ff' },
  { id: 4, title: 'Floral Minimalist', category: 'Minimalist', color: '#3fb950' },
  { id: 5, title: 'Indo-Arabic Fusion', category: 'Fusion', color: '#58a6ff' },
  { id: 6, title: 'Traditional Pakistani', category: 'Traditional', color: '#f85149' },
];

export const raziaStitching = [
  { id: 1, title: 'Embroidered Kameez', category: 'Traditional', color: '#d2a8ff' },
  { id: 2, title: 'Designer Frock', category: 'Modern', color: '#58a6ff' },
  { id: 3, title: 'Casual Kurta', category: 'Casual', color: '#3fb950' },
  { id: 4, title: 'Party Wear Design', category: 'Formal', color: '#d29922' },
];
