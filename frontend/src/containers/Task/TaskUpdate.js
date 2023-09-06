import React, { useEffect } from "react";
import { Button, Form, Input, Popconfirm, Select, Space } from "antd";
import { sortArrayByNextField } from "../../utils/sort";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TaskUpdate = () => {
  const history = useHistory();
  const { taskId } = useParams();

  const { tasks, statuses, isBoardInit, isSavingTask } = useSelector(state => state.board);

  const {
    board: { updateTask, fetchBoard, removeTask },
  } = useDispatch();

  const onFinish = values => {
    updateTask({ ...values, id: taskId }).then(() => {
      history.push("/tasks");
    });
  };

  const handleDelete = () => {
    removeTask(taskId).then(() => {
      history.push("/tasks");
    });
  };

  useEffect(() => {
    if (!isBoardInit) fetchBoard();
  }, []);

  if (!isBoardInit) return <p>Loading...</p>;

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      initialValues={tasks.find(task => task.id === taskId)}
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
        <Space split>
          <Button type="primary" htmlType="submit" loading={isSavingTask}>
            Create
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default TaskUpdate;
