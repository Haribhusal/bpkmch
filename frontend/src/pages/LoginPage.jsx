import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useLoginMutation } from "./../services/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  console.log(isLoading);
  const onSubmit = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }); // Call the login mutation asynchronously
      console.log(response);
      if (response?.data?.accessToken) {
        // Handle successful login
        notification.success({ message: "Login successful!" });
        localStorage.setItem("token", response?.data?.accessToken);
        navigate("/dashboard");
      } else {
        notification.error({ message: response?.error?.data?.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({ message: "Please fill in all required fields." });
  };

  return (
    <div className="wrapper bg-white min-w-96 p-10">
      <h2 className="text-2xl font-semibold mb-5">BPKMCH Application Form</h2>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email" // Changed to lowercase "email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
