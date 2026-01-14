import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";


const MathFormula = ({ formula }: any) => {
  return (
    <MathJaxContext>
      <MathJax>{`\\(${formula}\\)`}</MathJax>
    </MathJaxContext>
  );
};

export default MathFormula;
