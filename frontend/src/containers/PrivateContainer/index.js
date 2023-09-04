import React, { useContext, useEffect } from "react";
import GlobalContext from "../../providers/GlobalContext";
import { Spin } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { http } from "../../utils/http";
import { hasRole } from "../../utils/role";

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PrivateContainer({ component: Component, allowRoles, ...rest }) {
  const history = useHistory();
  const {
    globalState: { user },
    setUser,
  } = useContext(GlobalContext);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
      return;
    }

    http.get("/users/profile").then(response => {
      if (response?.response?.status === 400) {
        localStorage.removeItem("token");
        history.push("/login");
        return;
      }
      setUser(response.data);
    });
  };

  useEffect(() => {
    if (!user) checkAuth();
  }, []);

  if (!user)
    return (
      <Route
        {...rest}
        render={() => (
          <Center>
            <Spin size="large"></Spin>
          </Center>
        )}
      />
    );

  return (
    <Route
      {...rest}
      render={props => (user && hasRole(user, allowRoles) ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}
