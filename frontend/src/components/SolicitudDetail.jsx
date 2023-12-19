import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Style.css";

const SolicitudDetalle = ({ solicitudId }) => {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [solicitud, setSolicitud] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [newEstado, setNewEstado] = useState("");
	const { token } = useAuth();

	useEffect(() => {
		const fetchSolicitud = async () => {
			try {
				const response = await axios.get(
					`${apiUrl}/solicitud/buscar/${solicitudId}`,
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

	const handleEstadoChange = (e) => {
		setNewEstado(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validar que se haya seleccionado un estado
		if (!newEstado) {
			setError("Por favor, selecciona un estado.");
			return;
		}

		try {
			await axios.patch(
				`${apiUrl}/solicitud/modificarEstado/${solicitudId}`,
				{ estado: newEstado },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			setSolicitud((prevSolicitud) => ({
				...prevSolicitud,
				estado: newEstado,
			}));

			// Limpia el estado de error después de una operación exitosa
			setError("");

			// No es recomendable recargar la página de esta manera, considera otras opciones como actualizar el estado local.
			window.location.reload();
		} catch (error) {
			console.error("Error al cambiar el estado de la solicitud:", error);
			setError("Error al cambiar el estado de la solicitud.");
		}
	};

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
			<h2>Detalle de la Solicitud</h2>
			<p>ID de Solicitud: {solicitud._id}</p>
			<p>Solicitante: {solicitud.solicitante}</p>
			<p>Estado: {solicitud.estado}</p>
			<p>Detalle: {solicitud.detalles}</p>
			<p>Fecha de Creación: {new Date(solicitud.createdAt).toLocaleString()}</p>

			{/* Formulario para cambiar el estado */}
			<form onSubmit={handleSubmit} className="formulario-estado">
				<label htmlFor="newEstado">Cambiar Estado</label>
				<select id="newEstado" value={newEstado} onChange={handleEstadoChange}>
					<option value="" disabled>
						Selecciona un estado
					</option>
					<option value="ingresada">Ingresada</option>
					<option value="pendiente">Pendiente</option>
					<option value="aprobado">Aprobado</option>
					<option value="rechazado">Rechazado</option>
				</select>
				<button type="submit"> Guardar </button>
			</form>
		</div>
	);
};

export default SolicitudDetalle;
