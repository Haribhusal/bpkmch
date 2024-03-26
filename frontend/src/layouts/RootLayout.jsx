import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, Table, Tag } from "antd";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
const RootLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     // navigate("/");
  //   }
  // }, [token]);
  return (
    <Layout className="" style={{ background: "red" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
              onClick: () => navigate("/dashboard"),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Forms",
              onClick: () => navigate("/dashboard/forms"),
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: "Logout",
              onClick: handleLogout(),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="bg-green-700"
          style={{
            padding: 0,
            // background: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "",
            height: "100%",
            background: "white",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default RootLayout;
