import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SideBarContext";

import "./home.css";

const Home = () => {

	const { isSidebarOpen } = useSidebar();

	return (
		<div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
			<Navbar />
			<Sidebar />
			<div className="home-container">
				<h1>Home</h1>
				<br />
				<br />
				<br />
				<h2>
					Esta es la página de inicio.</h2>
				<h2>
					Si iniciaste sesión correctamente, deberías
					ver el nombre de usuario en la esquina superior izquierda.
				</h2>
			</div>
		</div>
	);
};

export default Home;
