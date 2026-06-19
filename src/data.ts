import type {
  Skill,
  Project,
  Education,
  Achievement,
  ContactItem,
  SocialItem,
  Certification,
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
    icon: "fas fa-city",
    name: "Git City",
    description:
      "Your GitHub profile visualized as a beautiful 3D pixel art building inside an interactive virtual city.",
    year: "2026",
    tech: "TypeScript / Canvas / Three.js",
    accentColor: "rgba(244,114,182,0.15)",
    githubUrl: "https://github.com/Manvikamboz/git-city",
    category: "contribution",
    imageUrl: "/open source project website/gitcity.png",
    websiteUrl: "https://thegitcity.com/",
    prStatus: {
      title: "Refactor theme system to configuration-driven key system",
      url: "https://github.com/srizzon/git-city/pull/111",
      state: "open",
    },
  },
  {
    icon: "fas fa-dumbbell",
    name: "FitMart",
    description:
      "Full-stack MERN fitness e-commerce platform featuring an Admin dashboard, Razorpay payments, workout tracker, gym finder, AI chatbot, and BMI calculators.",
    year: "2026",
    tech: "React / Node.js / MongoDB / Express",
    accentColor: "rgba(6,182,212,0.15)",
    githubUrl: "https://github.com/Manvikamboz/FitMart_.",
    category: "contribution",
    imageUrl: "/open source project website/FinMart.png",
    websiteUrl: "https://fitmart-omega.vercel.app/",
    prStatus: {
      title: "fix: add missing FitnessCenter schema fields",
      url: "https://github.com/parthbuilds-community/FitMart/pull/549",
      state: "open",
    },
  },
  {
    icon: "fas fa-cat",
    name: "Cat Facts",
    description:
      "A fun API and subscription service delivering daily facts about cats.",
    year: "2026",
    tech: "Node.js / Express / IFTTT",
    accentColor: "rgba(251,191,36,0.15)",
    githubUrl: "https://github.com/alexwohlbruck/cat-facts",
    category: "contribution",
    imageUrl: "/open source project website/catfacts.png",
    websiteUrl: "https://catfacts.wohlbruck.dev/",
    prStatus: {
      title: "fix: prevent failed IFTTT deliveries from being saved as successful sent status",
      url: "https://github.com/alexwohlbruck/cat-facts/pull/199",
      state: "open",
    },
  },
  {
    icon: "fas fa-dog",
    name: "Dog API Images",
    description:
      "A massive database of dog breed images and database sanitation utilities.",
    year: "2026",
    tech: "Node.js / Scripting",
    accentColor: "rgba(248,113,113,0.15)",
    githubUrl: "https://github.com/jigsawpieces/dog-api-images",
    category: "contribution",
    imageUrl: "/open source project website/dog_api.png",
    websiteUrl: "https://dog.ceo/dog-api/",
    prStatus: {
      title: "Fix image formats, sizes, and remove non-image files in breed directories",
      url: "https://github.com/jigsawpieces/dog-api-images/pull/375",
      state: "merged",
    },
  },
  {
    icon: "fas fa-bolt",
    name: "JAX",
    description:
      "Autograd and XLA for high-performance machine learning research in Python.",
    year: "2026",
    tech: "Python / JIT / C++",
    accentColor: "rgba(16,185,129,0.15)",
    githubUrl: "https://github.com/jax-ml/jax",
    category: "contribution",
    imageUrl: "/open source project website/jax.png",
    websiteUrl: "https://docs.jax.dev/",
    prStatus: {
      title: "Fix JIT compilation cache false hits on closed-over leaked tracers",
      url: "https://github.com/jax-ml/jax/pull/38473",
      state: "open",
    },
  },
  {
    icon: "fas fa-rocket",
    name: "Startora Platform",
    description:
      "A gorgeous launchpad and network directory built using glassmorphic design systems for student founders.",
    year: "2026",
    tech: "React / Tailwind / Node.js",
    accentColor: "rgba(124,58,237,0.15)",
    githubUrl: "https://github.com/Manvikamboz/Startora",
    category: "creative",
    imageUrl: "/startora.png",
    websiteUrl: "https://manvikamboz.github.io/Startora/",
  },
  {
    icon: "fas fa-robot",
    name: "Last30Days AI Agent Skill",
    description:
      "Autonomous agent skill that researches any query across Reddit, X, YouTube, HN, Polymarket, then synthesizes a grounded summary.",
    year: "2026",
    tech: "TypeScript / LLMs / Scrapers",
    accentColor: "rgba(234,179,8,0.15)",
    githubUrl: "https://github.com/Manvikamboz/last30days-skill",
    category: "contribution",
    imageUrl: "/open source project website/last30skills.png",
    websiteUrl: "https://github.com/Manvikamboz/last30days-skill",
    prStatus: {
      title: "fix(youtube): prioritize in-window videos for transcript fetching",
      url: "https://github.com/mvanhorn/last30days-skill/pull/533",
      state: "open",
    },
  },
  {
    icon: "fas fa-car",
    name: "EdgeVision ANPR",
    description:
      "An edge-optimized vehicle intelligence system for Automated Number Plate Recognition using lightweight models.",
    year: "2026",
    tech: "Python / OpenCV / PyTorch",
    accentColor: "rgba(34,197,94,0.15)",
    githubUrl: "https://github.com/Manvikamboz/EdgeVision-ANPR-",
    category: "creative",
  },
  {
    icon: "fas fa-fish",
    name: "Phishing Detection System",
    description:
      "Advanced model-driven classifier built to identify phishing websites and security threats in real-time.",
    year: "2026",
    tech: "Python / Scikit-Learn / Flask",
    accentColor: "rgba(239,68,68,0.15)",
    githubUrl: "https://github.com/Manvikamboz/phishing-detection",
    category: "creative",
  },
  {
    icon: "fas fa-coffee",
    name: "Cafe Management System",
    description:
      "A smart administration system designed for cafes to streamline order handling, menu management, and real-time billing.",
    year: "2024",
    tech: "JavaScript / HTML5 / CSS3",
    accentColor: "rgba(249,115,22,0.15)",
    githubUrl: "https://github.com/Manvikamboz/Cafe_Managment_System",
  },
  {
    icon: "fab fa-node-js",
    name: "Ponytail",
    description:
      "A minimalist constraint layer and audit tool designed for AI coding agents to prevent over-engineering and encourage clean, simple architecture.",
    year: "2026",
    tech: "JavaScript / ESM / Node.js",
    accentColor: "rgba(168,85,247,0.15)",
    githubUrl: "https://github.com/Manvikamboz/ponytail",
    category: "contribution",
    websiteUrl: "https://github.com/DietrichGebert/ponytail",
    prStatus: {
      title: "fix: resolve test failure on Node.js < 20.11.0 by using new URL",
      url: "https://github.com/DietrichGebert/ponytail/pull/157",
      state: "merged",
    },
  },
  {
    icon: "fas fa-bug",
    name: "ClusterFuzz",
    description:
      "Scalable fuzzing infrastructure by Google for finding security vulnerabilities and stability bugs in software.",
    year: "2026",
    tech: "C++ / Python / Go",
    accentColor: "rgba(135,207,62,0.15)",
    githubUrl: "https://github.com/Manvikamboz/clusterfuzz",
    category: "contribution",
    imageUrl: "/open source project website/clusterFuzz.png",
    websiteUrl: "https://google.github.io/clusterfuzz/",
    prStatus: {
      title: "Fix security-sensitive testcase enumeration in issue redirector by enforcing check_access_and_get_testcase",
      url: "https://github.com/google/clusterfuzz/pull/5320",
      state: "open",
    },
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
    note: "CBSE XII Board: 95.6% | CBSE X Board: 94%",
  },
];

export const achievements: Achievement[] = [
  {
    icon: "fab fa-linux",
    label: "Hosted Linux Fest (Member of FOSS BU)",
    description: "Co-organized and hosted the Linux Fest at Bennett University as a member of FOSS BU, driving community engagement and managing core events.",
    images: ["/linux_fest.jpeg", "/linux_fest_photo2.jpeg", "/linux_fest_photo3.jpeg"],
  },
  {
    icon: "fas fa-university",
    label: "Research Visit at IIT Delhi",
    description: "Participated in a research-based visit to IIT Delhi focused on Methane Gas Production & Plantation processes and technologies.",
    images: ["/iit_delhi_photo1.jpeg", "/iit_delhi_photo2.jpeg", "/iit_delhi_photo3.jpeg"],
  },
  {
    icon: "fas fa-eye",
    label: "Finalist in Deep Sight AI Challenge",
    description: "Developed deep learning models for high-accuracy video detection and analytics.",
    images: ["/deep_sight_challenge_photo1.jpeg", "/deep_sight_challenge_photo2.jpeg"],
  },
];

export const contactItems: ContactItem[] = [
  {
    icon: "fas fa-envelope",
    iconColor: "#ea4335",
    label: "Email",
    value: "kamboj176manvi@gmail.com",
    href: "mailto:kamboj176manvi@gmail.com",
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
    handle: "manvi-kamboj-6ba4a7322",
    href: "https://www.linkedin.com/in/manvi-kamboj-6ba4a7322",
  },
  {
    icon: "fab fa-x-twitter",
    iconColor: "#1DA1F2",
    platform: "Twitter / X",
    handle: "@manvi_Kamboj17",
    href: "https://twitter.com/manvi_Kamboj17",
  },
];

export const certifications: Certification[] = [
  {
    title: "Operating Systems and You: Becoming a Power User",
    issuer: "Google (Coursera)",
    date: "Mar 2026",
    icon: "fas fa-desktop",
    credentialUrl: "https://coursera.org/verify/NT3JXFAVIKBJ",
  },
  {
    title: "Design Thinking: Ideas to Action",
    issuer: "University of Virginia (Coursera)",
    date: "Feb 2026",
    icon: "fas fa-lightbulb",
    credentialUrl: "https://coursera.org/verify/3FTTHZSALXM6",
  },
  {
    title: "Introduction to Cybersecurity Tools & Cyberattacks",
    issuer: "IBM (Coursera)",
    date: "Mar 2026",
    icon: "fas fa-shield-alt",
    credentialUrl: "https://coursera.org/verify/9ZLPSD2B3M7U",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google (Coursera)",
    date: "Mar 2026",
    icon: "fas fa-network-wired",
    credentialUrl: "https://coursera.org/verify/4BUNR2N019IP",
  },
];
