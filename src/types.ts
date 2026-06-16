// ─── Data Types ──────────────────────────────────────────────────────────────

export interface Skill {
  label: string;
  icon: string;
  category: "lang" | "fw" | "tool";
}

export interface Project {
  icon: string;
  name: string;
  description: string;
  year: string;
  tech: string;
  accentColor: string;
  githubUrl?: string;
  category?: "creative" | "contribution";
  imageUrl?: string;
  websiteUrl?: string;
  prStatus?: {
    title: string;
    url: string;
    state: "open" | "merged";
  };
}

export interface Education {
  institution: string;
  detail: string;
  years: string;
  note?: string;
}

export interface Achievement {
  icon: string;
  label: string;
  description?: string;
  images?: string[];
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

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  credentialUrl?: string;
}
