import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import "antd/dist/antd.css";
import AuthLayout from "./layouts/AuthLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import { ConfigProvider, Space } from "antd";
import customTheme from "./config/customTheme.js";
import { Provider } from "react-redux";
import { store } from "./store.js";
import FormsPage from "./pages/FormsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <h1>hey</h1>,
      },
      {
        path: "forms",
        element: <FormsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);
