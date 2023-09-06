import React from "react";
import { Button, Form, Input, Select } from "antd";
import { sortArrayByNextField } from "../../utils/sort";
import taskService from "../../services/taskService";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TaskCreate = () => {
  const history = useHistory();

  const { statuses, isBoardInit, isSavingTask } = useSelector(state => state.board);

  const {
    board: { createTask },
  } = useDispatch();

  const onFinish = values => {
    createTask(values).then(() => {
      history.push("/tasks");
    });
  };
  if (!isBoardInit) return <p>Loading...</p>;

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      initialValues={{ status: "in_progress" }}
      disabled={isSavingTask}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select
          defaultValue="in_progress"
          style={{ width: 120 }}
          options={sortArrayByNextField(statuses).map(({ name, title }) => ({ value: name, label: title }))}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSavingTask}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
export default TaskCreate;
