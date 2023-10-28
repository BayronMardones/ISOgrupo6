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

export default {
	listarUsuarios,
	crearUsuario,
	buscarUsuarioPorID,
	actualizarUsuarioPorID,
	eliminarUsuarioPorID,
};
