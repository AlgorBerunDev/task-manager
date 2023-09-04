import React, { useState } from "react";
import { Input, Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const LoginPageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginPage = ({ onLogin, pathRegisterPage }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onLogin(username, password);
  };

  const handleRegistration = () => {
    history.push(pathRegisterPage);
  };

  return (
    <LoginPageContent>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Username">
          <Input value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="default" onClick={handleRegistration}>
            Registration
          </Button>
        </Space>
      </Form>
    </LoginPageContent>
  );
};

export default LoginPage;
