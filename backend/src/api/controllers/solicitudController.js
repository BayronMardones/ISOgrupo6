//const fs = require('fs');
import Solicitud from "../models/solicitud.js";
import multer from "multer";
import fs from "fs";
import File from "../models/file.js";
import Usuario from "../models/usuario.js";
import enviarCorreo from "./mailerController.js";
//const upload = multer({ storage: storage });

const listarSolicitudes = async (req, res) => {
	try {
		const solicitudes = await Solicitud.find();

		if (solicitudes.length === 0) {
			return res.status(404).json({ message: "No se encontraron solicitudes" });
		}

		return res.status(200).json(
			solicitudes.map((solicitud) => {
				return {
					...solicitud.toObject(), // Convierte el documento de Mongoose a un objeto plano
					archivosAdjuntos: solicitud.archivosAdjuntos.map((archivo) => {
						if (archivo && archivo.nombre && archivo.archivo) {
							return {
								nombre: archivo.nombre,
								archivo: `/data/${archivo.archivo}`,
							};
						} else {
							return null; // O maneja el caso en que los datos estén incompletos
						}
					}),
				};
			})
		);
	} catch (err) {
		console.error("Error al listar las solicitudes:", err);
		return res
			.status(500)
			.json({ message: "Error al listar las solicitudes", error: err.message });
	}
};

// Función para crear una nueva solicitud
const crearSolicitud = async (req, res) => {
	try {
		const { archivosAdjuntos } = req.body;
		// Recupera los IDs de los archivos desde el cuerpo de la solicitud
		const archivosAdjuntosId = req.body.archivosAdjuntos;
		//verificar que el estado este correcto
		const estadosPermitidos = ["aprobado", "rechazado", "pendiente"];

		console.log("archivosAdjuntosId:", archivosAdjuntosId);

		if (!archivosAdjuntos || !Array.isArray(archivosAdjuntos)) {
			return res.status(400).json({
				message: "La propiedad 'archivosAdjuntos' no es un array válido.",
			});
		}

		// Verifica que los archivos existan en la base de datos antes de asociarlos a la solicitud
		const archivosExistentes = await File.find({
			_id: { $in: archivosAdjuntos },
		});

		if (archivosAdjuntos.length !== archivosExistentes.length) {
			return res
				.status(400)
				.json({ message: "Algunos archivos adjuntos no existen." });
		}

		const direccion = {
			zona: req.body.direccion.zona,
			calle: req.body.direccion.calle,
			numero: req.body.direccion.numero,
		};

		//Nueva solicitud con los IDs de archivos asociados
		const nuevaSolicitud = new Solicitud({
			solicitante: req.body.solicitante,
			fecha: req.body.fecha,
			tipo: req.body.tipo,
			estado: req.body.estado,
			direccion: direccion,
			archivosAdjuntos: archivosAdjuntos, // Utiliza el array de IDs directamente
			feedback: req.body.feedback,
		});

		// Verifica que el estado sea válido
		if (
			req.body.estado !== undefined &&
			!estadosPermitidos.includes(req.body.estado)
		) {
			return res.status(400).json({ message: "El estado no es válido." });
		}

		// Guarda la solicitud en la base de datos
		const solicitudGuardada = await nuevaSolicitud.save();

		res.status(201).json(solicitudGuardada);
	} catch (err) {
		console.error("Error al crear una solicitud:", err);
		res
			.status(500)
			.json({ message: "Error al crear una solicitud", error: err.message });
	}
};

// Función para crear una nueva solicitud
const crearSolicitudNoFile = async (req, res) => {
	console.log("no file")
	console.log(req.body)
	const { archivosAdjuntos } = req.body;
		//verificar que el estado este correcto
		const estadosPermitidos = ["aprobado", "rechazado", "pendiente"];

		const direccion = {
			zona: req.body.direccion.zona,
			calle: req.body.direccion.calle,
			numero: req.body.direccion.numero,
		};
		// Verifica que el estado sea válido
		if (
			req.body.estado !== undefined &&
			!estadosPermitidos.includes(req.body.estado)
		) {
			return res.status(400).json({ message: "El estado no es válido." });
		}

		//Nueva solicitud con los IDs de archivos asociados
		const nuevaSolicitud = new Solicitud({
			solicitante: req.body.solicitante,
			detalles: req.body.detalles,
			estado: req.body.estado,
			direccion: direccion,
			archivosAdjuntos: "", // Se deja en null por falta de archivos
			feedback: null,
		});
		
	try {
		// Guarda la solicitud en la base de datos
		const solicitudGuardada = await nuevaSolicitud.save();

		res.status(201).json(solicitudGuardada);
	} catch (err) {
		console.error("Error al crear una solicitud:", err);
		res
			.status(500)
			.json({ message: "Error al crear una solicitud", error: err.message });
	}
};

// Función para actualizar una solicitud por su ID
const actualizarSolicitudPorId = async (req, res) => {
	try {
		const estadosPermitidos = ["aprobado", "rechazado", "pendiente"];
		const solicitudId = req.params.id;
		const updatedData = req.body;
		const entradaAntigua = await Solicitud.findById(solicitudId);

		const solicitudActualizada = await Solicitud.findByIdAndUpdate(
			solicitudId,
			updatedData,
			{
				new: true,
			}
		);

		if (!solicitudActualizada) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		if (!estadosPermitidos.includes(solicitudActualizada.estado)) {
			return res.status(400).json({ message: "El estado no es válido." });
		}

		if (solicitudActualizada.estado !== entradaAntigua.estado) {
			const usuario = await Usuario.findById(solicitudActualizada.solicitante);

			// Llama a enviarCorreo solo si estadoAprobacion ha cambiado
			enviarCorreo(solicitudActualizada, usuario);
		}

		return res.status(200).json(solicitudActualizada);
	} catch (err) {
		console.error("Error al actualizar una solicitud por ID:", err);
		res.status(500).json({
			message: "Error al actualizar una solicitud por ID",
			error: err.message,
		});
	}
};

// Función para buscar una solicitud por su ID
const buscarSolicitudPorId = async (req, res) => {
	try {
		const solicitudId = req.params.id;

		const solicitudEncontrada = await Solicitud.findById(solicitudId);

		if (!solicitudEncontrada) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		res.status(200).json(solicitudEncontrada);
	} catch (err) {
		console.error("Error al buscar una solicitud por ID:", err);
		res.status(500).json({
			message: "Error al buscar una solicitud por ID",
			error: err.message,
		});
	}
};

// Función para eliminar una solicitud por su ID
const eliminarSolicitudPorId = async (req, res) => {
	try {
		const solicitudId = req.params.id;

		const solicitudEncontrada = await Solicitud.findByIdAndDelete(solicitudId);

		if (!solicitudEncontrada) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		res.status(200).json({ message: "Solicitud eliminada" });
	} catch (err) {
		console.error("Error al eliminar una solicitud por ID:", err);
		res.status(500).json({
			message: "Error al eliminar una solicitud por ID",
			error: err.message,
		});
	}
};

// funcion para aprobar una solicitud por su ID
const modificarEstadoPorId = async (req, res) => {
	try {
		const solicitudId = req.params.id;
		const estadoActual = req.body.estado;

		const solicitudEncontrada = await Solicitud.findById(solicitudId);

		if (!solicitudEncontrada) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		solicitudEncontrada.estado = estadoActual;

		const solicitudActualizada = await solicitudEncontrada.save();

		res.status(200).json(solicitudActualizada);
	} catch (err) {
		console.error("Error al actualizar el estado de la solicitud: ", err);
		res.status(500).json({
			message: "Error al actualizar el estado de la solicitud: ",
			error: err.message,
		});
	}
};

export default {
	listarSolicitudes,
	crearSolicitud,
	buscarSolicitudPorId,
	actualizarSolicitudPorId,
	eliminarSolicitudPorId,
	modificarEstadoPorId,
	crearSolicitudNoFile,
};
