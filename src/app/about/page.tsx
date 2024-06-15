//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "../components/Header";
import { RevealWrapper } from "next-reveal";
import { useTheme } from "next-themes";
import ProfilePicture from "../assets/images/profile-picture.jpg";
import Image from "next/image";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "../assets/css/pages/about/about.modules.css";
import PageGlow from "../components/PageGlow";

//////////////////////////////////////////////////////
// About Page Component
//////////////////////////////////////////////////////
export default function About() {
  const { theme = "light", setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <RevealWrapper>
        <Header />
        <PageGlow />
        <div className="container">
          <div className="about-me-wrapper">
            <div className="profile-picture">
              <Image
                src={ProfilePicture}
                alt=""
                className="about-me-picture"
                style={{ height: "auto" }}
                priority
              />
            </div>

            <div className="about-me-data-container">
              <h3>João Vitor Witt (pronounced: John)</h3>

              <p className="about-me-description">
                I&apos;m enthusiastic about exploring the fields of mathematics,
                physics, and computer science. Here, you will find content about
                these topics. My goal is to help humanity advance as an
                intelligent species.
                <Link href={"/articles"} className="article-redirection">
                  <strong>Check out my articles</strong>
                </Link>
              </p>

              <div className="lower-section-data-container">
                <div className="social-media">
                  <h4 className="about-me-footer">Connect with me</h4>
                  <ul className="list">
                    <li className="list-item">
                      <a
                        href="https://github.com/joaovitorwitt"
                        target="_blank"
                        className="list-link"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faGithub}
                          style={{ fontSize: "2.5rem" }}
                        />
                      </a>
                    </li>

                    <li className="list-item">
                      <a
                        href="https://www.youtube.com/channel/UCPeHjk3fEPzK0RKHpQG7gJw"
                        target="_blank"
                        className="list-link"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faYoutube}
                          style={{ fontSize: "2.5rem" }}
                        />
                      </a>
                    </li>

                    <li className="list-item">
                      <a
                        href="https://www.linkedin.com/in/joaovitorwitt/"
                        target="_blank"
                        className="list-link"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          style={{ fontSize: "2.5rem" }}
                        />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://twitter.com/joaovitorwitt"
                        target="_blank"
                        className="list-link"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          style={{ fontSize: "2.5rem" }}
                        />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.instagram.com/joaaovitorwitt/"
                        target="_blank"
                        className="list-link"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faInstagram}
                          style={{ fontSize: "2.5rem" }}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <button className="download-resume-btn">
                <a href="/resume/Resume.pdf" download>
                  <FontAwesomeIcon
                    icon={faFile}
                    style={{ fontSize: "2.4rem", marginRight: ".6rem" }}
                  />
                  Download CV
                </a>
              </button>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </div>
  );
}
