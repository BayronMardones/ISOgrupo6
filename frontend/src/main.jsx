import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const Router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router} />
);

export default Router;
