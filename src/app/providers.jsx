"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  // next-themes writes the resolved theme to <html data-theme="..."> via a
  // pre-hydration script, so the CSS [data-theme="dark"] selector matches at
  // the root with no server/client mismatch.
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
