"use strict";
import Solicitud from "../models/solicitud.js";
import Usuario from "../models/usuario.js";

// Función para listar todos los usuarios
const listarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();

		if (usuarios.length === 0) {
			return res.status(404).json({ message: "No se encontraron usuarios" });
		}

		return res.status(200).send(usuarios);
	} catch (err) {
		console.error("Error al listar los usuarios:", err);
		return res
			.status(500)
			.json({ message: "Error al listar los usuarios", error: err.message });
	}
};

// Función para crear un nuevo usuario
const crearUsuario = async (req, res) => {
	try {
		if (!/^([0-9]{1,3}(.[0-9]{3})|[0-9]{1,3}(,[0-9]{3})|[0-9]+)-(k|K|[0-9])$/.test(req.body.rut)) {
			return res
				.status(400)
				.json({ message: "El RUT ingresado no es válido, debes seguir el formato xx.xxx.xxx-x" });
		}
		// Busca en la base de datos si existe algun usuario con el mismo rut
		const usuarioExistente = await Usuario.findOne({ rut: req.body.rut });
		// Si existe un usuario con el mismo rut, devolver un error
		if (usuarioExistente) {
			return res
				.status(409)
				.json({ message: "Ya existe un usuario con el mismo rut" });
		}
		const nuevoUsuario = new Usuario(req.body);
		const usuario = await nuevoUsuario.save();
		res.status(201).json(usuario);
	} catch (err) {
		console.error("Error al crear un usuario:", err);
		return res
			.status(500)
			.json({ message: "Error al crear un usuario", error: err.message });
	}
};

// Función para buscar un usuario por su ID
const buscarUsuarioPorID = async (req, res) => {
	try {
		const usuario = await Usuario.findById(req.params.id);

		if (!usuario) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		return res.status(200).json(usuario);
	} catch (err) {
		console.error("Error al buscar un usuario:", err);
		return res
			.status(500)
			.json({ message: "Error al buscar un usuario", error: err.message });
	}
};

// Función para actualizar un usuario por su ID
const actualizarUsuarioPorID = async (req, res) => {
	try {
		const userId = req.params.id;
		const updatedData = req.body;

		const user = await Usuario.findByIdAndUpdate(userId, updatedData, {
			new: true,
		});

		if (!user) {
			return res.status(404).send("Usuario no encontrado");
		}

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Función para eliminar un usuario por su ID
const eliminarUsuarioPorID = async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await Usuario.findByIdAndRemove(userId);

		if (!user) {
			return res.status(404).send("Usuario no encontrado");
		}

		res.send("Usuario eliminado exitosamente");
	} catch (error) {
		res.status(500).send(error);
	}
};

// Función para obtener una solicitud por el rut del solicitante
const obtenerSolicitud = async (req, res) => {
	try {
		// Obtener el rut del usuario
		const rut = req.body.rut.rut;
		console.log(rut);
		// Buscar la solicitud en la base de datos
		const solicitud = await Solicitud.find({ rutSolicitante: rut });

		// Si la solicitud no existe, devolver un error
		if (!solicitud) {
			return res.status(404).json({ message: "Solicitud no encontrada" });
		}

		// Devolver la solicitud
		res.status(200).json(solicitud);
	} catch (error) {
		// Devolver un error
		res
			.status(500)
			.json({ message: "Error al obtener la solicitud", error: error });
	}
};

// modulo para modificar el rol de un usuario según su rut sin "try"

const ModificarRol = async (req, res) => {
	const rut = req.body.rut;
	const rol = req.body.rol;

	// Buscar el usuario en la base de datos
	const user = await Usuario.findOne({ rut });

	// Si el usuario no existe, devolver un error
	if (!user) {
		return res.status(404).send("Usuario no encontrado");
	}

	// Modificar el rol del usuario
	const update = await Usuario.findOneAndUpdate({ rut: rut }, { rol: rol });
	// Espera a que se guarde el update para continuar

	// Si el documento actualizado no tiene el rol modificado, devolver un error
	if (update.rol == rol) {
		return res.status(400).send("Error al modificar el rol del usuario");
	}

	// Devolver una respuesta exitosa
	res.send("Usuario modificado exitosamente");
};

const listarUsuariosPorRol = async (req, res) => {
	try {
		const rol = req.params.rol;

		// Buscar usuarios en la base de datos que coincidan con el rol
		const usuarios = await Usuario.find({ rol });

		// Si no se encontraron usuarios, devolver un error
		if (!usuarios.length) {
			return res.status(404).send("No se encontraron usuarios con ese rol");
		}

		// Devolver la lista de usuarios
		return res.status(200).json(usuarios);
	} catch (error) { 
		// Devolver un error
		return res.status(500).json({ message: "Error al listar los usuarios", error: error });
	}

};

export default {
	listarUsuarios,
	crearUsuario,
	buscarUsuarioPorID,
	actualizarUsuarioPorID,
	eliminarUsuarioPorID,
	obtenerSolicitud,
	ModificarRol,
	listarUsuariosPorRol,
};
