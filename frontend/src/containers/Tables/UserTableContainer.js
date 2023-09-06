import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import userService from "../../services/userService";
import { Link } from "react-router-dom";

const colorByRole = {
  admin: "blue",
  employee: "#87d068",
};

const userDataColumns = [
  {
    dataIndex: "username",
    title: "Username",
    render: (username, record) => {
      return <Link to={`/users/${record.id}/tasks`}>{username}</Link>;
    },
  },
  {
    dataIndex: "roles",
    title: "Roles",
    render: function (roles) {
      return (
        <Space size={[0, 8]}>
          {roles.map(role => (
            <Tag color={colorByRole[role]} key={role}>
              {role}
            </Tag>
          ))}
        </Space>
      );
    },
  },
];

export default function UserTableContainer() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    userService.getAllUsers().then(result => {
      setUsers(result);
      setLoading(false);
    });
  }, []);

  return <Table dataSource={users || []} columns={userDataColumns} rowKey="id" loading={loading} />;
}
