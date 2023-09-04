import React, { useState } from "react";
import { Input, Button, Form, Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

const RegisterLayout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegistrationPage = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    onRegister(username, password, role);
  };

  return (
    <RegisterLayout>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Username">
          <Input value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item label="Role">
          <Select value={role} onChange={value => setRole(value)}>
            <Option value="admin">Admin</Option>
            <Option value="employee">Employee</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </RegisterLayout>
  );
};

export default RegistrationPage;
