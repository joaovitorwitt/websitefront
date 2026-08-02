"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faLink,
  faCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/components/share-buttons.modules.css";

type Props = {
  title: string;
  url: string;
};

type CopyStatus = "idle" | "copied" | "error";

const ICON_STYLE = { fontSize: "2rem" };

// navigator.clipboard.writeText can reject for reasons that have nothing to
// do with the code being wrong (document not focused, an older browser
// without the Clipboard API, a denied permission) — falling back to the
// old execCommand technique covers those cases instead of the button
// silently doing nothing.
async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the legacy approach below
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let succeeded = false;
  try {
    succeeded = document.execCommand("copy");
  } catch {
    succeeded = false;
  }
  document.body.removeChild(textarea);
  return succeeded;
}

export default function ShareButtons({ title, url }: Props) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  async function handleCopyLink() {
    const succeeded = await copyToClipboard(url);
    setStatus(succeeded ? "copied" : "error");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const copyIcon =
    status === "copied"
      ? faCheck
      : status === "error"
        ? faTriangleExclamation
        : faLink;
  const copyAriaLabel =
    status === "copied"
      ? "Link copied"
      : status === "error"
        ? "Couldn't copy link"
        : "Copy link";

  return (
    <div className="share-buttons">
      <span className="share-buttons-label">Share this article</span>

      <ul className="list">
        <li className="list-item">
          <a
            href={twitterHref}
            target="_blank"
            rel="noreferrer"
            className="list-link"
            aria-label="Share on X"
          >
            <FontAwesomeIcon icon={faXTwitter} style={ICON_STYLE} />
          </a>
        </li>

        <li className="list-item">
          <a
            href={linkedinHref}
            target="_blank"
            rel="noreferrer"
            className="list-link"
            aria-label="Share on LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} style={ICON_STYLE} />
          </a>
        </li>

        <li className="list-item">
          <button
            type="button"
            onClick={handleCopyLink}
            className="list-link share-copy-button"
            aria-label={copyAriaLabel}
          >
            <FontAwesomeIcon icon={copyIcon} style={ICON_STYLE} />
          </button>
        </li>
      </ul>

      <span className="share-buttons-feedback" aria-live="polite">
        {status === "copied" && "Copied!"}
        {status === "error" && "Couldn't copy — try again"}
      </span>
    </div>
  );
}
