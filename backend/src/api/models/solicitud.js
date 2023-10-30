import { Schema, model} from "mongoose";
// Define un esquema para las solicitudes
const solicitudSchema = new Schema(
	{
		solicitante: { type: Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al usuario solicitante
		detalles: String,
		estado: {type: String, enum: ["aprobado", "rechazado", "pendiente"], default: "pendiente"},
		archivosAdjuntos: [String],
		feedback: [
			{
				comentarios: String,
				observaciones: String,
				archivosAdjuntos: [String],
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Crea un modelo de solicitud basado en el esquema
export default model("Solicitud", solicitudSchema);
