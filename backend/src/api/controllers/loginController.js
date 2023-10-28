import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";
// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
	try {
        
		// Obtener el rut y la contraseña del usuario
		const rut = req.body.rut;
		const contrasena = req.body.contrasena;
        
		// Buscar el usuario en la base de datos
		const usuario = await Usuario.findOne({ rut: rut });
        
        
		// Si el usuario no existe, devolver un error
		if (!usuario) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		// Validar la contraseña
		if (usuario.contrasena !== contrasena) {
			return res.status(401).json({ message: "Credenciales incorrectas" });
		}

		// Generar un token JWT
		const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: 7200 });
        console.log(token);
		// Devolver el token JWT
		res.status(200).json({ token: token });
	} catch (error) {
		// Devolver un error
		res.status(500).json({ message: "Error al iniciar sesión", error: error });
	}
};

export default {
	iniciarSesion,
};