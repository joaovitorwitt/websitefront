"use client";
import { useEffect, useRef } from "react";
import "../assets/css/components/reading-progress.modules.css";

// One viewport height of scrolling before the back-to-top button appears —
// enough that it doesn't pop in immediately on a short scroll.
const BACK_TO_TOP_THRESHOLD_RATIO = 1;

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Scoped to the article body itself (not the whole page, which would
    // also count the header, related articles, and footer toward
    // "reading progress") — recomputed every frame via getBoundingClientRect
    // rather than cached once, so it stays correct as images load and
    // shift the content's height.
    const contentEl = document.querySelector<HTMLElement>(
      ".blog-post-container"
    );
    if (!contentEl) return;

    let ticking = false;

    function update() {
      ticking = false;

      const rect = contentEl!.getBoundingClientRect();
      const contentTop = rect.top + window.scrollY;
      const progress =
        rect.height > 0
          ? Math.min(
              1,
              Math.max(0, (window.scrollY - contentTop) / rect.height)
            )
          : 0;
      barRef.current?.style.setProperty("--reading-progress", String(progress));

      const pastThreshold =
        window.scrollY > window.innerHeight * BACK_TO_TOP_THRESHOLD_RATIO;
      buttonRef.current?.classList.toggle("is-visible", pastThreshold);
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  function handleBackToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // "auto" defers to the page's CSS `scroll-behavior` (set to smooth
    // globally, see globals.css), so it would still animate — "instant" is
    // the only value that actually forces an immediate jump.
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  }

  return (
    <>
      <div className="reading-progress-track">
        <div className="reading-progress-bar" ref={barRef} />
      </div>

      <button
        type="button"
        className="back-to-top"
        ref={buttonRef}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
