import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="social-media">
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
              <Link
                href="https://twitter.com/joaovitorwitt"
                target="_blank"
                className="list-link"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faXTwitter}
                  style={{ fontSize: "2.5rem" }}
                />
              </Link>
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

        <span>&copy; {year} João. All rights reserved.</span>

        <a href="#home" className="scroll-top">
          <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: "2.5rem" }} />
        </a>
      </div>
    </footer>
  );
}
