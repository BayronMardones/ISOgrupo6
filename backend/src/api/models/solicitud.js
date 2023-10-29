import { Schema, model } from "mongoose";

// Define un esquema para las solicitudes
const solicitudSchema = new Schema(
	{
		solicitante: { type: Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al usuario solicitante
		detalles: String,
		estado: String,
		archivosAdjuntos: [String],
		rutSolicitante:{ type: String, ref: "Usuario" },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Crea un modelo de solicitud basado en el esquema
export default model("Solicitud", solicitudSchema);
