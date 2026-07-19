"use client";
import { useEffect } from "react";

// Article bodies are raw HTML that may contain TeX. MathJax is loaded from the
// CDN in the root layout; it needs a typeset pass once the body is in the DOM.
export default function ArticleContent({ html }: { html: string }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax) {
      window.MathJax.typeset();
    }
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
