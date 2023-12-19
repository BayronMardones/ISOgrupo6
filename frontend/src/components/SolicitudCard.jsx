import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const SolicitudCard = ({ solicitud }) => {
	const { _id, detalles } = solicitud;

	return (
		<div className="solicitud-card">
			<p>ID de Solicitud: {_id}</p>
			<p>Detalles: {detalles}</p>
			{/* Agrega más detalles según la estructura de tu objeto de solicitud */}
			<Link to={`/feedback/${_id}`}>Ver Detalles</Link>
		</div>
	);
};

export default SolicitudCard;
