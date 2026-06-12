import type {
  Skill,
  Project,
  Education,
  Achievement,
  ContactItem,
  SocialItem,
  DevMeme,
} from "./types";

export const skills: Skill[] = [
  { label: "TypeScript", icon: "fas fa-code", category: "lang" },
  { label: "JavaScript", icon: "fab fa-js", category: "lang" },
  { label: "Python", icon: "fab fa-python", category: "lang" },
  { label: "C++", icon: "fas fa-terminal", category: "lang" },
  { label: "HTML5 / CSS3", icon: "fab fa-html5", category: "lang" },
  { label: "SQL", icon: "fas fa-database", category: "lang" },
  
  { label: "React", icon: "fab fa-react", category: "fw" },
  { label: "Node.js / Express", icon: "fab fa-node-js", category: "fw" },
  { label: "Tailwind CSS", icon: "fab fa-css3-alt", category: "fw" },
  { label: "PyTorch / OpenCV", icon: "fas fa-brain", category: "fw" },
  { label: "Django / Flask", icon: "fab fa-python", category: "fw" },
  
  { label: "Linux", icon: "fab fa-linux", category: "tool" },
  { label: "Git / GitHub", icon: "fab fa-github", category: "tool" },
  { label: "MongoDB", icon: "fas fa-leaf", category: "tool" },
  { label: "Docker", icon: "fab fa-docker", category: "tool" },
  { label: "AWS", icon: "fab fa-aws", category: "tool" },
];

export const projects: Project[] = [
  {
    emoji: "🏙️",
    name: "Git City",
    description:
      "Your GitHub profile visualized as a beautiful 3D pixel art building inside an interactive virtual city.",
    year: "2026",
    tech: "TypeScript / Canvas / Three.js",
    accentColor: "rgba(244,114,182,0.15)",
    githubUrl: "https://github.com/Manvikamboz/git-city",
  },
  {
    emoji: "💪",
    name: "FitMart",
    description:
      "Full-stack MERN fitness e-commerce platform featuring an Admin dashboard, Razorpay payments, workout tracker, gym finder, AI chatbot, and BMI calculators.",
    year: "2026",
    tech: "React / Node.js / MongoDB / Express",
    accentColor: "rgba(6,182,212,0.15)",
    githubUrl: "https://github.com/Manvikamboz/FitMart_.",
  },
  {
    emoji: "🚀",
    name: "Startora Platform",
    description:
      "A gorgeous launchpad and network directory built using glassmorphic design systems for student founders.",
    year: "2026",
    tech: "React / Tailwind / Node.js",
    accentColor: "rgba(124,58,237,0.15)",
    githubUrl: "https://github.com/Manvikamboz/Startora",
  },
  {
    emoji: "🧠",
    name: "Last30Days AI Agent Skill",
    description:
      "Autonomous agent skill that researches any query across Reddit, X, YouTube, HN, Polymarket, then synthesizes a grounded summary.",
    year: "2026",
    tech: "TypeScript / LLMs / Scrapers",
    accentColor: "rgba(234,179,8,0.15)",
    githubUrl: "https://github.com/Manvikamboz/last30days-skill",
  },
  {
    emoji: "🚗",
    name: "EdgeVision ANPR",
    description:
      "An edge-optimized vehicle intelligence system for Automated Number Plate Recognition using lightweight models.",
    year: "2026",
    tech: "Python / OpenCV / PyTorch",
    accentColor: "rgba(34,197,94,0.15)",
    githubUrl: "https://github.com/Manvikamboz/EdgeVision-ANPR-",
  },
  {
    emoji: "🎣",
    name: "Phishing Detection System",
    description:
      "Advanced model-driven classifier built to identify phishing websites and security threats in real-time.",
    year: "2026",
    tech: "Python / Scikit-Learn / Flask",
    accentColor: "rgba(239,68,68,0.15)",
    githubUrl: "https://github.com/Manvikamboz/phishing-detection",
  },
];

export const education: Education[] = [
  {
    institution: "Bennett University",
    detail: "B.Tech — Greater Noida, UP",
    years: "2024–2028",
    note: "CGPA: 9.13",
  },
  {
    institution: "Guru Harkrishan Public School",
    detail: "Karnal, Haryana",
    years: "2008–2024",
  },
];

export const achievements: Achievement[] = [
  { badge: "🎓", label: "CBSE Xth Board — 94%" },
  { badge: "🎓", label: "CBSE XIIth Board — 95.6%" },
  { badge: "⭐", label: "CGPA — 9.13" },
];

export const contactItems: ContactItem[] = [
  {
    icon: "fas fa-envelope",
    iconColor: "#ea4335",
    label: "Email",
    value: "kamboj176manvi@gmail.com",
    href: "mailto:kamboj176manvi@gmail.com",
  },
  {
    icon: "fas fa-map-marker-alt",
    iconColor: "#34a853",
    label: "Location",
    value: "Greater Noida, UP",
  },
];

export const socialItems: SocialItem[] = [
  {
    icon: "fab fa-github",
    iconColor: "#f1f5f9",
    platform: "GitHub",
    handle: "@ManviKamboz",
    href: "https://github.com/ManviKamboz",
  },
  {
    icon: "fab fa-linkedin",
    iconColor: "#0A66C2",
    platform: "LinkedIn",
    handle: "@Manvi Kamboj",
    href: "https://linkedin.com/in/manvi-kamboj",
  },
  {
    icon: "fab fa-instagram",
    iconColor: "#E1306C",
    platform: "Instagram",
    handle: "@_kizi.e_",
    href: "https://instagram.com/_kizi.e_",
  },
  {
    icon: "fab fa-x-twitter",
    iconColor: "#1DA1F2",
    platform: "Twitter / X",
    handle: "@manvi_Kamboj17",
    href: "https://twitter.com/manvi_Kamboj17",
  },
  {
    icon: "fab fa-discord",
    iconColor: "#5865F2",
    platform: "Discord",
    handle: "@manvi_Kamboj",
    href: "#",
  },
  {
    icon: "fas fa-code",
    iconColor: "#F89C1D",
    platform: "LeetCode",
    handle: "@master_17",
    href: "https://leetcode.com/master_17",
  },
];

export const devMemes: DevMeme[] = [
  {
    title: "Windows vs Linux",
    imageUrl: "/meme_linux_windows.png",
    caption: "The absolute state of developing on Windows at 3 AM versus standard Linux life.",
  },
  {
    title: "Stack Overflow Down",
    imageUrl: "/meme_stackoverflow.png",
    caption: "When Stack Overflow suffers an outage and GitHub Copilot suddenly starts looking real good.",
  },
];
