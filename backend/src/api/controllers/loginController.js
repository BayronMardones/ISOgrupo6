"use strict";
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
       
		// Devolver el token JWT
		res.status(200).json({ token: token });
	} catch (error) {
		// Devolver un error
		res.status(500).json({ message: "Error al iniciar sesión", error: error });
	}
};



const CerrarSesion = async (req, res) => {


  // Obtener el token JWT del encabezado Authorization
  const token = req.headers.authorization;

  // Si el token es nulo, devolver un error
  if (!token) {
    return res.status(400).json({ message: "No hay token" });
  }
  // Borrar el token JWT del encabezado Authorization
  res.clearCookie("jwt", { httpOnly: true });

  // Devolver una respuesta de éxito
  return res.status(200).json({ message: "Sesión cerrada correctamente" });
};

export default {
	iniciarSesion,
	CerrarSesion,
};

//necesito un modulo que permita a un usuario ver su solicitud según su rut

