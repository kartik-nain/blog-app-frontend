import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AllUsersBlogs from "./pages/AllUsersBlogs.tsx";
import Blogpost from "./pages/Blogpost.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Profile from "./pages/Profile.tsx";
import Write from "./pages/Write.tsx";
import MustBeLoggedin from "./pages/MustBeLoggedin.tsx";
import AuthContextProvider from "./security/AuthContext.tsx";

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (token !== null) return <>{children}</>;

  return <Navigate to="/mustBelogin" />;
}

const protectedRoutes = [
  {
    path: "/home",
    element: <AllUsersBlogs />,
  },
  {
    path: "/blog",
    element: <Blogpost />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/write",
    element: <Write />,
  },
];

const protectedRoutesWithAuth = protectedRoutes.map((route) => ({
  ...route,
  element: <AuthenticatedRoute>{route.element}</AuthenticatedRoute>,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: protectedRoutesWithAuth,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/mustBeLogin", element: <MustBeLoggedin /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
