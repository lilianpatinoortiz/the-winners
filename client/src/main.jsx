import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Task from "./components/Task/index.jsx";
import MyGuru from "./pages/MyGuru.jsx";
import Kanban from "./pages/Kanban.jsx";
import LoginForm from "./components/Login/index.jsx";
import SignupForm from "./components/Signup/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/myguru",
        element: <MyGuru />,
      },
      {
        path: "/kanban",
        element: <Kanban />,
      },
      {
        path: "/tasks",
        element: <Task />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
