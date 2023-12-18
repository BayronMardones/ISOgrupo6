import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FeedbackImageList = ({ solicitudId }) => {
	const [feedbackFiles, setFeedbackFiles] = useState([]);
	const apiUrl = import.meta.env.VITE_API_URL;
	const { token } = useAuth();

	const [error, setError] = useState(null);

	useEffect(() => {
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
                console.log(response.data);
			} catch (error) {
				console.error("Error al obtener archivos de feedback:", error);
				setError("Error al cargar las imágenes de feedback.");
			}
		};

		fetchFeedbackFiles();
	}, [solicitudId, token, apiUrl]);


return (
    <div>
        <h3>Imágenes de Feedback</h3>
        {error && <p>{error}</p>}
        {feedbackFiles.map((file) => (
            <div key={file._id}>
                <img
                    src={file.url}
                    alt={file.name}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </div>
        ))}
    </div>
);

};

export default FeedbackImageList;
