// Importa el módulo de jsonwebtoken para verificar tokens
import jwt from "jsonwebtoken";
import usuario from "../models/usuario.js";

// Middleware para verificar roles de usuario
const checkUserRole = (roles) => {
	return (req, res, next) => {
		// Obtener el token JWT del encabezado Authorization
		const token = req.headers.authorization;
		// Si el token es nulo, devolver un error
		if (!token) {
			return res.status(400).json({ message: "No hay token" });
		}

		// Verificar el token JWT
		jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
			// Si hay un error, devolver un error
			if (error) {
				return res
					.status(500)
					.json({ message: "Error al verificar el token", error: error });
			}

			// buscar el usuario en la base de datos con el id decoded.id
			const usuarioEncontrado = await usuario.findById(decoded.id);

			//Obtener el rol del usuario desde el token
			const userRole = usuarioEncontrado.rol;

			//Si el rol del usuario no está en el arreglo de roles permitidos, devolver un error
			if (!roles.includes(userRole)) {
				return res.status(401).json({ message: "No autorizado" });
			}

			// Si el rol del usuario está en el arreglo de roles permitidos, llamar a la siguiente función
			next();
		});
	};
};

export default checkUserRole;
