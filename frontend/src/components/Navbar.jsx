import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SideBarContext";
import Sidebar from "./Sidebar";
import "./Style.css";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const { isSidebarOpen, toggleSidebar } = useSidebar();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
			// Cambia el estado del Sidebar a cerrado si la ventana es muy delgada
			if (isSidebarOpen && window.innerWidth < 768) {
				toggleSidebar();
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isSidebarOpen, toggleSidebar]);

	return (
		<div>
			<nav className="navbar">
				{/* Pasa el estado y la función para abrir/cerrar el Sidebar como propiedades */}
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<button className="toggle-button" onClick={toggleSidebar}>
					☰
				</button>
				{/* Muestra el nombre de usuario si está autenticado correctamente*/}
				<h1 className="user-name">Bienvenido Bayron</h1>
				<div className="spacer" />
				<ul>
					<li className="home-button">
						<Link to="/home">Home</Link>
					</li>
					{isAuthenticated ? (
						<>
							<li className="logout-button">
								<button onClick={logout}>Cerrar Sesión</button>
							</li>
						</>
					) : null}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
