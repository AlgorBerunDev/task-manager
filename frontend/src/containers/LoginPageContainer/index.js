import React, { useContext } from "react";
import LoginPage from "../../components/LoginPage";
import { useHistory } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../../providers/GlobalContext";
import getHomePath from "../../utils/getHomePath";

export default function LoginPageContainer() {
  const history = useHistory();
  const { setUser } = useContext(GlobalContext);

  const handleLogin = (username, password) => {
    axios
      .post("/api/auth/login", { username, password })
      .then(({ data: { token, user } }) => {
        localStorage.setItem("token", token);
        setUser(user);
        history.push(getHomePath());
      })
      .catch(err => console.error(err));
  };

  return <LoginPage onLogin={handleLogin} pathRegisterPage="/register" />;
}
