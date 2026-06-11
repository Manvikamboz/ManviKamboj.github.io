import "./style.css";
import {
  skills,
  projects,
  education,
  achievements,
  contactItems,
  socialItems,
  devMemes,
} from "./data";
import { renderSkills, renderProjects, renderEducation, renderContact, renderMemes } from "./render";
import {
  initScrollReveal,
  initNavHighlight,
  initTypedEffect,
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
renderProjects(qs<HTMLElement>("#projects-container"), projects);
renderMemes(qs<HTMLElement>("#memes-container"), devMemes);
renderEducation(qs<HTMLElement>("#education-container"), education, achievements);
renderContact(qs<HTMLElement>("#contact-container"), contactItems, socialItems);

// ─── Typed effect on hero subtitle ──────────────────────────────────────────
const typedEl = document.querySelector<HTMLElement>("#typed-role");
if (typedEl) {
  initTypedEffect(typedEl, ["compiles code", "breaks prod", "runs linux", "drinks coffee", "fights windows update"], 80, 2200);
}

// ─── Animations & interactivity ──────────────────────────────────────────────
initScrollReveal();
initNavHighlight();
initSmoothScroll();
