import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Style.css";

const FeedbackList = ({ solicitudId }) => {
    const { token } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [feedbackList, setFeedbackList] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [editedComment, setEditedComment] = useState("");

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

    const handleEditComment = (feedbackId) => {
        setEditingComment(feedbackId);
        const commentToEdit = feedbackList.find((feedback) => feedback._id === feedbackId);
        setEditedComment(commentToEdit.comentarios || "");
    };

    const handleSaveEdit = async (feedbackId) => {
        try {
            await axios.put(
                `${apiUrl}/feedback/${solicitudId}/${feedbackId}`,
                { comentarios: editedComment },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            setEditingComment(null);
            window.location.reload();
        } catch (error) {
            console.error("Error al editar comentario:", error);
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
            <div className="feedback">
                <div>
                    <h2>Comentarios</h2>
                    {feedbackList.map((feedback) => (
                        <div key={feedback._id}>
                            {feedback.comentarios && (
                                <div className="comentario">
                                    {editingComment === feedback._id ? (
                                        <>
                                            <textarea
                                                value={editedComment}
                                                onChange={(e) => setEditedComment(e.target.value)}
                                            />
                                            <button onClick={() => handleSaveEdit(feedback._id)}>
                                                Guardar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{feedback.comentarios}</p>
                                            {feedback.createdAt && (
                                                <p className="fecha-publicacion">
                                                    {new Date(feedback.createdAt).toLocaleString()}
                                                </p>
                                            )}
                                            <button onClick={() => handleDeleteComment(feedback._id)}>
                                                Eliminar
                                            </button>
                                            <button onClick={() => handleEditComment(feedback._id)}>
                                                Editar
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackList;
