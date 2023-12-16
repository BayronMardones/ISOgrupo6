import Agenda from "../models/agenda.js";
import Solicitud from "../models/solicitud.js";
import Usuario from "../models/usuario.js";

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
			fecha,
		} = req.body;

		// Convierte la fecha a un objeto Date de JavaScript
		const fechaObj = new Date(fecha + '+00:00');
		// Obtiene la fecha y hora actual
		const ahora = new Date();

		// Calcula las fechas una hora antes y una hora después
		const unaHoraAntes = new Date(fechaObj.getTime() - 59 * 60 * 1000);
		const unaHoraDespues = new Date(fechaObj.getTime() + 59 * 60 * 1000);

		// Verifica si el encargado de la visita existe
		const encargadoExistente = await Usuario.findById(encargadoVisita);
		// Verifica si la solicitud existe
		const solicitudExistente = await Solicitud.findById(solicitud);
		
		if (!encargadoExistente) {
			return res.status(400).json({
				message: "El encargado de la visita no existe.",
			});
		}

		if (!solicitudExistente) {
			return res.status(400).json({
				message: "La solicitud no existe.",
			});
		}

		// Verifica si la fecha es anterior a la fecha y hora actual
		if (fechaObj < ahora) {
			return res.status(400).json({
				message: "No se puede agendar una fecha anterior a la actual.",
			});
		}
		
		// Verifica si ya existe una entrada de agenda para la misma fecha
		//const entradaExistente = await Agenda.findOne({ fecha, encargadoVisita });

		const entradaExistente = await Agenda.findOne({
			encargadoVisita,
			fecha: {
				$gte: unaHoraAntes,
				$lte: unaHoraDespues,
			},
		});

		if (entradaExistente) {
			return res.status(400).json({
				message: "Ya existe una entrada de agenda para el mismo encargado dentro de una hora de la fecha proporcionada.",
			});
		}

		const nuevaEntradaAgenda = new Agenda({
			solicitud,
			encargadoVisita,
			estadoAgenda,
			fecha: fechaObj,
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
