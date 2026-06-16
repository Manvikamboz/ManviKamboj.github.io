import "./style.css";
import {
  skills,
  projects,
  education,
  achievements,
  contactItems,
  socialItems,
  certifications,
} from "./data";
import { renderSkills, renderProjects, renderEducation, renderContact, renderLogoLoop, renderCertifications, renderFeaturedProject } from "./render";
import {
  initScrollReveal,
  initNavHighlight,
  initSmoothScroll,
} from "./animations";

// ─── Helper ───────────────────────────────────────────────────────────────────
function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

// ─── Render dynamic sections ─────────────────────────────────────────────────
renderSkills(qs<HTMLElement>("#skills-container"), skills);
renderLogoLoop(qs<HTMLElement>("#logo-loop-slider"), skills);

const startora = projects.find(p => p.name === "Startora Platform");
if (startora) {
  renderFeaturedProject(qs<HTMLElement>("#featured-project-container"), startora);
}

const otherProjects = projects.filter(p => p.name !== "Startora Platform");
renderProjects(qs<HTMLElement>("#creative-projects-container"), otherProjects, "creative");
renderProjects(qs<HTMLElement>("#contribution-projects-container"), otherProjects, "contribution");
renderEducation(qs<HTMLElement>("#education-container"), education, achievements);
renderCertifications(qs<HTMLElement>("#certifications-container"), certifications);
renderContact(qs<HTMLElement>("#contact-container"), contactItems, socialItems);


// ─── Animations & interactivity ──────────────────────────────────────────────
initScrollReveal();
initNavHighlight();
initSmoothScroll();
