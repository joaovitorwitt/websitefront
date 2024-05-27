//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
import { useEffect } from "react";
import Typed from "typed.js";
import "../assets/css/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFigma,
  faHtml5,
  faCss3Alt,
  faNodeJs,
  faJs,
  faReact,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

//////////////////////////////////////////////////////
// About Section Component
//////////////////////////////////////////////////////
export default function AboutSection() {
  useEffect(() => {
    let typed = new Typed("#changing", {
      strings: [
        "Full Stack Developer",
        "Blockchain Developer",
        "Machine Learning Developer",
        "Web Developer",
      ],
      typeSpeed: 100,
      loop: true,
      backDelay: 2000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="about-me section" id="about-me">
      <div className="container">
        <div className="section-description d-grid">
          <div className="scroll-reveal-left">
            <p className="description">
              I am a <span className="text-bold" id="changing"></span>
            </p>
          </div>
        </div>

        <div className="tech-stack d-grid">
          <div className="tech-stack-item" data-tooltip="HTML">
            <FontAwesomeIcon
              icon={faHtml5}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>
          <div className="tech-stack-item" data-tooltip="CSS">
            <FontAwesomeIcon
              icon={faCss3Alt}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>
          <div className="tech-stack-item" data-tooltip="JavaScript">
            <FontAwesomeIcon
              icon={faJs}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>

          <div className="tech-stack-item" data-tooltip="React">
            <FontAwesomeIcon
              icon={faReact}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>

          <div className="tech-stack-item" data-tooltip="Node JS">
            <FontAwesomeIcon
              icon={faNodeJs}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>

          <div className="tech-stack-item" data-tooltip="Python">
            <FontAwesomeIcon
              icon={faPython}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>

          <div className="tech-stack-item" data-tooltip="SQL">
            <FontAwesomeIcon
              icon={faDatabase}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>

          <div className="tech-stack-item" data-tooltip="Figma">
            <FontAwesomeIcon
              icon={faFigma}
              style={{ fontSize: "5rem", opacity: "0.5" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
