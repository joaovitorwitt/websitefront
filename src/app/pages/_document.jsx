import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Script
            type="text/javascript"
            async
            id="MathJax-script"
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
