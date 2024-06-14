import { useEffect, useState } from "react";
import "../assets/css/components/hero.modules.css";

interface Star {
  id: number;
  left: string | number;
  top: string | number;
  randomAnimationDuration: string | number;
  randomAnimationDelay: string | number;
}

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 200 }, (_, index) => {
      const randomAnimationDuration = (Math.random() * (11 - 4) + 4).toFixed(2);
      const randomAnimationDelay = (Math.random() * (5 - 1) + 1).toFixed(2);
      const randomLeftValue = (Math.random() * (90 - 10) + 10).toFixed(2);
      const randomTopValue = (Math.random() * (90 - 10) + 10).toFixed(2);

      console.log(`RANDOM LEFT VALUE: ${randomLeftValue}`);
      console.log(`RANDOM TOP VALUE: ${randomTopValue}`);

      return {
        id: index,

        left: randomLeftValue,
        top: randomTopValue,

        randomAnimationDuration,
        randomAnimationDelay,
      };
    });

    setStars(newStars);

    const star = newStars[0];

    const xFactor = parseFloat(star.left) / 50;
    const xPosition = parseFloat(star.left) / xFactor;

    const yFactor = parseFloat(star.top) / 50;
    const yPosition = parseFloat(star.top) / yFactor;

    console.log(`Y TO ${yPosition}`);
    console.log(`X TO ${xPosition}`);

    document.documentElement.style.setProperty(
      "--translate-x",
      `${xPosition}%`
    );
    document.documentElement.style.setProperty(
      "--translate-y",
      `${yPosition}%`
    );
  }, []);

  // MOVING IN PIXELS NOT IN ACTUAL PERCENTAGE

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
