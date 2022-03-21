import { Logo } from "../components/logo";
import { render } from "@testing-library/react";

test("Has background", () => {
  render(<Logo />);
  expect(document.querySelector(".KSks")).toBeInTheDocument();
  expect(document.querySelector(".logoks")).toBeInTheDocument();
});
