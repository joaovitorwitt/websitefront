import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | João Vitor Witt",
};

export default function projectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
