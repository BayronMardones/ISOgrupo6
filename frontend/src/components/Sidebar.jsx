import React, { useState } from "react";
import "./Style.css";
import permisos from "../pages/permisos"

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<div className={`sidebar ${isOpen ? "open" : ""}`}>
			{isOpen && (
				<div className="sidebar-content">
					{/* Contenido del Sidebar */}
					<p className="sidebar-title" >MODULOS</p>
						<p>
							<button href="#">Inicio</button>
						</p>
						<p>
							<button href="#">Solicitudes</button>
						</p>
						<p>
							<button href="#">Agenda</button>
						</p>
						<p>
							<button href="#">Usuarios</button>
						</p>
						<p>
							<button href="#">Contacto</button>
						</p>
						<p>
							<button href="#">Cerrar Sesión</button>
						</p>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
