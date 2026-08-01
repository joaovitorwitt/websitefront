"use client";
import { useEffect, useState } from "react";
import "../assets/css/components/hero.modules.css";

interface Star {
  id: number;
  radiusVmin: number;
  orbitDurationS: number;
  orbitDelayS: number;
  direction: "normal" | "reverse";
  twinkleDurationS: number;
  twinkleDelayS: number;
}

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 200 }, (_, index) => {
      const orbitDurationS = Math.random() * (90 - 20) + 20;
      // A negative delay starts the animation already partway through its
      // cycle, which is what scatters each star's starting angle around the
      // orbit while still sharing a single keyframe definition.
      const orbitDelayS = -(Math.random() * orbitDurationS);
      const radiusVmin = Math.random() * (46 - 22) + 22;
      const direction: Star["direction"] =
        Math.random() < 0.5 ? "normal" : "reverse";
      const twinkleDurationS = Math.random() * (11 - 4) + 4;
      const twinkleDelayS = Math.random() * (5 - 1) + 1;

      return {
        id: index,
        radiusVmin,
        orbitDurationS,
        orbitDelayS,
        direction,
        twinkleDurationS,
        twinkleDelayS,
      };
    });

    // Star orbits are random, so they must be generated on the client only.
    // Producing them during render would make the server and client markup
    // disagree and trigger a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, []);


  return (
    <section className="hero section">
      <div className="container">
        <div className="black-hole-wrapper">
          <div className="doppler-beaming"></div>
          <div className="photon-ring"></div>
          <div className="accretion-disk"></div>
          <div className="backdrop"></div>
          <div className="shadow"></div>
        </div>

        <div className="stars-overflow">
          {stars.map((star) => (
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
                className="star-dot"
                style={{
                  transform: `translateX(${star.radiusVmin}vmin)`,
                  animationDuration: `${star.twinkleDurationS}s`,
                  animationDelay: `${star.twinkleDelayS}s`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
