import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./home.css"; // Asegúrate de importar este archivo de estilos

const Home = () => {
	return (
		<div className="page-content">
			<Navbar />
			<Sidebar />
			<h1>Home</h1>
		</div>
	);
};

export default Home;
