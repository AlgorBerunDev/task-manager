import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { hasRole } from "../../utils/role";
import styled from "styled-components";

const MenuPadding = styled.div`
  padding: 10px;
`;
const Sidebar = ({ user }) => {
  const location = useLocation();

  return (
    <MenuPadding>
      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/tasks",
            title: <Link to="/tasks">Tasks List</Link>,
          },
          ...(hasRole(user, ["admin"])
            ? [
                {
                  key: "/users",
                  title: <Link to="/users">Users</Link>,
                },
              ]
            : []),
        ]}
      />
    </MenuPadding>
  );
};

export default Sidebar;
