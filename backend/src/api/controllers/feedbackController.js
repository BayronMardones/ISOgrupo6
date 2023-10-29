import Solicitud from "../models/solicitud.js"; // Importa el modelo de solicitud

// Controlador para crear un nuevo feedback en una solicitud
const createFeedback = async (req, res) => {
	const solicitudId = req.params.solicitud;
	const { comentarios, observaciones, archivosAdjuntos } = req.body;

	try {
		// Encuentra la solicitud por su ID
		const solicitud = await Solicitud.findById(solicitudId);

		if (!solicitud) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		// Crea un nuevo objeto de feedback
		const newFeedback = {
			comentarios,
			observaciones,
			archivosAdjuntos,
		};

		// Agrega el feedback a la solicitud
		solicitud.feedback.push(newFeedback);
		await solicitud.save();

		return res.status(201).json(newFeedback);
	} catch (error) {
		return res.status(500).json({ error: "Error al crear el feedback" });
	}
};

// Controlador para obtener el feedback de una solicitud
const getFeedback = async (req, res) => {
	const solicitudId = req.params.solicitud;
	console.log(solicitudId);

	try {
		// Encuentra la solicitud por su ID
		const solicitud = await Solicitud.findById(solicitudId);
		console.log(solicitud.feedback);

		if (!solicitud) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		const feedback = solicitud.feedback;

		return res.status(200).json(feedback);
	} catch (error) {
		return res.status(500).json({ error: "Error al obtener el feedback" });
	}
};

// Controlador para actualizar el feedback de una solicitud
const updateFeedback = async (req, res) => {
	const solicitudId = req.params.solicitud;
	const feedbackId = req.params.feedbackId;
	const { comentarios, observaciones, archivosAdjuntos } = req.body;

	try {
		// Encuentra la solicitud por su ID
		const solicitud = await Solicitud.findById(solicitudId);

		if (!solicitud) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		// Encuentra el feedback dentro de la solicitud
		const feedback = solicitud.feedback.id(feedbackId);

		if (!feedback) {
			return res.status(404).json({ message: "Feedback no encontrado" });
		}

		// Actualiza los campos del feedback
		feedback.comentarios = comentarios;
		feedback.observaciones = observaciones;
		feedback.archivosAdjuntos = archivosAdjuntos;

		await solicitud.save();

		return res
			.status(200)
			.json({ message: "Feedback actualizado exitosamente" });
	} catch (error) {
		return res.status(500).json({ error: "Error al actualizar el feedback" });
	}
};

// Función para eliminar un objeto de feedback en una solicitud
export const deleteFeedback = async (req, res) => {
	try {

		const solicitudId = req.params.solicitud;
		const feedbackId = req.params.feedbackId;
		// Encuentra la solicitud por su ID
		const solicitud = await Solicitud.findById(solicitudId);

		if (!solicitud) {
			throw new Error("Solicitud no encontrada");
		}

		// Filtra la matriz de feedback para eliminar el objeto específico
		solicitud.feedback = solicitud.feedback.filter(
			(feedback) => feedback._id != feedbackId
		);

		// Guarda la solicitud actualizada
		await solicitud.save();

		return res.status(200).json({ message: "Feedback eliminado exitosamente" });
	} catch (error) {
		throw new Error(`Error al eliminar el feedback: ${error.message}`);
	}
};

// Exporta los controladores
export default {
	createFeedback,
	getFeedback,
	updateFeedback,
	deleteFeedback,
};
