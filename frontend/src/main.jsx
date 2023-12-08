import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<RouterProvider router={Router} />
	</AuthProvider>
);

export default Router;
