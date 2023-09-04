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
      <Menu mode="inline" theme="light" selectedKeys={[location.pathname]}>
        <Menu.Item key="/tasks">
          <Link to="/tasks">Tasks List</Link>
        </Menu.Item>
        {hasRole(user, ["admin"]) && (
          <Menu.Item key="/users">
            <Link to="/users">Users</Link>
          </Menu.Item>
        )}
      </Menu>
    </MenuPadding>
  );
};

export default Sidebar;
