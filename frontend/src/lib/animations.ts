import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initTextReveal(selector: string) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

export function initParallax(selector: string, speed = 0.3) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    gsap.to(el, {
      yPercent: -15 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/** In-card image depth (spec: ~0.2× parallax vs scroll). */
export function initCardImageParallax(
  cardEl: HTMLElement,
  imageEl: HTMLElement,
  speed = 0.2,
) {
  gsap.to(imageEl, {
    yPercent: -15 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: cardEl,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function initStaggerFadeUp(
  containerSelector: string,
  childSelector: string,
) {
  gsap.utils.toArray<HTMLElement>(containerSelector).forEach((container) => {
    const items = container.querySelectorAll(childSelector);
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

export function initCountUp(selector: string) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    const target = parseInt(el.dataset.target || "0", 10);
    gsap.fromTo(
      el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

export function initImageReveal(
  selector: string,
  direction: "left" | "right" = "left",
) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    const from =
      direction === "left"
        ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
        : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
    const to = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

    gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: to,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

export function initLineExpand(selector: string) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}
