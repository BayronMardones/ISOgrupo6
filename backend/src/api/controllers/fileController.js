import { application } from "express";
import Solicitud from "../models/solicitud.js";
import fileUpload from "../models/file.js";
import fs from "fs";
import solicitud from "../models/solicitud.js";
import { arch } from "os";

const uploadfile = async (req, res) => {
	const { files } = req;
	const { id } = req.params;

	const newFiles = await Promise.all(
		files.map(async (file) => {
			const newFile = new fileUpload({
				url: file.path,
				name: file.originalname,
				mimeType: file.mimetype,
				idSolicitud: id,
				idFeedback: null,
			});
			await newFile.save();
			return newFile;
		})
	);
	return res.status(201).send(newFiles);
};

const getFiles = (req, res) => {
	fileModel.find({}, (err, file) => {
		if (err) {
			return res.status(400).send({ message: "Error al obtener los archivos" });
		}
		return res.status(200).send(file);
	});
};

const getSpecificFile = (req, res) => {
	const { id } = req.params;
	fileModel.findById(id, (err, file) => {
		if (err) {
			return res.status(400).send({ message: "Error al obtener el archivo" });
		}
		if (!file) {
			return res.status(404).send({ message: "Archivo no existe" });
		}
		return res.download("./" + file.url);
	});
};

const deleteFile = async (req, res) => {
	const { id } = req.params;

	// Buscar el archivo por ID.
	const file = await fileUpload.findById(id);

	// Si el archivo no existe, devolver una respuesta de error.
	if (!file) {
		return res.status(404).send({ message: "Archivo no encontrado." });
	}

	console.log(file);

	// Eliminar el archivo.
	await fileUpload.findByIdAndRemove(id);

	// Eliminar el archivo del sistema de archivos.
	fs.unlink(file.url, (error) => {
		if (error) {
			// Registrar el error, pero no devolver una respuesta de falla.
			console.log(error);
		}
	});
	// Enviar una respuesta de éxito.
	return res.status(200).send({ message: "Archivo eliminado correctamente." });
};

// -----------------------crud para feedbackFiles-------------------

// Controlador para subir un archivo de feedback debe incluir el id de la solicitud y del feedback
const uploadFeedbackFile = async (req, res) => {
	const { files } = req;
	const solicitudId = req.params.solicitud;
	// Busca la solicitud por id
	const solicitudEncontrada = await Solicitud.findById(solicitudId);
	// Si no existe la solicitud
	if (!solicitudEncontrada) {
		return res.status(404).json({ message: "Solicitud no encontrada" });
	}
	// Si existe la solicitud, creo un nuevo feedback vacío
	const nuevoFeedback = {
		comentarios: "",
		observaciones: "",
		archivosAdjuntosFeedback: [],
	};
	// Guarda el nuevo feedback en la solicitud y actualiza la solicitud
	solicitudEncontrada.feedback.push(nuevoFeedback);
	await solicitudEncontrada.save();
	// Obtiene el id del feedback creado
	const feedbackId =
		solicitudEncontrada.feedback[solicitudEncontrada.feedback.length - 1]._id;
	const newFiles = await Promise.all(
		files.map(async (file) => {
			const newFile = new fileUpload({
				url: file.path,
				name: file.originalname,
				mimeType: file.mimetype,
				idSolicitud: solicitudId,
				idFeedback: feedbackId,
			});
			await newFile.save();
			// Verifica si la propiedad archivosAdjuntosFeedback existe, y si no, inicialízala como un array vacío
			solicitudEncontrada.feedback[
				solicitudEncontrada.feedback.length - 1
			].archivosAdjuntosFeedback =
				solicitudEncontrada.feedback[solicitudEncontrada.feedback.length - 1].archivosAdjuntosFeedback || [];
			//guarda el id del archivo en el feedback
			solicitudEncontrada.feedback[solicitudEncontrada.feedback.length - 1].archivosAdjuntosFeedback.push(newFile._id);
			// Guarda la solicitud actualizada en la base de datos
			await solicitudEncontrada.save();
			return newFile;
		})
	);
	return res.status(201).send(newFiles);
};

// Controlador para obtener todos los archivos de un feedback según el id de solicitud
const getFeedbackFiles = async (req, res) => {
	const { solicitud } = req.params;
	// Busca la solicitud por id
	const solicitudEncontrada = await Solicitud.findById(solicitud);
	// Si no existe la solicitud
	if (!solicitudEncontrada) {
		return res.status(404).json({ message: "Solicitud no encontrada" });
	}
	// Si existe la solicitud, obtiene los feedbacks
	const feedbacks = solicitudEncontrada.feedback;
	// Si no hay feedbacks
	if (!feedbacks) {
		return res.status(404).json({ message: "No hay feedbacks" });
	}
	const archivosAdjuntosFeedback = await fileUpload.find({
		idSolicitud: solicitud,
		idFeedback: {
			$in: feedbacks
				.filter((feedback) => feedback.archivosAdjuntosFeedback.length > 0)
				.map((feedback) => feedback._id),
		},
	});


	return res.status(200).send(archivosAdjuntosFeedback);
};


const getSpecificFeedbackFile = async (req, res) => {
	// Obtener el id de la solicitud y del feedback
	const { solicitud, feedbackId, fileId } = req.params;
	// Buscar la solicitud por id
	const solicitudEncontrada = await Solicitud.findById(solicitud);
	// Si no existe la solicitud
	if (!solicitudEncontrada) {
		return res.status(404).json({ message: "Solicitud no encontrada" });
	}
	// Si existe la solicitud, obtiene los feedbacks
	const feedbacks = solicitudEncontrada.feedback;
	// Buscar el feedback por ID
	const feedback = feedbacks.find((feedback) => feedback._id == feedbackId);
	// Si el feedback no existe, devolver una respuesta de error.
	if (!feedback) {
		return res.status(404).send({ message: "Feedback no encontrado." });
	}
	// Buscar el archivo por ID dentro del feedback
	const file = await fileUpload.findById(fileId);
	// Si el archivo no existe, devolver una respuesta de error.
	if (!file) {
		return res.status(404).send({ message: "Archivo no encontrado." });
	}
	// Si el archivo existe, lo descarga.
	return res.download("./" + file.url);
};

// Controlador para eliminar un archivo de feedback según el id de la solicitud, la id del feedback y el del archivo archivo
const deleteFeedbackFile = async (req, res) => {
	// Obtener el id de la solicitud y del feedback
	const { solicitud, feedbackId, fileId } = req.params;
	// Buscar la solicitud por id
	const solicitudEncontrada = await Solicitud.findById(solicitud);
	// Si no existe la solicitud
	if (!solicitudEncontrada) {
		return res.status(404).json({ message: "Solicitud no encontrada" });
	}
	// Si existe la solicitud, obtiene los feedbacks
	const feedbacks = solicitudEncontrada.feedback;
	// Buscar el feedback por ID
	const feedback = feedbacks.find((feedback) => feedback._id == feedbackId);
	// Si el feedback no existe, devolver una respuesta de error.
	if (!feedback) {
		return res.status(404).send({ message: "Feedback no encontrado." });
	}
	// Buscar el archivo por ID dentro del feedback
	const file = await fileUpload.findById(fileId);
	// Si el archivo no existe, devolver una respuesta de error.
	if (!file) {
		return res.status(404).send({ message: "Archivo no encontrado." });
	}
	// Eliminar el archivo del sistema de archivos.
	fs.unlink(file.url, (error) => {
		if (error) {
			// Registrar el error, pero no devolver una respuesta de falla.
			console.log(error);
		}
	});
	// Eliminar el archivo de la base de datos.
	await fileUpload.findByIdAndRemove(fileId);
	// Enviar una respuesta de éxito.
	return res.status(200).send({ message: "Archivo eliminado correctamente." });
};



export default {
	uploadfile,
	getFiles,
	getSpecificFile,
	deleteFile,

	uploadFeedbackFile,
	getFeedbackFiles,
	getSpecificFeedbackFile,
	deleteFeedbackFile,

};
