import { ErrorDiv } from "../components/errorDiv";
import { render, screen } from "@testing-library/react";

test("Index tests with no error", () => {
  render(<ErrorDiv />);
  const el = screen.queryByTestId("error-div");
  expect(el).toBeNull();
});

test("Index tests with error", () => {
  render(<ErrorDiv error={{}} />);
  const el = screen.queryByTestId("error-div");
  expect(el).toBeNull();
});

test("Index tests with error message", () => {
  render(<ErrorDiv error={{ message: "Some message" }} />);
  const el = screen.queryByTestId("error-div");
  expect(el).toBeInTheDocument();
  expect(el).toHaveTextContent("Some message");
});
