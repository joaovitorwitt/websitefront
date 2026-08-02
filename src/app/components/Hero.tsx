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

// A small, self-contained particle system (separate from the DOM star
// field above) that orbits close to the black hole and stretches into a
// tangential streak as it nears the "photon sphere" — a decorative
// approximation of gravitational lensing. Internal coordinates are in a
// fixed canvas pixel space (see LENS_CANVAS_SIZE); LENS_INNER_RADIUS sits
// just outside where .shadow's edge renders (the canvas's CSS display
// size is kept proportional to .shadow's 20vw so this alignment holds at
// any viewport width).
interface LensParticle {
  angle: number;
  radius: number;
  angularSpeed: number;
  decayPerSecond: number;
  size: number;
}

const LENS_CANVAS_SIZE = 600;
const LENS_OUTER_RADIUS = 280;
const LENS_INNER_RADIUS = 185;
const LENS_PARTICLE_COUNT = 40;
// Proximity (0 at the outer edge, 1 at the photon sphere) thresholds for
// fading a particle in right after it spawns and out right before it's
// consumed, so both ends are a dissolve rather than a pop in/out.
const LENS_FADE_IN_END = 0.08;
const LENS_FADE_OUT_START = 0.8;
// How much faster a particle spins as it nears the photon sphere — a
// crude but convincing stand-in for real orbital speed-up at smaller
// radii (angular momentum conservation).
const LENS_SPIN_BOOST = 6;

function createLensParticle(): LensParticle {
  return {
    angle: randomBetween(0, Math.PI * 2),
    radius: randomBetween(LENS_INNER_RADIUS, LENS_OUTER_RADIUS),
    angularSpeed: (Math.random() < 0.5 ? -1 : 1) * randomBetween(0.15, 0.4),
    decayPerSecond: randomBetween(6, 14),
    size: randomBetween(1.5, 3),
  };
}

// Canvas strokeStyle can't take a raw `var(--x)` reference, so the current
// theme color has to be resolved to a real value each time it's read. Kept
// to a single shared color (no per-particle hue variety, unlike the DOM
// star field) since the tint colors read poorly against the light theme's
// background — matching the site's minimalist black/white identity here.
function getLensParticleColor(): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--default-text-color")
    .trim();
  return value || "#ffffff";
}

function lensProximity(radius: number): number {
  return Math.min(
    Math.max((LENS_OUTER_RADIUS - radius) / (LENS_OUTER_RADIUS - LENS_INNER_RADIUS), 0),
    1
  );
}

function updateLensParticles(particles: LensParticle[], dtSeconds: number) {
  for (const particle of particles) {
    const proximity = lensProximity(particle.radius);
    // Spin faster the closer it gets — negligible far out, dramatic right
    // at the photon sphere (proximity squared, same "late and sudden"
    // curve as the tangential stretch below).
    const spinMultiplier = 1 + proximity * proximity * LENS_SPIN_BOOST;
    particle.angle += particle.angularSpeed * spinMultiplier * dtSeconds;
    particle.radius -= particle.decayPerSecond * dtSeconds;

    if (particle.radius <= LENS_INNER_RADIUS) {
      // "Consumed" by the black hole — respawn at the outer edge with
      // fresh randomized motion. By this point the draw-side fade-out
      // (below) has already taken it to alpha 0, so the jump back out
      // happens while invisible rather than as a visible pop.
      particle.radius = LENS_OUTER_RADIUS;
      particle.angle = randomBetween(0, Math.PI * 2);
      particle.angularSpeed = (Math.random() < 0.5 ? -1 : 1) * randomBetween(0.15, 0.4);
      particle.decayPerSecond = randomBetween(6, 14);
    }
  }
}

function drawLensParticles(
  ctx: CanvasRenderingContext2D,
  particles: LensParticle[],
  color: string
) {
  ctx.clearRect(0, 0, LENS_CANVAS_SIZE, LENS_CANVAS_SIZE);
  ctx.strokeStyle = color;
  const center = LENS_CANVAS_SIZE / 2;

  for (const particle of particles) {
    const x = center + Math.cos(particle.angle) * particle.radius;
    const y = center + Math.sin(particle.angle) * particle.radius;

    const proximity = lensProximity(particle.radius);
    // Grows sharply (proximity squared) only near the photon sphere, so
    // far-out particles read as plain dots and the stretch into a
    // streak is a late, dramatic effect rather than a gradual one.
    const halfStretch = (particle.size + proximity * proximity * 26) / 2;

    // Tangential to the radius (i.e. along the direction of travel), which
    // is what makes it read as motion-smear rather than a random line.
    const tangentAngle = particle.angle + Math.PI / 2;
    const dx = Math.cos(tangentAngle) * halfStretch;
    const dy = Math.sin(tangentAngle) * halfStretch;

    // Fades in right after spawning and out right before reaching the
    // photon sphere, so both ends read as dissolving into the black hole
    // rather than an abrupt pop in/out.
    let alpha = 1;
    if (proximity < LENS_FADE_IN_END) {
      alpha = proximity / LENS_FADE_IN_END;
    } else if (proximity > LENS_FADE_OUT_START) {
      alpha = 1 - (proximity - LENS_FADE_OUT_START) / (1 - LENS_FADE_OUT_START);
    }

    ctx.beginPath();
    ctx.moveTo(x - dx, y - dy);
    ctx.lineTo(x + dx, y + dy);
    ctx.lineCap = "round";
    ctx.lineWidth = particle.size;
    ctx.globalAlpha = alpha;
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Star orbits are random, so they must be generated on the client only.
    // Producing them during render would make the server and client markup
    // disagree and trigger a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(createStars());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = LENS_CANVAS_SIZE * dpr;
    canvas.height = LENS_CANVAS_SIZE * dpr;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: LENS_PARTICLE_COUNT }, createLensParticle);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Draw one static frame instead of animating — consistent with how
      // the rest of the scene pauses in a varied state rather than
      // disappearing under this preference.
      drawLensParticles(ctx, particles, getLensParticleColor());
      return;
    }

    let rafId: number;
    let lastTime: number | null = null;

    function frame(time: number) {
      if (lastTime === null) lastTime = time;
      const dtSeconds = (time - lastTime) / 1000;
      lastTime = time;

      updateLensParticles(particles, dtSeconds);
      // Re-resolved every frame (cheap) so a live theme toggle is
      // reflected immediately rather than only on the next mount.
      drawLensParticles(ctx!, particles, getLensParticleColor());

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafId);
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
        <canvas className="lensing-canvas" ref={canvasRef}></canvas>

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
      </div>
    </section>
  );
}
