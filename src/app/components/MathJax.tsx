//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

//////////////////////////////////////////////////////
// MathJax Component
//////////////////////////////////////////////////////
const MathFormula = ({ formula }: any) => {
  return (
    <MathJaxContext>
      <MathJax>{`\\(${formula}\\)`}</MathJax>
    </MathJaxContext>
  );
};

export default MathFormula;
