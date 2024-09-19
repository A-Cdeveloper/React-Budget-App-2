import { render, screen } from "@testing-library/react";
import SimpleTest from "../src/components/SimpleTest";

describe("Simple Test", () => {
  it("renders the App component", () => {
    render(<SimpleTest />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
