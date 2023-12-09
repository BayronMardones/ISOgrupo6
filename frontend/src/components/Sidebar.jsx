import React, { useState } from "react";
import "./Sidebar.css"; // Asegúrate de tener tus estilos CSS importados

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<div className={`sidebar ${isOpen ? "open" : ""}`}>
			<button className="toggle-button" onClick={toggleSidebar}>
				☰
			</button>
			{isOpen && (
				<div className="sidebar-content">
					{/* Contenido del Sidebar */}
					<p>¡Hola! Este es tu Sidebar.</p>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
