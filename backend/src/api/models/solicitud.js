import { Schema, model } from "mongoose";

// Define un esquema para las solicitudes
const solicitudSchema = new Schema(
	{
		solicitante: { type: Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al usuario solicitante
		detalles: String, //direccion
		estado: String,
		estado: {type: String, enum: ["activo", "inactivo", "pendiente"], default: "pendiente"},
		archivosAdjuntos: [String],
        feedback: [
			{
                comentarios: String,
                observaciones: String,
                archivosAdjuntosFeedback: [String],
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
