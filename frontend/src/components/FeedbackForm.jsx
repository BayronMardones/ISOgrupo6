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
                    'Authorization': token,
                },
            });

            onFeedbackAdded();
        } catch (error) {
            console.error("Error al enviar feedback:", error);
        }
    };

    return (
        <form className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Agrega campos del formulario según tus necesidades */}
            <textarea className="feedback-input" {...register("comentarios")} placeholder="Nuevo comentario..." />
            <input className="feedback-submit" type="submit" value="Agregar Feedback" />
        </form>
    );
};

export default FeedbackForm;
