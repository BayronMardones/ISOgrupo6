import { Schema, model } from "mongoose";

// Define un esquema para los usuarios
const usuarioSchema = new Schema(
	{
		nombre: String,
		rut: String,
		apellido: String,
		email: String,
		contrasena: String,
		rol: {type: String, enum: ["admin", "encargado", "oficinista", "solicitante"], default: "solicitante"},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Crea un modelo de usuario basado en el esquema
export default model("Usuario", usuarioSchema);

