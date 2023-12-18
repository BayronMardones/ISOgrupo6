import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Style.css";

const FeedbackForm = ({ solicitudId, onFeedbackAdded }) => {
	const { register, handleSubmit } = useForm();
	const { token } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;

	const onSubmit = async (data) => {
		try {
			await axios.post(`${apiUrl}/feedback/${solicitudId}`, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			});

			onFeedbackAdded();
		} catch (error) {
			console.error("Error al enviar feedback:", error);
		}
	};

	const onFileSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append("feedbackFile", data.feedbackFile[0]);

			await axios.post(`${apiUrl}/feedback/${solicitudId}/feedbackFiles`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: token,
				},
			});

			onFeedbackAdded();
		} catch (error) {
			console.error("Error al enviar archivo:", error);
		}
	};

	return (
		<div>
			<form className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
				<textarea
					className="feedback-input"
					{...register("comentarios")}
					placeholder="Nuevo comentario..."
				/>

				<input
					className="feedback-submit"
					type="submit"
					value="Agregar Feedback"
				/>
			</form>
			{/* Formulario para los archivos */}
			<form className="feedback-form" onSubmit={handleSubmit(onFileSubmit)}>
				<input
					className="feedback-input"
					type="file"
					{...register("feedbackFile")}
				/>
				<input
					className="feedback-submit"
					type="submit"
					value="Agregar Archivo"
				/>
			</form>
		</div>
	);
};

export default FeedbackForm;
