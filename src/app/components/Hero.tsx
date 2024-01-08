import { ThemeProvider, useTheme } from "next-themes";

export default function Hero() {
  return (
    <section className="hero section">
      <div className="container">
        <h1 className="title main-title">
          Crea<span className="inline-image has-sparkles"></span>tive
          <br />
          Develope<span className="has-sparkles-alt">r</span>
        </h1>
      </div>
    </section>
  );
}
