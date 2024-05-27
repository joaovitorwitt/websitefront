//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
import type { Metadata } from "next";
import "./assets/css/globals.css";
import { Providers } from "./providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

//////////////////////////////////////////////////////
// Metadata Implementation
//////////////////////////////////////////////////////
export const metadata: Metadata = {
  metadataBase: new URL("https://www.joaovitorwitt.com/"),
  title: "João Vitor Witt",
  description: "Passionate about programing, math, and physics.",
  creator: "João Vitor",
  keywords: [
    "Programming",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Coding",
    "Software Development",
    "Algorithms",
    "Web Development",
    "Project Updates",
    "Newsletter",
    "JavaScript",
    "Python",
    "Physics Research",
    "Mathematical Concepts",
    "Educational Content",
  ],
  // add openGraph stuff here
};

//////////////////////////////////////////////////////
// Root Layout Component
//////////////////////////////////////////////////////
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=es6"
          async
        ></script>
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
