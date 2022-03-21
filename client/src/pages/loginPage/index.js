import React, { useEffect } from "react";
import "./index.css";
import { Logo } from "../../components/logo";
import { FormLogin } from "../../components/formLogin";

function LoginPage() {
  useEffect(() => {
    document.title = "Авторизация";
  }, []);
  return (
    <div className="container-form">
      <div className="column">
        <FormLogin />
      </div>
      <div className="column">
        <Logo />
      </div>
    </div>
  );
}

export { LoginPage };
