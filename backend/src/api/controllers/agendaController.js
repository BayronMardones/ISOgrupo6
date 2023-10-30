import Agenda from "../models/agenda.js";
import enviarCorreo from "./mailerController.js";

// Función para listar todos los usuarios
const listarEntradasAgenda = async (req, res) => {
	try {
		const agendas = await Agenda.find();

		if (agendas.length === 0) {
			return res.status(404).json({ message: "No se encontraron agendas" });
		}

		return res.status(200).send(agendas);
	} catch (err) {
		console.error("Error al listar las entradas de las agendas:", err);
		return res.status(500).json({
			message: "Error al listar las entradas de las agendas:",
			error: err.message,
		});
	}
};

// Función para crear una nueva entrada en la agenda
const crearEntradaAgenda = async (req, res) => {
	try {
		const {
			solicitud,
			encargadoVisita,
			estadoAgenda,
			feedback,
			adjuntos,
			fecha,
		} = req.body;

		// Verifica si ya existe una entrada de agenda para la misma fecha
		const entradaExistente = await Agenda.findOne({ fecha });

		if (entradaExistente) {
			return res.status(400).json({
				message: "Ya existe una entrada de agenda para la misma fecha.",
			});
		}

		const nuevaEntradaAgenda = new Agenda({
			solicitud,
			encargadoVisita,
			estadoAgenda,
			feedback,
			adjuntos,
			fecha,
		});

		const entradaGuardada = await nuevaEntradaAgenda.save();

		res.status(201).json(entradaGuardada);
	} catch (err) {
		console.error("Error al crear una entrada en la agenda:", err);
		res.status(500).json({
			message: "Error al crear una entrada en la agenda",
			error: err.message,
		});
	}
};

// Buscar una entrada en la agenda por ID
const buscarEntradaAgendaPorId = async (req, res) => {
	try {
		const entradaId = req.params.id;
		const entrada = await Agenda.findById(entradaId);
		if (!entrada) {
			return res.status(404).json({ message: "No se encontró la entrada" });
		}
		return res.status(200).send(entrada);
	} catch (err) {
		console.error("Error al buscar una entrada en la agenda:", err);
		return res.status(500).json({
			message: "Error al buscar una entrada en la agenda",
			error: err.message,
		});
	}
};

// Actualizar una entrada en la agenda por ID
const actualizarEntradaAgendaPorId = async (req, res) => {
	try {
		const entradaId = req.params.id;
		const updatedData = req.body;
		const entradaAntigua = await Agenda.findById(entradaId);

		// Imprimir el valor antiguo de estadoAgenda
		console.log("Valor antiguo de estadoAgenda:", entradaAntigua.estadoAgenda);

		const entradaActualizada = await Agenda.findByIdAndUpdate(
			entradaId,
			updatedData,
			{
				new: true,
			}
		);

		if (!entradaActualizada) {
			return res.status(404).json({ message: "Entrada no encontrada" });
		}
		console.log(
			"Valor NUEVO de estadoAgenda:",
			entradaActualizada.estadoAgenda
		);
		// Verifica si estadoAgenda ha cambiado
		if (entradaActualizada.estadoAgenda !== entradaAntigua.estadoAgenda) {
			console.log("Estado de aprobación modificado CORREO ENVIADO");
			// Llama a enviarCorreo solo si estadoAprobacion ha cambiado
			enviarCorreo(updatedData.estadoAgenda);
		}
		return res.status(200).json(entradaActualizada);
	} catch (err) {
		console.error("Error al actualizar una entrada en la agenda:", err);
		res.status(500).json({
			message: "Error al actualizar una entrada en la agenda",
			error: err.message,
		});
	}
};

//	Eliminar una entrada en la agenda por ID
const eliminarEntradaAgendaPorId = async (req, res) => {
	try {
		const entradaId = req.params.id;

		const entradaEliminada = await Agenda.findByIdAndDelete(entradaId);

		if (!entradaEliminada) {
			return res.status(404).json({ message: "Entrada no encontrada" });
		}

		res.status(200).json({ message: "Entrada en la agenda eliminada" });
	} catch (err) {
		console.error("Error al eliminar una entrada en la agenda:", err);
		res.status(500).json({
			message: "Error al eliminar una entrada en la agenda",
			error: err.message,
		});
	}
};

// Exporta las funciones CRUD de la agenda
export default {
	listarEntradasAgenda,
	crearEntradaAgenda,
	buscarEntradaAgendaPorId,
	actualizarEntradaAgendaPorId,
	eliminarEntradaAgendaPorId,
};
