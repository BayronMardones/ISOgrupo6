import { Schema, model } from "mongoose";

// Define un esquema para la agenda
const agendaSchema = new Schema(
	{
		solicitud: { type: Schema.Types.ObjectId, ref: "Solicitud" }, // Referencia a la solicitud
		encargadoVisita: { type: Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al encargado de visita
		aprobada: Boolean,
		feedback: String,
		adjuntos: [String],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Crea un modelo de agenda basado en el esquema
export default model("Agenda", agendaSchema);
