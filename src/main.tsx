import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllUsersBlogs from './pages/AllUsersBlogs.tsx'
import Blogpost from './pages/Blogpost.tsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {path: '/blogs-all-user', element: <AllUsersBlogs />},
    {path: '/users/:author/blog/:userId', element: <Blogpost />}
  ]
}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
