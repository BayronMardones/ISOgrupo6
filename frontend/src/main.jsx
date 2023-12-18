import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Agenda from "./pages/Agenda";
import AgendaTabla from "./pages/AgendaTabla";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarProvider } from "./context/SideBarContext";
import SolicitudDetails from "./pages/SolicitudDetails";

const PrivateRoute = ({ element }) => {
	const { isAuthenticated } = useAuth();

	console.log(isAuthenticated);

	return isAuthenticated ? element : <Navigate to="/" />;
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: "*",
    element: <PrivateRoute element={<NotFound />} />,
  },

  {
    path: "/agenda",
    element: <PrivateRoute element={<Agenda />} />,
  },
  {
    path: "/feedback/:id",
    element: <PrivateRoute element={<SolicitudDetails/>} />,
  },
  {
    path: "/agendatabla",
    element: <PrivateRoute element={<AgendaTabla />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
  	<AuthProvider>
  		<SidebarProvider>
			<RouterProvider router={Router} />
  		</SidebarProvider>
	</AuthProvider>
  </ChakraProvider>
);

export default Router;
