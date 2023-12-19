import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SolicitudCard = ({ solicitud }) => {
	const { _id, solicitante } = solicitud;
	const { token } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;

	// funcion para eliminar una solicitud
	const eliminarSolicitud = async (id) => {
		try {
			await axios.delete(`${apiUrl}/solicitud/eliminar/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			});
			window.location.reload();
		} catch (error) {
			console.error("Error al eliminar la solicitud:", error);
			setError("Error al eliminar la solicitud.");
		}
	};

	return (
		<Link to={`/feedback/${_id}`}>
			<div className="solicitud-card">
				<p>ID de Solicitud: {_id}</p>
				<p>Solicitante: {solicitante}</p>
				{/* Agrega más detalles según la estructura de tu objeto de solicitud */}
				<button
					onClick={() => eliminarSolicitud(_id)}
					className="delete-button-solicitud">
					Eliminar
				</button>
				<Link to={`/agendar/${_id}`}>
					<button className="delete-button-solicitud">
						Agendar
					</button>
				</Link>
			</div>
		</Link>
	);
};

export default SolicitudCard;
