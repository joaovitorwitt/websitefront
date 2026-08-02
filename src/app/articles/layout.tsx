import { Metadata } from "next";
import ProfilePicture from "../assets/images/profile-picture.jpg";

const TITLE = "Articles | João Vitor Witt";
const DESCRIPTION =
  "Articles on mathematics, physics, and computer science by João Vitor Witt.";

// Next's metadata merging replaces the parent's whole `openGraph` object
// rather than merging it field-by-field, so siteName/locale/images have to
// be repeated here rather than relying on inheritance from the root layout.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/articles",
    siteName: "João Vitor Witt",
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: ProfilePicture.src,
        width: ProfilePicture.width,
        height: ProfilePicture.height,
        alt: TITLE,
      },
    ],
  },
};

export default function articlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
