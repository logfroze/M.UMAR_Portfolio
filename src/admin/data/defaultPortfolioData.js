/**
 * Default Portfolio Data Snapshot
 * Seeded from the existing portfolio data files.
 * Every manageable entity supports visibility: 'public' | 'private'.
 */

import { projects as initialProjects, projectCategories as initialProjectCategories } from '../../data/projects';
import { documentsData as initialDocuments, martialArtsCertificates as initialMartialArtsCerts } from '../../data/documents';
import { internshipMeta, internshipProjects } from '../../data/internships';
import { writings as initialWritings } from '../../data/writings';
import { timelineEvents as initialTimeline } from '../../data/timeline';

export const initialHeroAboutData = {
  title: 'Full Stack - Developer',
  subtitle: 'A multidisciplinary creator bridging technology, design, and communication.',
  introParagraphs: [
    "I'm Muhammad Umar.",
    "A Full Stack Developer, Digital Creator, Designer, and Writer passionate about building meaningful digital experiences. Currently in my final semester of BSCS, I've spent the past years honing my skills across web development, app development, graphic design, video editing, and content creation.",
    "With 3 years of martial arts training in Shotokan Karate, I bring the same discipline, focus, and consistency to every project I undertake. I believe in continuous learning, clean code, and designs that speak louder than words.",
    "My approach combines technical precision with creative thinking whether I'm building a full-stack application, designing a brand identity, or crafting compelling content. I don't just build software; I create complete digital experiences.",
  ],
  stats: [
    { number: '15+', label: 'Projects' },
    { number: '3+', label: 'Years Coding' },
    { number: '10+', label: 'Clients' },
    { number: '5+', label: 'Skills' },
  ],
  highlights: [
    { icon: 'FaCode', label: 'Web & App Developer' },
    { icon: 'FaPalette', label: 'Graphic Designer' },
    { icon: 'FaPen', label: 'Content Writer' },
    { icon: 'FaDumbbell', label: '3 Years Martial Arts' },
  ],
  visibility: 'public',
};

export const initialSkillsData = [
  {
    title: 'Development',
    visibility: 'public',
    subGroups: [
      {
        label: 'Programming Languages',
        visibility: 'public',
        skills: [
          { name: 'C', icon: 'SiC', visibility: 'public' },
          { name: 'C++', icon: 'SiCplusplus', visibility: 'public' },
          { name: 'Python (basics)', icon: 'SiPython', visibility: 'public' },
        ],
      },
      {
        label: 'Frontend',
        visibility: 'public',
        skills: [
          { name: 'HTML', icon: 'FaHtml5', visibility: 'public' },
          { name: 'CSS', icon: 'FaCss3Alt', visibility: 'public' },
          { name: 'JavaScript', icon: 'FaJsSquare', visibility: 'public' },
          { name: 'React', icon: 'FaReact', visibility: 'public' },
          { name: 'Next.js', icon: 'SiNextdotjs', visibility: 'public' },
          { name: 'Tailwind CSS', icon: 'SiTailwindcss', visibility: 'public' },
          { name: 'Responsive Design', icon: 'MdDevices', visibility: 'public' },
        ],
      },
      {
        label: 'Backend',
        visibility: 'public',
        skills: [
          { name: 'Laravel', icon: 'SiLaravel', visibility: 'public' },
          { name: 'REST APIs', icon: 'MdApi', visibility: 'public' },
          { name: 'Firebase', icon: 'SiFirebase', visibility: 'public' },
          { name: 'Supabase', icon: 'SiSupabase', visibility: 'public' },
        ],
      },
      {
        label: 'Database',
        visibility: 'public',
        skills: [
          { name: 'PostgreSQL', icon: 'SiPostgresql', visibility: 'public' },
          { name: 'MySQL', icon: 'SiMysql', visibility: 'public' },
        ],
      },
    ],
  },
  {
    title: 'Design',
    visibility: 'public',
    skills: [
      { name: 'Canva', icon: 'SiCanva', visibility: 'public' },
      { name: 'Poster Design', icon: 'MdBrush', visibility: 'public' },
      { name: 'Social Media Posts', icon: 'MdCampaign', visibility: 'public' },
      { name: 'Graphic Design', icon: 'MdDesignServices', visibility: 'public' },
      { name: 'Branding', icon: 'MdBrandingWatermark', visibility: 'public' },
      { name: 'UI Design', icon: 'FaFigma', visibility: 'public' },
    ],
  },
  {
    title: 'Content',
    visibility: 'public',
    skills: [
      { name: 'Content Writing', icon: 'MdArticle', visibility: 'public' },
      { name: 'Story Writing', icon: 'MdAutoStories', visibility: 'public' },
      { name: 'Copywriting', icon: 'MdEdit', visibility: 'public' },
      { name: 'Public Speaking', icon: 'MdRecordVoiceOver', visibility: 'public' },
    ],
  },
  {
    title: 'Tools',
    visibility: 'public',
    skills: [
      { name: 'Git', icon: 'FaGitAlt', visibility: 'public' },
      { name: 'GitHub', icon: 'FaGithub', visibility: 'public' },
      { name: 'VS Code', icon: 'FaCode', visibility: 'public' },
      { name: 'Vercel', icon: 'SiVercel', visibility: 'public' },
      { name: 'Netlify', icon: 'SiNetlify', visibility: 'public' },
      { name: 'Canva', icon: 'SiCanva', visibility: 'public' },
    ],
  },
];

// Initial projects with visibility and newly updated status
export const initialProjectsData = initialProjects.map((p, idx) => ({
  ...p,
  visibility: 'public',
  isNewlyUpdated: idx === 0,
}));

// Hierarchical Internships Data Model
export const initialInternshipsData = [
  {
    id: 'codealpha',
    company: internshipMeta.company,
    role: internshipMeta.role,
    duration: internshipMeta.duration,
    durationLabel: internshipMeta.durationLabel,
    type: internshipMeta.type,
    status: internshipMeta.status,
    description: internshipMeta.description,
    metrics: internshipMeta.metrics,
    visibility: 'public',
    programs: [
      {
        id: 'FrontEnd Development',
        label: 'FrontEnd Development',
        icon: 'FaLaptopCode',
        visibility: 'public',
        projects: internshipProjects
          .filter((p) => p.program === 'FrontEnd Development')
          .map((p) => ({ ...p, visibility: 'public' })),
      },
      {
        id: 'Python Programming',
        label: 'Python Programming',
        icon: 'FaTerminal',
        visibility: 'public',
        projects: internshipProjects
          .filter((p) => p.program === 'Python Programming')
          .map((p) => ({ ...p, visibility: 'public' })),
      },
    ],
  },
];

// Initial Documents with visibility
export const initialDocumentsData = [
  ...initialDocuments.map((d) => ({ ...d, visibility: 'public' })),
  ...initialMartialArtsCerts.map((d) => ({ ...d, visibility: 'public' })),
];

// Initial Creative Work with visibility
export const initialCreativeWorkData = [
  {
    id: 1,
    title: 'Brand Identity Design',
    category: 'Graphic Design',
    icon: 'MdDesignServices',
    color: '#58a6ff',
    description: 'Complete brand identity packages — logos, menus, brand colours and visual assets designed for LogFroze and PBS.',
    images: [
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
      '/creative/brand-identity/pbs/2.png',
      '/creative/brand-identity/pbs/5.png',
      '/creative/brand-identity/pbs/10.png',
      '/creative/brand-identity/pbs/12.png',
      '/creative/brand-identity/pbs/Ahad.png',
      '/creative/brand-identity/pbs/Jamal.png',
    ],
    visibility: 'public',
  },
  {
    id: 2,
    title: 'Event Poster Series',
    category: 'Poster Design',
    icon: 'MdBrush',
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
    visibility: 'public',
  },
  {
    id: 5,
    title: 'Promotional Videos',
    category: 'Video Editing',
    icon: 'FaVideo',
    color: '#f85149',
    description: 'Promotional and marketing video edits. Click below to view the full collection on Google Drive.',
    coverImage: '/creative/thumbnails/promo-cover.png',
    driveLink: 'https://drive.google.com/drive/folders/1wTITfthiS7d0Fr1p7MqW8nLs5Q42rsZQ?usp=sharing',
    visibility: 'public',
  },
  {
    id: 6,
    title: 'Logo Collection',
    category: 'Graphic Design',
    icon: 'FaPalette',
    color: '#d29922',
    description: 'Logo designs created for LogFroze marketplace and PBS (Pakistan Business Society) department clubs.',
    images: [
      '/creative/logo-collection/logfroze/Untitled design (1).png',
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
      '/creative/logo-collection/logfroze/1 (4).png',
      '/creative/logo-collection/logfroze/Artboard 1.pdf.png',
      '/creative/logo-collection/logfroze/Latest with backgruond (11 feb 2026).png',
    ],
    visibility: 'public',
  },
  {
    id: 8,
    title: 'Motion Graphics',
    category: 'Video Editing',
    icon: 'FaVideo',
    color: '#e055a3',
    description: 'Motion graphic and animated video edits. Click below to view the full collection on Google Drive.',
    coverImage: '/creative/thumbnails/motion-cover.png',
    driveLink: 'https://drive.google.com/drive/folders/1wTITfthiS7d0Fr1p7MqW8nLs5Q42rsZQ?usp=sharing',
    visibility: 'public',
  },
  {
    id: 9,
    title: 'Thumbnail Designs',
    category: 'Social Media',
    icon: 'FaInstagram',
    color: '#58a6ff',
    description: 'YouTube thumbnail designs crafted for educational maths content and social media campaigns.',
    images: [
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
    ],
    visibility: 'public',
  },
].map((item, idx) => ({
  ...item,
  isNewlyUpdated: idx === 0,
}));

// Initial Writings with visibility
export const initialWritingsData = initialWritings.map((w, idx) => ({
  ...w,
  visibility: 'public',
  isNewlyUpdated: idx === 0,
}));

// Initial Timeline with visibility
export const initialTimelineData = initialTimeline.map((e, index) => ({
  id: `tl-${index + 1}`,
  ...e,
  visibility: 'public',
}));

// Default Global Section Visibility
export const initialSectionVisibility = {
  hero: 'public',
  about: 'public',
  skills: 'public',
  projects: 'public',
  internships: 'public',
  resume: 'public',
  documents: 'public',
  creative: 'public',
  writing: 'public',
  martialArts: 'public',
  journey: 'public',
  github: 'public',
  testimonials: 'public',
  contact: 'public',
};

// Full Default Portfolio State
export const defaultPortfolioData = {
  version: 1,
  lastUpdatedDate: 'September 18, 2026',
  heroAbout: initialHeroAboutData,
  skills: initialSkillsData,
  projects: initialProjectsData,
  internships: initialInternshipsData,
  documents: initialDocumentsData,
  creativeWork: initialCreativeWorkData,
  writings: initialWritingsData,
  timeline: initialTimelineData,
  sections: initialSectionVisibility,
};
