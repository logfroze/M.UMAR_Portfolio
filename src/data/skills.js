import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact,
  FaGitAlt, FaGithub, FaCode,
} from 'react-icons/fa';
import {
  SiFirebase, SiCanva, SiNextdotjs, SiTailwindcss,
  SiLaravel, SiSupabase, SiPostgresql, SiMysql,
  SiVercel, SiNetlify, SiC, SiCplusplus, SiPython,
} from 'react-icons/si';
import {
  MdDevices, MdApi, MdBrush, MdDesignServices, MdCampaign,
  MdArticle, MdRecordVoiceOver, MdAutoStories, MdEdit, MdBrandingWatermark,
} from 'react-icons/md';
import { FaFigma } from 'react-icons/fa';

export const skillCategories = [
  {
    title: 'Development',
    subGroups: [
      {
        label: 'Programming Languages',
        skills: [
          { name: 'C', icon: SiC },
          { name: 'C++', icon: SiCplusplus },
          { name: 'Python (basics)', icon: SiPython },
        ],
      },
      {
        label: 'Frontend',
        skills: [
          { name: 'HTML', icon: FaHtml5 },
          { name: 'CSS', icon: FaCss3Alt },
          { name: 'JavaScript', icon: FaJsSquare },
          { name: 'React', icon: FaReact },
          { name: 'Next.js', icon: SiNextdotjs },
          { name: 'Tailwind CSS', icon: SiTailwindcss },
          { name: 'Responsive Design', icon: MdDevices },
        ],
      },
      {
        label: 'Backend',
        skills: [
          { name: 'Laravel', icon: SiLaravel },
          { name: 'REST APIs', icon: MdApi },
          { name: 'Firebase', icon: SiFirebase },
          { name: 'Supabase', icon: SiSupabase },
        ],
      },
      {
        label: 'Database',
        skills: [
          { name: 'PostgreSQL', icon: SiPostgresql },
          { name: 'MySQL', icon: SiMysql },
        ],
      },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Canva', icon: SiCanva },
      { name: 'Poster Design', icon: MdBrush },
      { name: 'Social Media Posts', icon: MdCampaign },
      { name: 'Graphic Design', icon: MdDesignServices },
      { name: 'Branding', icon: MdBrandingWatermark },
      { name: 'UI Design', icon: FaFigma },
    ],
  },
  {
    title: 'Content',
    skills: [
      { name: 'Content Writing', icon: MdArticle },
      { name: 'Story Writing', icon: MdAutoStories },
      { name: 'Copywriting', icon: MdEdit },
      { name: 'Public Speaking', icon: MdRecordVoiceOver },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub },
      { name: 'VS Code', icon: FaCode },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Netlify', icon: SiNetlify },
      { name: 'Canva', icon: SiCanva },
    ],
  },
];
