import React from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import Task from "../containers/Task";
import { Button, Space } from "antd";
import { useHistory } from "react-router-dom";

export default function Tasks() {
  const history = useHistory();

  return (
    <div className="tasks-page">
      <Space split={true}>
        <h1>Tasks page</h1>
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          size="large"
          onClick={() => history.push("/tasks/create")}
        >
          New
        </Button>
      </Space>
      <Task />
    </div>
  );
}
