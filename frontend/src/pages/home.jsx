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
			</div>
		</div>
	);
};

export default Home;
