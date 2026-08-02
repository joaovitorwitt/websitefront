"use client";
import { useEffect } from "react";

const MATHJAX_SCRIPT_ID = "mathjax-script";
const MATHJAX_SRC =
  "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";

// Article bodies are raw HTML that may contain TeX, so MathJax needs a
// typeset pass once the body is in the DOM. It used to load eagerly from a
// <script> tag in the root layout, but on a warm cache it could finish
// loading and initializing fast enough to mutate this div's DOM before React
// finished hydrating it, causing an intermittent hydration mismatch (see
// dangerouslySetInnerHTML below). Loading it here instead, inside this
// effect, guarantees it can't even start until after hydration has already
// committed — effects only ever run post-commit — which removes the race
// entirely rather than just narrowing its window.
export default function ArticleContent({ html }: { html: string }) {
  useEffect(() => {
    let cancelled = false;

    function typesetWhenReady() {
      window.MathJax?.startup?.promise?.then(() => {
        if (!cancelled) window.MathJax?.typesetPromise?.();
      });
    }

    if (window.MathJax?.startup?.promise) {
      typesetWhenReady();
      return () => {
        cancelled = true;
      };
    }

    if (document.getElementById(MATHJAX_SCRIPT_ID)) {
      // A previous article view already injected the script; it just
      // hasn't finished loading yet, so wait for it instead of re-injecting.
      const interval = setInterval(() => {
        if (window.MathJax?.startup?.promise) {
          clearInterval(interval);
          typesetWhenReady();
        }
      }, 150);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    window.MathJax = { startup: { typeset: false } };
    const script = document.createElement("script");
    script.id = MATHJAX_SCRIPT_ID;
    script.src = MATHJAX_SRC;
    script.async = true;
    script.onload = () => {
      if (!cancelled) typesetWhenReady();
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
