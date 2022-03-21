import { render, screen } from "@testing-library/react";
import { Header } from "../components/header";

test("Amount of menu items", () => {
  render(<Header />);
  expect(screen.queryAllByTestId("item")).toHaveLength(6);
});

test("Have logo", () => {
  render(<Header />);
  expect(screen.queryByTestId("logo")).toBeInTheDocument();
});
