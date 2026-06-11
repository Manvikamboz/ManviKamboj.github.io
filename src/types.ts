// ─── Data Types ──────────────────────────────────────────────────────────────

export interface Skill {
  label: string;
  icon: string;
  category: "lang" | "fw" | "tool";
}

export interface Project {
  emoji: string;
  name: string;
  description: string;
  year: string;
  tech: string;
  accentColor: string;
  githubUrl?: string;
}

export interface Education {
  institution: string;
  detail: string;
  years: string;
  note?: string;
}

export interface Achievement {
  badge: string;
  label: string;
}

export interface ContactItem {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  href?: string;
}

export interface SocialItem {
  icon: string;
  iconColor: string;
  platform: string;
  handle: string;
  href: string;
}

export interface DevMeme {
  title: string;
  imageUrl: string;
  caption: string;
}
