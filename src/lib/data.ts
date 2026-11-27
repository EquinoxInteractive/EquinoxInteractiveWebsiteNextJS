import type { StaticImageData } from 'next/image';
import boxSiege from '@/assets/box-siege.png';

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#portfolio', label: 'Games' },
  { href: '#contact', label: 'Contact' },
];

export type TeamLinks = { github?: string; website?: string };
export type TeamMember = { name: string; role: string; links: TeamLinks };

export const teamMembers: TeamMember[] = [
  { name: 'BadutZY', role: 'Game Programmer', links: { website: 'https://rizkymp.my.id/' } },
  { name: 'SwimmingFox', role: 'Sprite Artist', links: { github: 'https://github.com/Marrwertz' } },
  { name: 'Ari8Bit', role: 'Sound Designer', links: { website: 'https://ariaja.pages.dev/' } },
];

export type Game = {
  slug: string;
  title: string;
  status: 'released' | 'coming-soon';
  platform?: string;
  tags?: string[];
  description?: string;
  highlight?: string;
  url?: string;
  image?: StaticImageData;
  imageAlt?: string;
  technologies?: string[];
  meta?: { value: string; label: string }[];
};

export const games: Game[] = [
  {
    slug: 'box-siege',
    title: 'Box Siege',
    status: 'released',
    platform: 'PC',
    tags: ['PvP', 'Co-Op'],
    description:
      'A dynamic 2D action platformer with local cooperative PvP. Battle your friends, build the chaos, survive the siege.',
    highlight: 'local cooperative PvP',
    url: 'https://boxsiege.vercel.app/',
    image: boxSiege,
    imageAlt: 'Box Siege — 2D Action Platformer',
    technologies: ['Godot', 'GDScript'],
    meta: [
      { value: '2024', label: 'Released' },
      { value: '2D', label: 'Platformer' },
    ],
  },
  { slug: 'project-02', title: 'Project 02', status: 'coming-soon' },
  { slug: 'project-03', title: 'Project 03', status: 'coming-soon' },

  /* Contoh game baru (hapus tanda komentar & isi):
  {
    slug: 'nama-game',
    title: 'Nama Game',
    status: 'released',
    platform: 'PC',
    tags: ['Co-Op'],
    description: 'Deskripsi singkat game. Bagian ini akan ditebalkan.',
    highlight: 'Bagian ini akan ditebalkan',
    url: 'https://link-game.com',
    image: namaGameImage,
    imageAlt: 'Nama Game',
    technologies: ['Unity', 'C#'],
    meta: [{ value: '2026', label: 'Released' }, { value: '3D', label: 'Adventure' }],
  },
  */
];

export const socialLinks = [
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@equinox.interactive',
    handle: '@equinox.interactive',
    description: 'Fun behind-the-scenes content and game dev tips',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/EquinoxIntratve',
    handle: '@EquinoxIntratve',
    description: 'Latest updates and announcements',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/equinox.interactive',
    handle: '@equinox.interactive',
    description: 'Art insights and visual updates',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
];

export const GITHUB_PATH =
  'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z';
