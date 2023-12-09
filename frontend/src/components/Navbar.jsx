import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Style.css"; // Importa el archivo de estilos
import Sidebar from "./Sidebar";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	return (
		<div>
			<nav className="navbar">
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

				<ul className={`navbar-items ${isSidebarOpen ? "sidebar-open" : ""}`}>
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
