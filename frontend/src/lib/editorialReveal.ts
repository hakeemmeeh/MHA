import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Editorial hero type motion aligned with Rhye-style portfolio heroes (masked lines +
 * vertical image clip), e.g. https://artemsemkin.com/rhye/wp/portfolio/cassio-apartment/
 */
gsap.registerPlugin(ScrollTrigger);

const WORD_CLASS = "editorial-reveal-word";

/** Treat words on the same baseline row as one line (avoids per-word reveals if metrics jitter). */
const LINE_TOP_EPSILON = 2.5;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Run after `document.fonts` + two animation frames so line-break measurement matches
 * loaded webfonts (prevents one-word-per-line stagger on first paint).
 */
export function afterFontsAndLayoutReady(run: () => void): () => void {
  let cancelled = false;
  const paintThenRun = () => {
    if (cancelled) return;
    requestAnimationFrame(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        run();
      });
    });
  };
  if (typeof document !== "undefined" && document.fonts?.ready) {
    void document.fonts.ready.then(() => {
      if (!cancelled) paintThenRun();
    });
  } else {
    paintThenRun();
  }
  return () => {
    cancelled = true;
  };
}

/**
 * Wraps plain-text block content into line rows (overflow hidden) for mask-style
 * slide-up reveals. Mutates `el`; call `restore()` on cleanup.
 */
export function prepareLineReveal(el: HTMLElement): {
  lineInners: HTMLElement[];
  restore: () => void;
} | null {
  const rawHtml = el.innerHTML;
  const text = (el.textContent ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t\f\v\u00a0]+/g, " ")
    .replace(/\n[ \t]*/g, "\n")
    .trim();
  if (!text) return null;

  el.textContent = "";
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);

  for (const tok of tokens) {
    if (/^\s+$/.test(tok)) {
      el.appendChild(document.createTextNode(tok));
      continue;
    }
    const w = document.createElement("span");
    w.className = WORD_CLASS;
    w.style.display = "inline-block";
    w.textContent = tok;
    el.appendChild(w);
  }

  // Final layout + webfonts before measuring line breaks (avoids one-word-per-"line").
  void el.offsetHeight;

  const words = Array.from(el.querySelectorAll<HTMLElement>(`.${WORD_CLASS}`));
  if (!words.length) {
    el.innerHTML = rawHtml;
    return null;
  }

  const lineGroups: HTMLElement[][] = [];
  let row: HTMLElement[] = [];
  let rowTop: number | null = null;
  for (const w of words) {
    const top = w.offsetTop;
    if (row.length && rowTop !== null && Math.abs(top - rowTop) > LINE_TOP_EPSILON) {
      lineGroups.push(row);
      row = [];
      rowTop = null;
    }
    if (!row.length) rowTop = top;
    row.push(w);
  }
  if (row.length) lineGroups.push(row);

  el.textContent = "";
  const lineInners: HTMLElement[] = [];

  for (const group of lineGroups) {
    const outer = document.createElement("span");
    outer.className = "block overflow-hidden";
    const inner = document.createElement("span");
    inner.className = "editorial-line-inner block";
    inner.setAttribute("data-editorial-line-inner", "");
    for (let i = 0; i < group.length; i++) {
      inner.appendChild(group[i]);
      if (i < group.length - 1) inner.appendChild(document.createTextNode(" "));
    }
    outer.appendChild(inner);
    el.appendChild(outer);
    lineInners.push(inner);
  }

  return {
    lineInners,
    restore: () => {
      el.innerHTML = rawHtml;
    },
  };
}

/** How prepared line inners should enter inside their overflow mask. */
export type LineRevealAxis = "vertical" | "from-left" | "from-right";

/**
 * Maps `text-align` to a line-reveal axis: left/start → from-left, right/end → from-right,
 * center/justify → vertical (classic Rhye-style slide up).
 */
export function getLineRevealAxis(el: HTMLElement): LineRevealAxis {
  const override = el.getAttribute("data-line-reveal");
  if (override === "from-left" || override === "from-right" || override === "vertical") {
    return override;
  }
  const cs = getComputedStyle(el);
  const raw = cs.textAlign;
  const dir = cs.direction;
  if (raw === "end") return "from-right";
  if (raw === "start") return dir === "rtl" ? "from-right" : "from-left";
  if (raw === "right") return "from-right";
  if (raw === "left") return "from-left";
  return "vertical";
}

function animateLineInners(
  tl: gsap.core.Timeline,
  lineInners: HTMLElement[],
  axis: LineRevealAxis,
  at: number,
  opts: { duration: number; stagger: number; ease: string },
): void {
  if (!lineInners.length) return;
  if (axis === "from-left") {
    gsap.set(lineInners, { xPercent: -108, yPercent: 0, opacity: 1, force3D: true });
    tl.to(
      lineInners,
      { xPercent: 0, duration: opts.duration, stagger: opts.stagger, ease: opts.ease },
      at,
    );
  } else if (axis === "from-right") {
    gsap.set(lineInners, { xPercent: 108, yPercent: 0, opacity: 1, force3D: true });
    tl.to(
      lineInners,
      { xPercent: 0, duration: opts.duration, stagger: opts.stagger, ease: opts.ease },
      at,
    );
  } else {
    gsap.set(lineInners, { yPercent: 112, xPercent: 0, opacity: 1, force3D: true });
    tl.to(
      lineInners,
      { yPercent: 0, duration: opts.duration, stagger: opts.stagger, ease: opts.ease },
      at,
    );
  }
}

type HeroRevealMotion = {
  /** Clips the hero image area (child holds the image + scale). */
  maskEl: HTMLElement;
  imageLayerEl: HTMLElement;
  overlayEl: HTMLElement | null;
  /** Prepared line-inner nodes (already in DOM). */
  lineInners: HTMLElement[];
  /** Extra blocks to fade up (e.g. eyebrow, CTA row) — optional. */
  extraFadeEls?: HTMLElement[];
  /** From computed alignment: left/right = horizontal mask, center = vertical. */
  lineAxis?: LineRevealAxis;
};

export function playEditorialHeroReveal({
  maskEl,
  imageLayerEl,
  overlayEl,
  lineInners,
  extraFadeEls = [],
  lineAxis = "vertical",
}: HeroRevealMotion): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    maskEl,
    { clipPath: "inset(40% 0% 40% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power3.inOut" },
    0,
  ).fromTo(
    imageLayerEl,
    { scale: 1.14 },
    { scale: 1, duration: 1.25, ease: "power2.out" },
    0,
  );

  if (overlayEl) {
    tl.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.75, ease: "power1.out" }, 0.08);
  }

  if (lineInners.length) {
    animateLineInners(tl, lineInners, lineAxis, 0.28, {
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });
  }

  if (extraFadeEls.length) {
    gsap.set(extraFadeEls, { y: 28, opacity: 0 });
    tl.to(
      extraFadeEls,
      { y: 0, opacity: 1, duration: 0.58, stagger: 0.1, ease: "power2.out" },
      0.45,
    );
  }

  return tl;
}

export function setEditorialHeroFinalState({
  maskEl,
  imageLayerEl,
  overlayEl,
  lineInners,
  extraFadeEls = [],
}: HeroRevealMotion): void {
  gsap.set(maskEl, { clipPath: "inset(0% 0% 0% 0%)" });
  gsap.set(imageLayerEl, { scale: 1 });
  if (overlayEl) gsap.set(overlayEl, { opacity: 1 });
  gsap.set(lineInners, { xPercent: 0, yPercent: 0, opacity: 1 });
  if (extraFadeEls.length) gsap.set(extraFadeEls, { y: 0, opacity: 1 });
}

/** Hero with no photo: typography-only editorial reveal. */
export function playEditorialTextReveal(params: {
  lineInners: HTMLElement[];
  extraFadeEls?: HTMLElement[];
  lineAxis?: LineRevealAxis;
}): gsap.core.Timeline {
  const { lineInners, extraFadeEls = [], lineAxis = "vertical" } = params;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if (lineInners.length) {
    animateLineInners(tl, lineInners, lineAxis, 0.18, {
      duration: 0.95,
      stagger: 0.12,
      ease: "power3.out",
    });
  }
  if (extraFadeEls.length) {
    gsap.set(extraFadeEls, { y: 22, opacity: 0 });
    tl.to(
      extraFadeEls,
      { y: 0, opacity: 1, duration: 0.52, stagger: 0.08, ease: "power2.out" },
      0.35,
    );
  }
  return tl;
}

export function setEditorialTextFinalState(params: {
  lineInners: HTMLElement[];
  extraFadeEls?: HTMLElement[];
}): void {
  const { lineInners, extraFadeEls = [] } = params;
  gsap.set(lineInners, { xPercent: 0, yPercent: 0, opacity: 1 });
  if (extraFadeEls.length) gsap.set(extraFadeEls, { y: 0, opacity: 1 });
}

/**
 * Phase 3: one-shot scroll reveals for `[data-editorial-scroll-mask]` and
 * `[data-editorial-scroll-lines]` anywhere under `root`.
 *
 * Mask markup:
 * ```html
 * <div data-editorial-scroll-mask class="… overflow-hidden editorial-hero-mask-init">
 *   <div data-editorial-scroll-mask-inner class="… absolute inset-0 scale-[1.12] transform-gpu">…Image…</div>
 * </div>
 * ```
 *
 * Line targets: plain-text `h1`–`h3` or `p` with `data-editorial-scroll-lines` (omit default
 * stagger on that node via `data-editorial-scroll-skip-stagger` when it is a direct child of a
 * reveal block).
 */
export function attachEditorialScrollReveals(
  root: HTMLElement,
  options: { start: string },
): () => void {
  const restores: (() => void)[] = [];

  root.querySelectorAll<HTMLElement>("[data-editorial-scroll-mask]").forEach((mask) => {
    const inner = mask.querySelector<HTMLElement>("[data-editorial-scroll-mask-inner]");
    if (!inner) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mask,
        start: options.start,
        toggleActions: "play none none none",
      },
    });
    tl.fromTo(
      mask,
      { clipPath: "inset(38% 0% 38% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.88, ease: "power3.inOut" },
      0,
    ).fromTo(
      inner,
      { scale: 1.12 },
      { scale: 1, duration: 0.98, ease: "power2.out" },
      0,
    );
  });

  root.querySelectorAll<HTMLElement>("[data-editorial-scroll-lines]").forEach((heading) => {
    const prep = prepareLineReveal(heading);
    if (!prep) return;
    restores.push(prep.restore);
    const axis = getLineRevealAxis(heading);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: options.start,
        toggleActions: "play none none none",
      },
    });
    animateLineInners(tl, prep.lineInners, axis, 0, {
      duration: 0.82,
      stagger: 0.1,
      ease: "power3.out",
    });
  });

  return () => {
    restores.forEach((r) => r());
  };
}

/** Snap editorial scroll targets to final visual state (reduced motion). */
export function freezeEditorialScrollReveals(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>("[data-editorial-scroll-mask]").forEach((mask) => {
    mask.style.clipPath = "inset(0% 0% 0% 0%)";
    const inner = mask.querySelector<HTMLElement>("[data-editorial-scroll-mask-inner]");
    if (inner) inner.style.transform = "scale(1)";
  });
}
