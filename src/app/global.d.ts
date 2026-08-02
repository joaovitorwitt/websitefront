// global.d.ts
export {};

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
      startup?: {
        promise?: Promise<void>;
        typeset?: boolean;
      };
    };
  }
}
