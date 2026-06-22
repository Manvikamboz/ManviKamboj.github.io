import type { Skill, Project, Education, Achievement, ContactItem, SocialItem, Certification } from "./types";

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
  projects: Project[],
  category?: "creative" | "contribution"
): void {
  const grid = el("div", "projects-grid");
  let filtered = category ? projects.filter((p) => p.category === category) : projects;

  if (category === "contribution") {
    filtered = [...filtered].sort((a, b) => {
      const stateA = a.prStatus?.state || "";
      const stateB = b.prStatus?.state || "";
      const order = { merged: 1, open: 2, closed: 3 };
      const valA = order[stateA as keyof typeof order] || 99;
      const valB = order[stateB as keyof typeof order] || 99;
      return valA - valB;
    }).slice(0, 6);
  }

  filtered.forEach((p) => {
    const targetUrl = p.websiteUrl || p.githubUrl || "#";
    const card = el("a", "card project-card reveal") as HTMLAnchorElement;
    card.href = targetUrl;
    card.target = "_blank";
    card.rel = "noopener";
    card.style.textDecoration = "none";
    card.style.color = "inherit";

    const isMergedPr = p.prStatus?.state === "merged";
    let containerForContent: HTMLElement = card;

    if (isMergedPr) {
      card.classList.add("electric-border");
      card.style.setProperty("--electric-border-color", "#a78bfa");
      card.style.borderRadius = "12px";
      card.style.border = "none";
      card.style.overflow = "visible";

      // Canvas Container
      const canvasContainer = el("div", "eb-canvas-container");
      const canvas = el("canvas", "eb-canvas") as HTMLCanvasElement;
      canvasContainer.appendChild(canvas);
      card.appendChild(canvasContainer);

      // Glow Layers
      const layers = el("div", "eb-layers");
      layers.appendChild(el("div", "eb-glow-1"));
      layers.appendChild(el("div", "eb-glow-2"));
      layers.appendChild(el("div", "eb-background-glow"));
      card.appendChild(layers);

      // Content Wrapper
      const ebContent = el("div", "eb-content");
      ebContent.style.borderRadius = "12px";
      ebContent.style.height = "100%";
      ebContent.style.display = "flex";
      ebContent.style.flexDirection = "column";
      card.appendChild(ebContent);
      
      containerForContent = ebContent;

      setTimeout(() => {
        setupElectricBorder(card, canvas, "#a78bfa", 1, 0.12, 12);
      }, 0);
    }

    // Image preview wrapper
    if (p.imageUrl) {
      const imgWrapper = el("div", "project-image-wrapper");
      const img = el("img") as HTMLImageElement;
      let src = p.imageUrl;
      if (src.startsWith("/")) {
        src = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${src}`;
      }
      img.src = src;
      img.alt = p.name;
      img.loading = "lazy";

      if (p.githubUrl) {
        imgWrapper.style.cursor = "pointer";
        imgWrapper.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(p.githubUrl, "_blank", "noopener");
        });
      }

      imgWrapper.appendChild(img);
      containerForContent.appendChild(imgWrapper);
    }

    // Card Content Container
    const content = el("div", "project-card-content");

    const header = el("div", "project-card-header");
    const icon = el("div", "project-icon");
    icon.style.background = p.accentColor;
    icon.innerHTML = `<i class="${p.icon}"></i>`;
    header.appendChild(icon);

    // Title with link icons
    let titleHtml = p.name;
    if (p.websiteUrl) {
      titleHtml += ` <i class="fas fa-external-link-alt" style="font-size:0.8rem;margin-left:5px;opacity:0.7" title="Live Site"></i>`;
    }
    const title = el("h3", "", titleHtml);
    header.appendChild(title);
    content.appendChild(header);

    const desc = el("p", "", p.description);
    content.appendChild(desc);

    // PR Status block
    if (p.prStatus) {
      const prContainer = el("div", "project-pr-container");
      const prBadge = el("a", `pr-badge ${p.prStatus.state}`) as HTMLAnchorElement;
      prBadge.href = p.prStatus.url;
      prBadge.target = "_blank";
      prBadge.rel = "noopener";
      
      const iconClass = p.prStatus.state === "merged" ? "fas fa-git-merge" : "fas fa-git-pull-request";
      const prText = p.prStatus.state === "merged" ? "PR Merged" : "PR Active";
      const prNum = p.prStatus.url.split("/").pop();
      prBadge.innerHTML = `<i class="${iconClass}"></i> ${prText} #${prNum}`;
      prBadge.addEventListener("click", (e) => e.stopPropagation());

      const prTitle = el("span", "pr-title", p.prStatus.title);
      prTitle.title = p.prStatus.title;

      prContainer.appendChild(prBadge);
      prContainer.appendChild(prTitle);
      content.appendChild(prContainer);
    }

    // Footer with year/tech and external code link if card points to live site
    const footer = el("div", "project-card-footer");
    const yearInfo = el(
      "span",
      "project-year",
      `<i class="fas fa-calendar-alt"></i> ${p.year} &nbsp;·&nbsp; ${p.tech}`
    );
    footer.appendChild(yearInfo);

    if (p.websiteUrl && p.githubUrl) {
      const ghLink = el("a", "project-code-link") as HTMLAnchorElement;
      ghLink.href = p.githubUrl;
      ghLink.target = "_blank";
      ghLink.rel = "noopener";
      ghLink.innerHTML = `<i class="fab fa-github"></i> Code`;
      ghLink.addEventListener("click", (e) => e.stopPropagation());
      footer.appendChild(ghLink);
    }

    content.appendChild(footer);
    containerForContent.appendChild(content);
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

function openImageModal(src: string, alt: string): void {
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(5, 7, 10, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(0, 245, 212, 0.2);
    border: 1px solid rgba(255,255,255,0.1);
    transform: scale(0.95);
    transition: transform 0.3s ease;
  `;

  modal.appendChild(img);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = "1";
    img.style.transform = "scale(1)";
  }, 10);

  const closeModal = () => {
    modal.style.opacity = "0";
    img.style.transform = "scale(0.95)";
    setTimeout(() => {
      modal.remove();
    }, 300);
  };

  modal.addEventListener("click", closeModal);
}

// Achievements card
  const achCard = el("div", "card reveal");
  const achHeading = el("h3", "", "Achievements");
  achHeading.style.cssText =
    "margin-bottom:1.2rem;font-size:1rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em";
  const achList = el("div", "ach-list");

  achievements.forEach((a) => {
    const item = el("div", "ach-item");
    
    const header = el("div", "ach-item-header");
    const badge = el("span", "ach-badge");
    badge.innerHTML = `<i class="${a.icon}" style="color:var(--accent)"></i>`;
    const label = el("span", "ach-label", a.label);
    header.appendChild(badge);
    header.appendChild(label);
    item.appendChild(header);

    if (a.description) {
      const desc = el("div", "ach-item-desc", a.description);
      item.appendChild(desc);
    }

    if (a.images && a.images.length > 0) {
      const slider = el("div", "ach-image-slider");
      a.images.forEach((imgSrc) => {
        let src = imgSrc;
        if (src.startsWith("/")) {
          src = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${src}`;
        }
        const thumb = el("img", "ach-thumb") as HTMLImageElement;
        thumb.src = src;
        thumb.alt = a.label;
        thumb.loading = "lazy";
        
        thumb.addEventListener("click", (e) => {
          e.stopPropagation();
          openImageModal(src, a.label);
        });

        slider.appendChild(thumb);
      });
      item.appendChild(slider);
    }

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

export function renderLogoLoop(
  container: HTMLElement,
  skillsList: Skill[]
): void {
  const track = el("div", "logo-loop-track");

  // Duplicate the list of skills to ensure smooth infinite loop transition
  const fullList = [...skillsList, ...skillsList];

  fullList.forEach((s) => {
    const item = el("div", "logo-item");
    item.innerHTML = `<i class="${s.icon}"></i>`;
    track.appendChild(item);
  });

  container.appendChild(track);
}

export function renderCertifications(
  container: HTMLElement,
  certs: Certification[]
): void {
  const grid = el("div", "certifications-grid");

  certs.forEach((c) => {
    let href = c.credentialUrl;
    if (href && href.startsWith("/")) {
      href = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${href}`;
    }
    const card = href ? (el("a", "card cert-card reveal") as HTMLAnchorElement) : el("div", "card cert-card reveal");
    if (href && card instanceof HTMLAnchorElement) {
      card.href = href;
      card.target = "_blank";
      card.rel = "noopener";
      card.style.textDecoration = "none";
      card.style.color = "inherit";
    }

    const header = el("div", "cert-header");
    const iconWrapper = el("div", "cert-icon");
    iconWrapper.innerHTML = `<i class="${c.icon}"></i>`;
    header.appendChild(iconWrapper);

    const body = el("div", "cert-body");
    const title = el("h3", "", href ? `${c.title} <i class="fas fa-external-link-alt" style="font-size:0.75rem;margin-left:4px;opacity:0.6"></i>` : c.title);
    const issuer = el("div", "cert-issuer", c.issuer);
    const date = el("div", "cert-date", `<i class="fas fa-calendar-alt"></i> ${c.date}`);

    body.appendChild(title);
    body.appendChild(issuer);
    body.appendChild(date);

    card.appendChild(header);
    card.appendChild(body);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

export function renderFeaturedProject(
  container: HTMLElement,
  project: Project
): void {
  container.innerHTML = "";

  const card = el("div", "card featured-project-card electric-border reveal");
  card.style.setProperty("--electric-border-color", "#7df9ff");
  card.style.borderRadius = "16px";

  // Canvas Container
  const canvasContainer = el("div", "eb-canvas-container");
  const canvas = el("canvas", "eb-canvas") as HTMLCanvasElement;
  canvasContainer.appendChild(canvas);
  card.appendChild(canvasContainer);

  // Glow Layers
  const layers = el("div", "eb-layers");
  layers.appendChild(el("div", "eb-glow-1"));
  layers.appendChild(el("div", "eb-glow-2"));
  layers.appendChild(el("div", "eb-background-glow"));
  card.appendChild(layers);

  // Content Wrapper
  const ebContent = el("div", "eb-content");

  const mainRow = el("div", "featured-main-row");

  // Screenshot column
  if (project.imageUrl) {
    const imgCol = el("a", "featured-img-col") as HTMLAnchorElement;
    imgCol.href = project.websiteUrl || project.githubUrl || "#";
    imgCol.target = "_blank";
    imgCol.rel = "noopener";

    const img = el("img") as HTMLImageElement;
    let src = project.imageUrl;
    if (src.startsWith("/")) {
      src = `${import.meta.env.BASE_URL.replace(/\/$/, "")}${src}`;
    }
    img.src = src;
    img.alt = project.name;
    img.loading = "lazy";
    imgCol.appendChild(img);
    mainRow.appendChild(imgCol);
  }

  const rightCol = el("div", "featured-right-col");

  // Header row (icon + title)
  const headerRow = el("div", "featured-header-row");
  const icon = el("div", "featured-icon");
  icon.style.background = project.accentColor;
  icon.innerHTML = `<i class="${project.icon}"></i>`;
  
  const title = el("h3", "", project.name);
  headerRow.appendChild(icon);
  headerRow.appendChild(title);
  rightCol.appendChild(headerRow);

  const desc = el("p", "", project.description);
  rightCol.appendChild(desc);
  
  const techList = el("div", "featured-tech-list");
  project.tech.split(" / ").forEach((t) => {
    const chip = el("span", "featured-tech-chip", t);
    techList.appendChild(chip);
  });
  rightCol.appendChild(techList);

  const actions = el("div", "featured-actions");
  if (project.githubUrl) {
    const codeBtn = el("a", "btn btn-outline featured-btn") as HTMLAnchorElement;
    codeBtn.href = project.githubUrl;
    codeBtn.target = "_blank";
    codeBtn.rel = "noopener";
    codeBtn.innerHTML = `<i class="fab fa-github"></i> Source Code`;
    actions.appendChild(codeBtn);
  }
  if (project.websiteUrl) {
    const liveBtn = el("a", "btn btn-primary featured-btn") as HTMLAnchorElement;
    liveBtn.href = project.websiteUrl;
    liveBtn.target = "_blank";
    liveBtn.rel = "noopener";
    liveBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> Live Site`;
    actions.appendChild(liveBtn);
  }
  rightCol.appendChild(actions);

  mainRow.appendChild(rightCol);
  ebContent.appendChild(mainRow);
  card.appendChild(ebContent);
  
  container.appendChild(card);

  // Start the canvas electric border animation
  setupElectricBorder(card, canvas, "#7df9ff", 1, 0.12, 16);
}

function setupElectricBorder(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  color: string,
  speed: number,
  chaos: number,
  borderRadius: number
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let animationFrameId: number | null = null;
  let time = 0;
  let lastFrameTime = 0;

  // Precomputed random table for noise to avoid Math.sin calls in the hot path
  const randomTableSize = 4096;
  const randomTable = new Float32Array(randomTableSize);
  for (let i = 0; i < randomTableSize; i++) {
    randomTable[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  }

  const random = (x: number): number => {
    const idx = Math.abs(x | 0) % randomTableSize;
    return randomTable[idx];
  };

  const noise2D = (x: number, y: number): number => {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;

    const a = random(i + j * 57);
    const b = random(i + 1 + j * 57);
    const c = random(i + (j + 1) * 57);
    const d = random(i + 1 + (j + 1) * 57);

    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);

    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
  };

  const octavedNoise = (
    x: number,
    octaves: number,
    lacunarity: number,
    gain: number,
    baseAmplitude: number,
    baseFrequency: number,
    timeVal: number,
    seed: number,
    baseFlatness: number
  ): number => {
    let y = 0;
    let amplitude = baseAmplitude;
    let frequency = baseFrequency;

    for (let i = 0; i < octaves; i++) {
      let octaveAmplitude = amplitude;
      if (i === 0) {
        octaveAmplitude *= baseFlatness;
      }
      y += octaveAmplitude * noise2D(frequency * x + seed * 100, timeVal * frequency * 0.3);
      frequency *= lacunarity;
      amplitude *= gain;
    }

    return y;
  };

  const getCornerPoint = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    arcLength: number,
    progress: number
  ): { x: number; y: number } => {
    const angle = startAngle + progress * arcLength;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const getRoundedRectPoint = (
    t: number,
    left: number,
    top: number,
    borderWidth: number,
    borderHeight: number,
    radius: number,
    straightWidth: number,
    straightHeight: number,
    cornerArc: number,
    totalPerimeter: number
  ): { x: number; y: number } => {
    const distance = t * totalPerimeter;
    let accumulated = 0;

    if (distance <= accumulated + straightWidth) {
      const progress = (distance - accumulated) / straightWidth;
      return { x: left + radius + progress * straightWidth, y: top };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + borderWidth - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      const progress = (distance - accumulated) / straightHeight;
      return { x: left + borderWidth, y: top + radius + progress * straightHeight };
    }
    accumulated += straightHeight;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + borderWidth - radius, top + borderHeight - radius, radius, 0, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightWidth) {
      const progress = (distance - accumulated) / straightWidth;
      return { x: left + borderWidth - radius - progress * straightWidth, y: top + borderHeight };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + borderHeight - radius, radius, Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      const progress = (distance - accumulated) / straightHeight;
      return { x: left, y: top + borderHeight - radius - progress * straightHeight };
    }
    accumulated += straightHeight;

    const progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
  };

  // Noise config: optimized by reducing octaves from 10 to 3
  const octaves = 3;
  const lacunarity = 1.6;
  const gain = 0.7;
  const amplitude = chaos;
  const frequency = 10;
  const baseFlatness = 0;
  const displacement = 60;
  const borderOffset = 60;

  const isMobileQuery = window.matchMedia("(max-width: 768px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let isIntersecting = false;
  let isMobile = isMobileQuery.matches;
  let prefersReducedMotion = reducedMotionQuery.matches;

  const shouldRunAnimation = () => {
    return isIntersecting && !isMobile && !prefersReducedMotion;
  };

  const updateSize = () => {
    const rect = container.getBoundingClientRect();
    const width = rect.width + borderOffset * 2;
    const height = rect.height + borderOffset * 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    return { width, height };
  };

  let width = 0;
  let height = 0;

  if (!isMobile && !prefersReducedMotion) {
    const size = updateSize();
    width = size.width;
    height = size.height;
  }

  const drawElectricBorder = (currentTime: number) => {
    if (!shouldRunAnimation()) {
      animationFrameId = null;
      return;
    }

    if (lastFrameTime === 0) {
      lastFrameTime = currentTime;
    }
    const deltaTime = (currentTime - lastFrameTime) / 1000;
    time += deltaTime * speed;
    lastFrameTime = currentTime;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const scale = displacement;
    const left = borderOffset;
    const top = borderOffset;
    const borderWidth = width - 2 * borderOffset;
    const borderHeight = height - 2 * borderOffset;
    const maxRadius = Math.min(borderWidth, borderHeight) / 2;
    const radius = Math.min(borderRadius, maxRadius);

    // Precompute straight dimensions and arc segments
    const straightWidth = borderWidth - 2 * radius;
    const straightHeight = borderHeight - 2 * radius;
    const cornerArc = (Math.PI * radius) / 2;
    const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;

    // Optimized sample count: divisor increased from 2 to 6
    const sampleCount = Math.floor(totalPerimeter / 6);

    ctx.beginPath();

    for (let i = 0; i <= sampleCount; i++) {
      const progress = i / sampleCount;

      const point = getRoundedRectPoint(
        progress,
        left,
        top,
        borderWidth,
        borderHeight,
        radius,
        straightWidth,
        straightHeight,
        cornerArc,
        totalPerimeter
      );

      const xNoise = octavedNoise(
        progress * 8,
        octaves,
        lacunarity,
        gain,
        amplitude,
        frequency,
        time,
        0,
        baseFlatness
      );
      const yNoise = octavedNoise(
        progress * 8,
        octaves,
        lacunarity,
        gain,
        amplitude,
        frequency,
        time,
        1,
        baseFlatness
      );

      const displacedX = point.x + xNoise * scale;
      const displacedY = point.y + yNoise * scale;

      if (i === 0) {
        ctx.moveTo(displacedX, displacedY);
      } else {
        ctx.lineTo(displacedX, displacedY);
      }
    }

    ctx.closePath();
    ctx.stroke();

    animationFrameId = requestAnimationFrame(drawElectricBorder);
  };

  const handleMediaChange = () => {
    isMobile = isMobileQuery.matches;
    prefersReducedMotion = reducedMotionQuery.matches;

    if (isMobile || prefersReducedMotion) {
      canvas.style.display = "none";
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      canvas.style.display = "block";
      const size = updateSize();
      width = size.width;
      height = size.height;
      if (shouldRunAnimation() && !animationFrameId) {
        lastFrameTime = 0;
        animationFrameId = requestAnimationFrame(drawElectricBorder);
      }
    }
  };

  isMobileQuery.addEventListener("change", handleMediaChange);
  reducedMotionQuery.addEventListener("change", handleMediaChange);

  const resizeObserver = new ResizeObserver(() => {
    if (isMobile || prefersReducedMotion) return;
    const size = updateSize();
    width = size.width;
    height = size.height;
  });
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (shouldRunAnimation() && !animationFrameId) {
          lastFrameTime = 0;
          animationFrameId = requestAnimationFrame(drawElectricBorder);
        } else if (!isIntersecting && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      });
    },
    { threshold: 0.01 }
  );
  intersectionObserver.observe(container);

  // Initial trigger
  handleMediaChange();

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    isMobileQuery.removeEventListener("change", handleMediaChange);
    reducedMotionQuery.removeEventListener("change", handleMediaChange);
  };
}

export function renderLayout(app: HTMLElement): {
  skillsContainer: HTMLElement;
  logoLoopTop: HTMLElement;
  logoLoopBottom: HTMLElement;
  featuredContainer: HTMLElement;
  creativeContainer: HTMLElement;
  contributionContainer: HTMLElement;
  educationContainer: HTMLElement;
  certificationsContainer: HTMLElement;
  contactContainer: HTMLElement;
} {
  app.innerHTML = `
    <div class="bg-canvas"></div>
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>
    <div class="orb orb3"></div>

    <!-- NAV -->
    <nav>
      <div class="nav-logo">MK</div>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#certifications">Certifications</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="./resume.pdf" target="_blank" rel="noopener">Resume</a></li>
      </ul>
    </nav>

    <!-- HERO -->
    <section class="hero" id="about">
      <div class="hero-text">
        <h1>Hi, I'm <span class="name">Manvi Kamboj</span></h1>
        <div class="hero-role">Software Developer</div>
        <p class="hero-sub">Specializing in high-performance computer vision pipelines, open-source infrastructure tools, and kernel-level scripts.</p>
        <div class="hero-quote">"Simplicity is the soul of efficiency."</div>
        <div class="hero-btns">
          <a href="#contact" class="btn btn-primary">Get in Touch <i class="fas fa-arrow-right"></i></a>
          <a href="#projects" class="btn btn-outline">View Projects <i class="fas fa-code"></i></a>
          <a href="./resume.pdf" target="_blank" rel="noopener" class="btn btn-outline"><i class="fas fa-file-pdf"></i> Resume</a>
        </div>
      </div>
      
      <!-- Terminal Card (Replaced Avatar) -->
      <div class="hero-terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn-dot close"></span>
            <span class="btn-dot minimize"></span>
            <span class="btn-dot expand"></span>
          </div>
          <div class="terminal-title">manvi@kernel:~</div>
        </div>
        <div class="terminal-body">
          <div class="line"><span class="cmd-prompt">manvi@kernel:~$</span> neofetch</div>
          <div class="neofetch-output">
            <span class="ascii-art">
              /\\_/\\<br/>
             ( o.o )<br/>
              &gt; ^ &lt;<br/>
            </span>
            <div class="sys-info">
              <span class="info-label">OS:</span> Linux <br/>
              <span class="info-label">Host:</span> Bennett University B.Tech <br/>
              <span class="info-label">Kernel:</span> 2006.10.17-manvi <br/>
              <span class="info-label">Uptime:</span> 19 years <br/>
              <span class="info-label">Shell:</span> bash 5.2 <br/>
              <span class="info-label">CPU:</span> Logic Engine <br/>
              <span class="info-label">Memory:</span> 9.13 CGPA / 10 <br/>
              <span class="info-label">Status:</span> Open Source Buddy
            </div>
          </div>
          <div class="line"><span class="cmd-prompt">manvi@kernel:~$</span> <span class="cursor-blink">█</span></div>
        </div>
      </div>
    </section>

    <!-- LOGO LOOP MARQUEE (TOP) -->
    <section class="logo-loop-section reveal">
      <div class="logo-loop-slider" id="logo-loop-slider-top"></div>
    </section>

    <!-- SKILLS -->
    <section class="section" id="skills">
      <div class="section-label reveal">Technical Skills</div>
      <h2 class="section-title reveal">What I Work With</h2>
      <div id="skills-container"></div>
    </section>

    <!-- LOGO LOOP MARQUEE -->
    <section class="logo-loop-section reveal">
      <div class="logo-loop-slider" id="logo-loop-slider"></div>
    </section>

    <!-- PROJECTS -->
    <section class="section" id="projects">
      <div class="section-label reveal">Portfolio</div>
      <h2 class="section-title reveal">Featured Projects</h2>
      
      <div id="featured-project-container" style="margin-bottom: 5rem;"></div>
      
      <div class="section-label reveal">Creatively Crafted</div>
      <h2 class="section-title reveal">Self Creative</h2>
      <div id="creative-projects-container" style="margin-bottom: 5rem;"></div>

      <div class="section-label reveal">Open Source Contributions</div>
      <h2 class="section-title reveal">Open Source Projects</h2>
      <div id="contribution-projects-container"></div>
    </section>

    <!-- EDUCATION & ACHIEVEMENTS -->
    <section class="section" id="education">
      <div class="section-label reveal">Background</div>
      <h2 class="section-title reveal">Education &amp; Achievements</h2>
      <div id="education-container"></div>
    </section>

    <!-- CERTIFICATIONS -->
    <section class="section" id="certifications">
      <div class="section-label reveal">Credentials</div>
      <h2 class="section-title reveal">Certifications</h2>
      <div id="certifications-container"></div>
    </section>

    <!-- CONTACT -->
    <section class="section" id="contact">
      <div class="section-label reveal">Get in Touch</div>
      <h2 class="section-title reveal">Contact &amp; Socials</h2>
      <div id="contact-container"></div>
    </section>

    <!-- FOOTER -->
    <footer>
      <p>Designed &amp; built by <strong>Manvi Kamboj</strong> &nbsp;·&nbsp; Greater Noida, India</p>
    </footer>
  `;

  return {
    skillsContainer: document.getElementById("skills-container")!,
    logoLoopTop: document.getElementById("logo-loop-slider-top")!,
    logoLoopBottom: document.getElementById("logo-loop-slider")!,
    featuredContainer: document.getElementById("featured-project-container")!,
    creativeContainer: document.getElementById("creative-projects-container")!,
    contributionContainer: document.getElementById("contribution-projects-container")!,
    educationContainer: document.getElementById("education-container")!,
    certificationsContainer: document.getElementById("certifications-container")!,
    contactContainer: document.getElementById("contact-container")!,
  };
}
