"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import "../assets/css/components/header.modules.css";


export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  // The resolved theme is only known on the client. Render a stable icon until
  // mounted so the server and first client render agree (no hydration
  // mismatch), then swap to the real one.
  const [mounted, setMounted] = useState(false);
  // Flip to mounted once on the client; this is the standard gate for reading a
  // client-only value (the resolved theme) without a hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const iconTheme = mounted && resolvedTheme === "dark" ? faSun : faMoon;

  const toggleMenu = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  const removeActiveLinkClass = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains("list-link")) {
      setIsMenuActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", removeActiveLinkClass);

    return () => {
      document.removeEventListener("click", removeActiveLinkClass);
    };
  }, []);

  return (
    <header className="header" id="home">
      <nav className="navbar container">
        <Link href={"/"} className="logo">
          João.
        </Link>

        <div className="navbar-buttons">
          <button
            type="button"
            className={`button icon-button menu-toggle-button ${
              isMenuActive ? "active" : ""
            }`}
            onClick={toggleMenu}
          >
            <FontAwesomeIcon
              icon={faBars}
              className="open-icon"
              style={{ fontSize: "2.4rem", margin: "auto" }}
            />
            <FontAwesomeIcon
              icon={faXmark}
              className="close-icon"
              style={{ fontSize: "2.4rem", margin: "auto" }}
            />
          </button>

          <button
            type="button"
            className={`button icon-button theme-toggle-button`}
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={iconTheme}
              style={{ fontSize: "2.4rem", margin: "auto" }}
            />
          </button>
        </div>

        <div className={`menu ${isMenuActive ? "active" : ""}`}>
          <ul className="list">
            <li className="list-item">
              <Link href={"/about"} className="list-link">
                <span>01</span> About
              </Link>
            </li>

            <li className="list-item">
              <Link href={"/projects"} className="list-link">
                <span>02</span> Projects
              </Link>
            </li>

            <li className="list-item">
              <Link href={"/articles"} className="list-link">
                <span>03</span> Articles
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
