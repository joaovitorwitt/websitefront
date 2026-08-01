"use client";
import { useEffect, useRef, useState } from "react";
import "../assets/css/components/hero.modules.css";

interface Star {
  id: string;
  radiusVmin: number;
  orbitDurationS: number;
  orbitDelayS: number;
  direction: "normal" | "reverse";
  twinkleDurationS: number;
  twinkleDelayS: number;
  layer: "near" | "far";
  tint: "white" | "blue" | "amber";
  sizePx: number;
}

interface StarLayerConfig {
  layer: Star["layer"];
  count: number;
  radiusRange: [number, number];
  orbitDurationRange: [number, number];
  sizeRange: [number, number];
}

// "far" stars are smaller, dimmer, and orbit much slower than "near" ones —
// that size/brightness/speed difference is what reads as parallax depth,
// not a difference in orbit radius. Sizes are ranges rather than fixed
// values so stars within a layer still vary a bit, instead of looking like
// two uniform dot sizes.
const STAR_LAYERS: StarLayerConfig[] = [
  { layer: "near", count: 160, radiusRange: [22, 46], orbitDurationRange: [20, 90], sizeRange: [3, 5] },
  { layer: "far", count: 110, radiusRange: [20, 48], orbitDurationRange: [90, 220], sizeRange: [1.5, 3] },
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomTint(): Star["tint"] {
  const roll = Math.random();
  if (roll < 0.14) return "blue";
  if (roll < 0.28) return "amber";
  return "white";
}

function createStars(): Star[] {
  return STAR_LAYERS.flatMap(({ layer, count, radiusRange, orbitDurationRange, sizeRange }) =>
    Array.from({ length: count }, (_, index) => {
      const orbitDurationS = randomBetween(...orbitDurationRange);
      // A negative delay starts the animation already partway through its
      // cycle, which is what scatters each star's starting angle around the
      // orbit while still sharing a single keyframe definition.
      const orbitDelayS = -(Math.random() * orbitDurationS);

      return {
        id: `${layer}-${index}`,
        radiusVmin: randomBetween(...radiusRange),
        orbitDurationS,
        orbitDelayS,
        direction: (Math.random() < 0.5 ? "normal" : "reverse") as Star["direction"],
        twinkleDurationS: randomBetween(4, 11),
        twinkleDelayS: randomBetween(1, 5),
        layer,
        tint: randomTint(),
        sizePx: randomBetween(...sizeRange),
      };
    })
  );
}

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Star orbits are random, so they must be generated on the client only.
    // Producing them during render would make the server and client markup
    // disagree and trigger a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(createStars());
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hero = heroRef.current;
    if (!hero) return;

    let mouseX = 0;
    let mouseY = 0;
    let mouseRafId: number | null = null;
    let scrollRafId: number | null = null;

    function applyParallax() {
      mouseRafId = null;
      const nx = (mouseX / window.innerWidth - 0.5) * 2;
      const ny = (mouseY / window.innerHeight - 0.5) * 2;
      hero!.style.setProperty("--parallax-near-x", `${nx * 20}px`);
      hero!.style.setProperty("--parallax-near-y", `${ny * 20}px`);
      hero!.style.setProperty("--parallax-far-x", `${nx * 8}px`);
      hero!.style.setProperty("--parallax-far-y", `${ny * 8}px`);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mouseRafId === null) {
        mouseRafId = requestAnimationFrame(applyParallax);
      }
    }

    function applyScrollProgress() {
      scrollRafId = null;
      const rect = hero!.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      hero!.style.setProperty("--scroll-progress", progress.toFixed(3));
    }

    function handleScroll() {
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(applyScrollProgress);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (mouseRafId !== null) cancelAnimationFrame(mouseRafId);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
    };
  }, []);

  const nearStars = stars.filter((star) => star.layer === "near");
  const farStars = stars.filter((star) => star.layer === "far");

  function renderStar(star: Star) {
    const dotClassName = [
      "star-dot",
      star.layer === "far" ? "-far" : "",
      star.tint !== "white" ? `-${star.tint}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        key={star.id}
        className="star-orbit"
        style={{
          animationDuration: `${star.orbitDurationS}s`,
          animationDelay: `${star.orbitDelayS}s`,
          animationDirection: star.direction,
        }}
      >
        <div
          className={dotClassName}
          style={{
            width: `${star.sizePx}px`,
            height: `${star.sizePx}px`,
            top: `${-star.sizePx / 2}px`,
            left: `${-star.sizePx / 2}px`,
            transform: `translateX(${star.radiusVmin}vmin)`,
            animationDuration: `${star.twinkleDurationS}s`,
            animationDelay: `${star.twinkleDelayS}s`,
          }}
        ></div>
      </div>
    );
  }

  return (
    <section className="hero section" ref={heroRef}>
      <div className="container">
        <div className="black-hole-scroll">
          <div className="black-hole-wrapper">
            <div className="doppler-beaming"></div>
            <div className="photon-ring"></div>
            <div className="accretion-disk"></div>
            <div className="backdrop"></div>
            <div className="shadow"></div>
          </div>
        </div>

        {/* Split into two layers (rather than one shared container) so
            mouse parallax can move them at different strengths — near
            stars drift more than far ones, reinforcing the depth cue
            their size/speed/brightness already establish. */}
        <div className="stars-overflow -near">{nearStars.map(renderStar)}</div>
        <div className="stars-overflow -far">{farStars.map(renderStar)}</div>

        <div className="shooting-stars">
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
        </div>
      </div>
    </section>
  );
}
