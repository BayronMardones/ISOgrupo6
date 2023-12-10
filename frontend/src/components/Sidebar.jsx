import React, { useState } from "react";
import "./Style.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<div className={`sidebar ${isOpen ? "open" : ""}`}>
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
