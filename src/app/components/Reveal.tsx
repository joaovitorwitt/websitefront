"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import "../assets/css/components/reveal.modules.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        // The animation runs once, so stop watching after the first reveal.
        observer.disconnect();
      },
      // Reveal as soon as any part of the element enters the viewport.
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", isVisible && "reveal-visible", className]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* The hidden state lives in CSS, so without JS the reveal would never
          fire and the content would stay invisible. */}
      <noscript>
        <style>{".reveal { opacity: 1; transform: none; }"}</style>
      </noscript>
      <div ref={ref} className={classes}>
        {children}
      </div>
    </>
  );
}
