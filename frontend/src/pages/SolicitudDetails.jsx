// pages/SolicitudDetails.js
import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FeedbackImageList from "../components/FeedbackFiles";
import { useSidebar } from "../context/SideBarContext";

const SolicitudDetails = () => {
	const { id } = useParams(); // Use useParams to get parameters from the URL
	const { isSidebarOpen } = useSidebar();

	const handleFeedbackAdded = () => {
		// Actualiza la lista de feedbacks al agregar un nuevo feedback
		window.location.reload();
	};

	const handleFeedbackDeleted = () => {
		// Actualiza la lista de feedbacks al eliminar un feedback
		window.location.reload();
	}

	return (
		<div className={`page-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
			<Navbar />
			<Sidebar />
			<h2>Detalles de la Solicitud</h2>
			{/* Muestra detalles de la solicitud según tus necesidades */}

			<FeedbackList solicitudId={id} onFeedbackDeleted={handleFeedbackDeleted}/>
			<FeedbackForm solicitudId={id} onFeedbackAdded={handleFeedbackAdded} />
			<FeedbackImageList solicitudId={id} />
		</div>
	);
};

export default SolicitudDetails;
