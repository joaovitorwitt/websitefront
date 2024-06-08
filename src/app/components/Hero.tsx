import { useEffect, useState } from "react";
import "../assets/css/components/hero.modules.css";

interface Star {
  id: number;
  left: string;
  top: string;
  randomAnimationDuration: string;
  randomAnimationDelay: string;
}

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, index) => {
      const randomAnimationDuration = (Math.random() * (11 - 4) + 4).toFixed(2);
      const randomAnimationDelay = (Math.random() * (5 - 1) + 1).toFixed(2);
      const randomLeftValue = (Math.random() * (90 - 10) + 10).toFixed(9);
      const randomTopValue = (Math.random() * (90 - 10) + 10).toFixed(9);
      return {
        id: index,
        left: randomLeftValue,
        top: randomTopValue,
        randomAnimationDuration,
        randomAnimationDelay,
      };
    });

    setStars(newStars);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const star = newStars[0];
    const dx = centerX - (parseFloat(star.left) / 100) * window.innerWidth;
    const dy = centerY - (parseFloat(star.top) / 100) * window.innerHeight;
    document.documentElement.style.setProperty("--translate-x", `${dx}px`);
    document.documentElement.style.setProperty("--translate-y", `${dy}px`);
  }, []);

  return (
    <section className="hero section">
      <div className="container">
        <h1 className="title main-title">
          Creative
          <div className="black-hole-wrapper">
            <div className="doppler-beaming"></div>
            <div className="photon-ring"></div>
            <div className="accretion-disk"></div>
            <div className="backdrop"></div>
            <div className="shadow"></div>
          </div>
          Developer
        </h1>

        <div className="stars-overflow">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star-animation"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDuration: `${star.randomAnimationDuration}s`,
                animationDelay: `${star.randomAnimationDelay}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
