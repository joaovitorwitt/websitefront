//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import About from "../about/page";
import { describe } from "node:test";
import "@types/jest";

//////////////////////////////////////////////////////
// Components Load Test Case Implementation
//////////////////////////////////////////////////////
describe("About", () => {
  it("render the about section", () => {
    render(<About />);

    const about = screen.getByRole("about", { level: 1 });

    expect(about).toBe;
  });
});
