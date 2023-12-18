import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Style.css";

const FeedbackList = ({ solicitudId }) => {
	const { token } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;
	const [feedbackList, setFeedbackList] = useState([]);

	const handleDeleteComment = async (feedbackId) => {
		try {
			await axios.delete(`${apiUrl}/feedback/${solicitudId}/${feedbackId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			});

			window.location.reload();
		} catch (error) {
			console.error("Error al eliminar comentario:", error);
		}
	};

	useEffect(() => {
		const fetchFeedback = async () => {
			try {
				const response = await axios.get(`${apiUrl}/feedback/${solicitudId}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				});

				

				// Filtra los feedbacks que no tienen campos
				const filteredFeedbacks = response.data.filter(
					(feedback) => feedback.comentarios !== null
				);

				setFeedbackList(filteredFeedbacks);
			} catch (error) {
				console.error("Error al obtener feedback:", error);
			}
		};

		fetchFeedback();
	}, [solicitudId, token, apiUrl]);

	return (
		<div className="feedback-container">
			<h3>Feedback</h3>
			<div className="feedback">
				<div>
					<h2>Comentarios</h2>
					{feedbackList.map((feedback) => (
						<div key={feedback._id} >
							{feedback.comentarios && (
								<div className="comentario">
									<p >{feedback.comentarios}</p>
									{feedback.createdAt && (
										<p className="fecha-publicacion">
											{new Date(feedback.createdAt).toLocaleString()}
										</p>
									)}
									<button onClick={() => handleDeleteComment(feedback._id)}>
										Eliminar
									</button>
								</div>
							)}
							{/* Agrega campos adicionales según tus necesidades */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FeedbackList;
