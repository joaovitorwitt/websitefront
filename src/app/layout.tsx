//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
import type { Metadata } from "next";
import "./assets/css/globals.css";
import { Providers } from "./providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ProfilePicture from "./assets/images/profile-picture.jpg";
config.autoAddCss = false;

const SITE_TITLE = "João Vitor Witt";
const SITE_DESCRIPTION = "Passionate about programing, math, and physics.";

//////////////////////////////////////////////////////
// Metadata Implementation
//////////////////////////////////////////////////////
export const metadata: Metadata = {
  metadataBase: new URL("https://www.joaovitorwitt.com/"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  // Falls back to the profile picture as the preview image on any page that
  // doesn't set its own openGraph.images (e.g. link unfurls in Slack/Twitter/
  // iMessage). Nested layouts/pages override title/description/images as
  // needed; unset fields here (like this default image) are inherited.
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: ProfilePicture.src,
        width: ProfilePicture.width,
        height: ProfilePicture.height,
        alt: SITE_TITLE,
      },
    ],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
