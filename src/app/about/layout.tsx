import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | João Vitor Witt",
};

export default function aboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
