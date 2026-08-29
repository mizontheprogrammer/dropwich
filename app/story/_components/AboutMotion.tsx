"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type MotionKind = "hero" | "rise" | "scale" | "tilt";

const staggerGroups = [
  ".about-ledger",
  ".brand-principle-grid",
  ".brand-system-grid",
  ".why-reasons-modern > div",
  ".why-outcome-grid",
  ".notice-modern-list",
  ".notice-record-notes > div",
  ".history-afterword > div",
];

export function AboutMotion() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".about-multipage");
    const progress = progressRef.current;
    if (!root || !progress) return;

    const targets = new Set<HTMLElement>();
    const immediateTargets = new Set<HTMLElement>();

    const register = (element: HTMLElement, kind: MotionKind, delay = 0, immediate = false) => {
      if (targets.has(element)) return;
      targets.add(element);
      element.dataset.aboutMotion = kind;
      element.style.setProperty("--about-motion-delay", `${delay}ms`);
      if (immediate) immediateTargets.add(element);
    };

    root.querySelectorAll<HTMLElement>(
      ".brand-modern-copy > *, .why-modern-copy > *, .notice-modern-hero > div:first-child > *, .history-modern-hero > div:first-child > *",
    ).forEach((element, index) => register(element, "hero", index * 70, true));

    root.querySelectorAll<HTMLElement>(
      ".brand-modern-art, .notice-primary-disclosure, .history-range",
    ).forEach((element) => register(
      element,
      element.matches(".notice-primary-disclosure") ? "tilt" : "scale",
      140,
      true,
    ));

    root.querySelectorAll<HTMLElement>(
      ".about-section-heading, .why-thesis > *, .about-org-chart, .history-modern-entry, .about-route-footer > *",
    ).forEach((element) => register(element, "rise"));

    staggerGroups.forEach((selector) => {
      root.querySelectorAll<HTMLElement>(`${selector} > article`).forEach((element, index) => {
        register(element, "rise", Math.min(index, 5) * 45);
      });
    });

    const reveal = (element: HTMLElement) => element.classList.add("is-about-visible");
    const resetTargets = () => {
      root.classList.remove("about-motion-enabled");
      targets.forEach((element) => {
        element.classList.remove("is-about-visible");
        delete element.dataset.aboutMotion;
        element.style.removeProperty("--about-motion-delay");
      });
    };

    root.classList.add("about-motion-enabled");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(reveal);
      progress.style.transform = "scaleX(1)";
      return resetTargets;
    }

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

      targets.forEach((element) => {
        if (!immediateTargets.has(element)) observer?.observe(element);
      });
    } else {
      targets.forEach(reveal);
    }

    const entranceFrame = window.requestAnimationFrame(() => immediateTargets.forEach(reveal));
    let progressFrame = 0;
    const updateProgress = () => {
      progressFrame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const value = maximum > 0 ? Math.min(Math.max(window.scrollY / maximum, 0), 1) : 1;
      progress.style.transform = `scaleX(${value})`;
    };
    const requestProgressUpdate = () => {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(entranceFrame);
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      resetTargets();
    };
  }, [pathname]);

  return <div className="about-scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>;
}
