import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SolicitudDetalle = (solicitudId) => {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [solicitud, setSolicitud] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const { token } = useAuth();

	useEffect(() => {
		const fetchSolicitud = async () => {
			try {
				const response = await axios.get(
					`${apiUrl}/solicitud/buscar/${solicitudId.solicitudId}  `,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    }
				);
				setSolicitud(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error al obtener detalle de la solicitud:", error);
				setError("Error al cargar el detalle de la solicitud.");
				setLoading(false);
			}
		};

		fetchSolicitud();
	}, [apiUrl, solicitudId, token]);

	if (loading) {
		return <p>Cargando...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!solicitud) {
		return <p>No se encontró la solicitud.</p>;
	}

	return (
		<div className="solicitud-details">
			<p>ID de Solicitud: {solicitud._id}</p>
            <p>Solicitante: {solicitud.solicitante}</p>
            <p>Estado: {solicitud.estado}</p>
			<p>Descripción: {solicitud.descripcion}</p>
			<p>Fecha de Creación: {new Date(solicitud.createdAt).toLocaleString()}</p>
			{/* Agrega más detalles según la estructura de tu objeto de solicitud */}
		</div>
	);
};

export default SolicitudDetalle;
