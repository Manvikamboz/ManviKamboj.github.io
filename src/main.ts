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
import {
  renderLayout,
  renderSkills,
  renderProjects,
  renderEducation,
  renderContact,
  renderLogoLoop,
  renderCertifications,
  renderFeaturedProject,
} from "./render";
import {
  initScrollReveal,
  initNavHighlight,
  initSmoothScroll,
} from "./animations";

// ─── Mount Layout ────────────────────────────────────────────────────────────
const app = document.getElementById("app");
if (!app) throw new Error("Root app element not found!");

const containers = renderLayout(app);

// ─── Render dynamic sections ─────────────────────────────────────────────────
renderSkills(containers.skillsContainer, skills);
renderLogoLoop(containers.logoLoopTop, skills);
renderLogoLoop(containers.logoLoopBottom, skills);

const startora = projects.find(p => p.name === "Startora Platform");
if (startora) {
  renderFeaturedProject(containers.featuredContainer, startora);
}

const otherProjects = projects.filter(p => p.name !== "Startora Platform");
renderProjects(containers.creativeContainer, otherProjects, "creative");
renderProjects(containers.contributionContainer, otherProjects, "contribution");
renderEducation(containers.educationContainer, education, achievements);
renderCertifications(containers.certificationsContainer, certifications);
renderContact(containers.contactContainer, contactItems, socialItems);

// ─── Animations & interactivity ──────────────────────────────────────────────
initScrollReveal();
initNavHighlight();
initSmoothScroll();
