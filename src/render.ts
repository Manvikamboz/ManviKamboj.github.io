import type { Skill, Project, Education, Achievement, ContactItem, SocialItem, DevMeme } from "./types";

// ─── Generic element creator ─────────────────────────────────────────────────

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classes: string = "",
  html: string = ""
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (classes) e.className = classes;
  if (html) e.innerHTML = html;
  return e;
}

// ─── Skill chip ──────────────────────────────────────────────────────────────

function renderChip(skill: Skill): HTMLSpanElement {
  const chip = el("span", `chip ${skill.category}`);
  chip.innerHTML = `<i class="${skill.icon}"></i> ${skill.label}`;
  return chip;
}

// ─── Skills Section ──────────────────────────────────────────────────────────

export function renderSkills(
  container: HTMLElement,
  skills: Skill[]
): void {
  const categories: { key: Skill["category"]; title: string }[] = [
    { key: "lang", title: "Languages" },
    { key: "fw", title: "Frameworks" },
    { key: "tool", title: "Tools & Platforms" },
  ];

  const grid = el("div", "skills-grid");

  categories.forEach(({ key, title }) => {
    const card = el("div", "card skill-card reveal");
    const heading = el("h3", "", title);
    const chipList = el("div", "chip-list");

    skills
      .filter((s) => s.category === key)
      .forEach((s) => chipList.appendChild(renderChip(s)));

    card.appendChild(heading);
    card.appendChild(chipList);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ─── Projects Section ────────────────────────────────────────────────────────

export function renderProjects(
  container: HTMLElement,
  projects: Project[]
): void {
  const grid = el("div", "projects-grid");

  projects.forEach((p) => {
    const card = p.githubUrl ? (el("a", "card project-card reveal") as HTMLAnchorElement) : el("div", "card project-card reveal");
    if (p.githubUrl && card instanceof HTMLAnchorElement) {
      card.href = p.githubUrl;
      card.target = "_blank";
      card.rel = "noopener";
      card.style.textDecoration = "none";
      card.style.color = "inherit";
    }

    const icon = el("div", "project-icon");
    icon.style.background = p.accentColor;
    icon.textContent = p.emoji;

    const title = el("h3", "", p.githubUrl ? `${p.name} <i class="fas fa-external-link-alt" style="font-size:0.8rem;margin-left:5px;opacity:0.7"></i>` : p.name);
    const desc = el("p", "", p.description);
    const year = el(
      "div",
      "project-year",
      `<i class="fas fa-calendar-alt"></i> ${p.year} &nbsp;·&nbsp; ${p.tech}`
    );

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(year);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ─── Memes Section ───────────────────────────────────────────────────────────

export function renderMemes(
  container: HTMLElement,
  memes: DevMeme[]
): void {
  const grid = el("div", "memes-grid");

  memes.forEach((m) => {
    // OS Window Mockup style card
    const card = el("div", "card meme-card reveal");
    
    // Window header bar
    const winHeader = el("div", "win-header");
    const dots = el("div", "win-dots");
    dots.appendChild(el("span", "dot red"));
    dots.appendChild(el("span", "dot yellow"));
    dots.appendChild(el("span", "dot green"));
    
    const winTitle = el("div", "win-title", m.title);
    winHeader.appendChild(dots);
    winHeader.appendChild(winTitle);
    
    // Window Body
    const winBody = el("div", "win-body");
    const img = el("img");
    
    // Resolve imageUrl with the base path if it starts with "/"
    let src = m.imageUrl;
    if (src.startsWith("/")) {
      src = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${src}`;
    }
    img.src = src;
    img.alt = m.title;
    img.loading = "lazy";
    
    const caption = el("p", "meme-caption", m.caption);
    
    winBody.appendChild(img);
    winBody.appendChild(caption);
    
    card.appendChild(winHeader);
    card.appendChild(winBody);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ─── Education & Achievements ────────────────────────────────────────────────

export function renderEducation(
  container: HTMLElement,
  education: Education[],
  achievements: Achievement[]
): void {
  const twoCol = el("div", "two-col");

  // Education card
  const eduCard = el("div", "card reveal");
  const eduHeading = el(
    "h3",
    "",
    "Education"
  );
  eduHeading.style.cssText =
    "margin-bottom:1.2rem;font-size:1rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em";
  const timeline = el("div", "timeline");

  education.forEach((e) => {
    const item = el("div", "timeline-item");
    const dot = el("div", "timeline-dot");
    const content = el("div", "timeline-content");
    const title = el("h4", "", e.institution);
    const detail = el("p", "", `${e.detail} &nbsp;·&nbsp; ${e.years}`);
    content.appendChild(title);
    content.appendChild(detail);
    if (e.note) {
      const note = el("p", "", e.note);
      note.style.cssText =
        "color:#a78bfa;margin-top:0.3rem;font-size:0.82rem";
      content.appendChild(note);
    }
    item.appendChild(dot);
    item.appendChild(content);
    timeline.appendChild(item);
  });

  eduCard.appendChild(eduHeading);
  eduCard.appendChild(timeline);

  // Achievements card
  const achCard = el("div", "card reveal");
  const achHeading = el("h3", "", "Achievements");
  achHeading.style.cssText =
    "margin-bottom:1.2rem;font-size:1rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em";
  const achList = el("div", "ach-list");

  achievements.forEach((a) => {
    const item = el("div", "ach-item");
    const badge = el("span", "ach-badge", a.badge);
    const label = el("span", "", a.label);
    item.appendChild(badge);
    item.appendChild(label);
    achList.appendChild(item);
  });

  achCard.appendChild(achHeading);
  achCard.appendChild(achList);

  twoCol.appendChild(eduCard);
  twoCol.appendChild(achCard);
  container.appendChild(twoCol);
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function makeContactCard(
  icon: string,
  color: string,
  label: string,
  value: string,
  href?: string
): HTMLElement {
  const tag = href ? "a" : "div";
  const item = document.createElement(tag) as HTMLAnchorElement | HTMLDivElement;
  item.className = "contact-item reveal";
  if (href && item instanceof HTMLAnchorElement) {
    item.href = href;
    item.target = href.startsWith("http") ? "_blank" : "";
    item.rel = "noopener";
  }
  item.innerHTML = `
    <div class="contact-icon" style="color:${color}"><i class="${icon}"></i></div>
    <div>
      <div style="font-weight:600;margin-bottom:0.1rem">${label}</div>
      <div style="color:var(--muted)">${value}</div>
    </div>`;
  return item;
}

export function renderContact(
  container: HTMLElement,
  contactItems: ContactItem[],
  socialItems: SocialItem[]
): void {
  const grid = el("div", "contact-grid");

  contactItems.forEach((c) => {
    grid.appendChild(
      makeContactCard(c.icon, c.iconColor, c.label, c.value, c.href)
    );
  });

  socialItems.forEach((s) => {
    grid.appendChild(
      makeContactCard(s.icon, s.iconColor, s.platform, s.handle, s.href)
    );
  });

  container.appendChild(grid);
}
