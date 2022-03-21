import { BrowserRouter } from "react-router-dom";
import { FormLogin } from "../components/formLogin";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Have 2 input fields and submit button", () => {
  render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );
  expect(screen.queryAllByTestId("input")).toHaveLength(2);
  expect(screen.queryByTestId("submit")).toBeInTheDocument();
});

test("input fields", () => {
  render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );
  const loginInput = document.getElementsByTagName("input")[0];
  userEvent.paste(loginInput, "login");
  expect(loginInput).toHaveValue("login");
  const passwordInput = document.getElementsByTagName("input")[1];
  userEvent.paste(passwordInput, "pass");
  expect(passwordInput).toHaveValue("pass");
  const button = document.getElementsByTagName("button")[0];
  expect(button.getAttribute("disabled")).toBeNull();
});
