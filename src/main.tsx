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
import MustBeLoggedin from "./components/MustBeLoggedin.tsx";
import AuthContextProvider, { useAuth } from "./security/AuthContext.tsx";
import Logout from "./pages/Logout.tsx";

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return <>{children}</>;

  return <Navigate to="/mustBelogin" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: (
          <AuthenticatedRoute>
            <AllUsersBlogs />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/users/:author/blog/:userId",
        element: (
          <AuthenticatedRoute>
            <Blogpost />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthenticatedRoute>
            <Profile />
          </AuthenticatedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/mustBeLogin", element: <MustBeLoggedin /> },
  { path: "/logout", element: <Logout /> }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
