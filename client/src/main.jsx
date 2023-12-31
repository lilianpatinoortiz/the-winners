import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Kanban from "./pages/Kanban.jsx";
import LoginForm from "./components/Login/index.jsx";
import SignupForm from "./components/Signup/index.jsx";
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { SingleProject } from "./components/SingleProject/index.jsx";

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
        path: "/kanban",
        element: <Kanban />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/singleproject/:id",
        element: <SingleProject />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
