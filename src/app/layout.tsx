import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./assets/css/globals.css";
import { Providers } from "./providers";

// font awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "João Vitor Witt",
  description: "Passionate about programing, math, and physics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={inter.className}> */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
