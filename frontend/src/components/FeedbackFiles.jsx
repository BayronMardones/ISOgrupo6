import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FeedbackImageList = ({ solicitudId }) => {
    const [feedbackFiles, setFeedbackFiles] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { token } = useAuth();

    const [error, setError] = useState(null);

    const fetchFeedbackFiles = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/feedback/files/${solicitudId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            setFeedbackFiles(response.data);
        } catch (error) {
            console.error("Error al obtener archivos de feedback:", error);
            setError("Error al cargar las imágenes de feedback.");
        }
    };

    const handleDeleteImage = async (feedbackId, fileId) => {
        try {
            await axios.delete(
                `${apiUrl}/feedback/file/delete/${solicitudId}/${feedbackId}/${fileId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            // Actualizar la lista de imágenes después de eliminar
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
            setError("Error al eliminar la imagen.");
        }
    };

    useEffect(() => {
        fetchFeedbackFiles();
    }, [solicitudId, token, apiUrl]);

    return (
        <div>
            <h3>Imágenes de Feedback</h3>
            {error && <p>{error}</p>}
            {feedbackFiles.map((file) => (
                <div key={file._id}>
                    <img className="img-feedback"
                        src={`${apiUrl}/feedback/file/download/${file.idSolicitud}/${file.idFeedback}/${file._id}`}
                        alt={file.name}
                    />
                    <button onClick={() => handleDeleteImage(file.idFeedback, file._id)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FeedbackImageList;
