import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | João Vitor Witt",
};

export default function articlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
