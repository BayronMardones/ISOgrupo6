// Importa el modelo de solicitud
import Solicitud from "../models/solicitud.js";
import Usuario from "../models/usuario.js";

// Listar todas las solicitudes
const listarSolicitudes = async (req, res) => {
	try {
		const solicitudes = await Solicitud.find();

		if (solicitudes.length === 0) {
			return res.status(404).json({ message: "No se encontraron solicitudes" });
		}

		return res.status(200).send(solicitudes);
	} catch (err) {
		console.error("Error al listar los solicitudes:", err);
		return res
			.status(500)
			.json({ message: "Error al listar los solicitudes", error: err.message });
	}
};

// Función para crear una nueva solicitud
const crearSolicitud = async (req, res) => {
	try {
		const { solicitante, detalles, estado, archivosAdjuntos, rutSolicitante } = req.body;

		const nuevaSolicitud = new Solicitud({
			solicitante,
			detalles,
			estado,
			archivosAdjuntos,
			rutSolicitante,
		});

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
		const solicitudId = req.params.id;
		const updatedData = req.body;

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
		return res.status(200).json(solicitudActualizada);
	} catch (err) {
		console.error("Error al actualizar una solicitud por ID:", err);
		res
			.status(500)
			.json({
				message: "Error al actualizar una solicitud por ID",
				error: err.message,
			});
	}
};

// Función para buscar una solicitud por su ID
const buscarSolicitudPorId = async (req, res) => {
	try {
		const solicitudId = req.params.id; // Suponiendo que el ID se pasa como un parámetro en la URL

		const solicitudEncontrada = await Solicitud.findById(solicitudId);

		if (!solicitudEncontrada) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		res.status(200).json(solicitudEncontrada);
	} catch (err) {
		console.error("Error al buscar una solicitud por ID:", err);
		res
			.status(500)
			.json({
				message: "Error al buscar una solicitud por ID",
				error: err.message,
			});
	}
};

// Función para eliminar una solicitud por su ID
const eliminarSolicitudPorId = async (req, res) => {
	try {
		const solicitudId = req.params.id; // Suponiendo que el ID se pasa como un parámetro en la URL

		const solicitudEncontrada = await Solicitud.findByIdAndDelete(solicitudId);

		if (!solicitudEncontrada) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		res.status(200).json({ message: "Solicitud eliminada" });
	} catch (err) {
		console.error("Error al eliminar una solicitud por ID:", err);
		res
			.status(500)
			.json({
				message: "Error al eliminar una solicitud por ID",
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
};
