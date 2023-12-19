import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import SolicitudCard from "../components/SolicitudCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SideBarContext";
import SolicitudForm from "../components/SolicitudForm";


const ListaSolicitudes = () => {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [solicitudes, setSolicitudes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { token } = useAuth();
    const { isSidebarOpen } = useSidebar();

	useEffect(() => {
		const fetchSolicitudes = async () => {
			try {
				const response = await axios.get(`${apiUrl}/solicitud/listar`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				});
				console.log(response)
				setSolicitudes(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error al obtener lista de solicitudes:", error);
				setError("Error al cargar la lista de solicitudes.");
				setLoading(false);
			}
		};

		fetchSolicitudes();
	}, [apiUrl, token]);

	if (loading) {
		return <p>Cargando...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
            <Navbar />
            <Sidebar />
			<h2 className="solicitudes-title">Lista de Solicitudes</h2>
			<div className="solicitudes">
				{solicitudes.map((solicitud) => (
					<SolicitudCard key={solicitud._id} solicitud={solicitud} />
				))}
			</div>
			<SolicitudForm/>
			
		</div>

	);
};

export default ListaSolicitudes;
