import "./index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthLogin } from "../../services/authService";
import { ErrorDiv } from "../errorDiv";

function FormLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    await AuthLogin(data.login, data.password).then(
      () => {
        navigate("/admin");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
    setLoading(false);
  };

  return (
    <div className="container-login">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <span className="authorization">Авторизация</span>

        <div className="input-field" data-testid="input">
          <input
            className="formLogin"
            {...register("login", {
              required: {
                value: true,
                message: "Поле 'Логин' не должно быть пустым.",
              },
              maxLength: {
                value: 30,
                message: "Максимальная длина поля 'Логин' 30 символов",
              },
            })}
            aria-invalid={errors.login ? "true" : "false"}
            id="loginInput"
            type="text"
            placeholder=""
            value={login}
            onChange={onChangeLogin}
            required
          />
          <label htmlFor="loginInput">Введите логин</label>
        </div>

        <div className="input-field" data-testid="input">
          <input
            className="formLogin"
            {...register("password", {
              required: {
                value: true,
                message: "Поле 'Пароль' не должно быть пустым.",
              },
              maxLength: {
                value: 30,
                message: "Максимальная длина поля 'Пароль' 30 символов",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            id="passwordInput"
            required
            type="password"
            placeholder=""
            value={password}
            onChange={onChangePassword}
          />
          <label htmlFor="passwordInput">Введите пароль</label>
        </div>
        <ErrorDiv error={errors.login} />
        <ErrorDiv error={errors.password} />
        <div className="container-center">
          <button
            className="cupcake loginFormButton"
            type="submit"
            disabled={loading}
            data-testid="submit"
          />
        </div>
        <ErrorDiv error={{ message: message }} />
      </form>
    </div>
  );
}

export { FormLogin };
