// ─── Scroll Reveal ───────────────────────────────────────────────────────────

export function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add("visible");
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ─── Active Nav Highlight ────────────────────────────────────────────────────

export function initNavHighlight(): void {
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");

  const onScroll = (): void => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${current}`;
      a.style.color = isActive ? "#f1f5f9" : "";
      a.style.fontWeight = isActive ? "600" : "";
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ─── Typed Cursor Effect ─────────────────────────────────────────────────────

export function initTypedEffect(
  el: HTMLElement,
  words: string[],
  speed = 90,
  pause = 2000
): void {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = (): void => {
    const currentWord = words[wordIndex];

    if (!deleting) {
      el.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      el.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  };

  tick();
}

// ─── Smooth Scroll for nav links ─────────────────────────────────────────────

export function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
