import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Style.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            {isOpen && (
                <div className="sidebar-content">
                    {/* Contenido del Sidebar */}
                    <p className="sidebar-title">MODULOS</p>
                    <p>
                        <NavLink to="/home" onClick={toggleSidebar}>
                            Inicio
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/solicitudes" onClick={toggleSidebar}>
                            Solicitudes
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/agenda" onClick={toggleSidebar}>
                            Agenda
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/usuarios" onClick={toggleSidebar}>
                            Usuarios
                        </NavLink>
                    </p>
                    <p>
                        <NavLink to="/contacto" onClick={toggleSidebar}>
                            Contacto
                        </NavLink>
                    </p>
                    <p>
                        <Link to="#" onClick={toggleSidebar}>
                            Cerrar Sesión
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
