import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/mainPage";
import ForNotAuthorized from "./forNotAuthorized";
import { LoginPage } from "../pages/loginPage";
import ForAuthorized from "./forAuthorized";
import { CartPage } from "../pages/cartPage";
import { AdminPage } from "../pages/adminPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <ForNotAuthorized to="/">
              <LoginPage />
            </ForNotAuthorized>
          }
        />
        <Route
          path="/admin"
          element={
            <ForAuthorized to="/login">
              <AdminPage />
            </ForAuthorized>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
