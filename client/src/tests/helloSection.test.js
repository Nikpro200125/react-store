import { HelloSection } from "../components/helloSection";
import { render } from "@testing-library/react";

test("has content", () => {
  render(<HelloSection />);
  expect(document.querySelector(".leftSide").textContent).not.toBeNull();
  expect(document.querySelector("div.ogromniyTort")).toBeInTheDocument();
});
