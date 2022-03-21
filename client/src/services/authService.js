import axios from "axios";

async function AuthLogin(login, password) {
  return await axios.post("/api/auth/login", {
    login,
    password,
  });
}

async function AuthLogout() {
  return await axios.post("/api/auth/logout");
}

export { AuthLogin, AuthLogout };
