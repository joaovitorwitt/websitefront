// global.d.ts
export {};

declare global {
  interface Window {
    MathJax: {
      typeset: () => void;
    };
  }
}
