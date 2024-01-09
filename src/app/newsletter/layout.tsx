import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | João Vitor Witt",
};

export default function newsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
