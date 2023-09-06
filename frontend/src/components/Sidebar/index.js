import React from "react";
import { Button, Divider, Menu, Popconfirm } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { hasRole } from "../../utils/role";
import styled from "styled-components";

const MenuPadding = styled.div`
  padding: 10px;
`;
const Sidebar = ({ user }) => {
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <MenuPadding>
      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/tasks",
            label: <Link to="/tasks">Tasks List</Link>,
          },
          {
            key: "/tasks/create",
            label: <Link to="/tasks/create">Task Create</Link>,
          },
          ...(hasRole(user, ["admin"])
            ? [
                {
                  key: "/users",
                  label: <Link to="/users">Users</Link>,
                },
              ]
            : []),
          {
            type: "divider",
          },
          {
            key: "logout",
            danger: true,
            label: "Logout",
            onClick: handleLogout,
          },
        ]}
      />
    </MenuPadding>
  );
};

export default Sidebar;
