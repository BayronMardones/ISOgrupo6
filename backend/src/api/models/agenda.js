import { Schema, model } from "mongoose";

const fecha = new Date(); // Obtiene la fecha y hora actual
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0
const año = fecha.getFullYear().toString().slice(-2); // Tomar los últimos dos dígitos del año
const horas = fecha.getHours().toString().padStart(2, '0'); // Asegurarse de que siempre tenga 2 dígitos
const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Asegurarse de que siempre tenga 2 dígitos

const fechaFormateada = `${dia}/${mes}/${año}`; 
const horaFormateada = `${horas}:${minutos}`;
// Formato: DD/MM/AA HH:MM

// Define un esquema para la agenda
const agendaSchema = new Schema(
	{
		solicitud: { type: Schema.Types.ObjectId, ref: "Solicitud" }, // Referencia a la solicitud
		encargadoVisita: { type: Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al encargado de visita
		aprobada: Boolean,
		feedback: String,
		adjuntos: [String],
		fecha: { type: String, default: fechaFormateada },
		hora: { type: String, default: horaFormateada }
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Crea un modelo de agenda basado en el esquema
export default model("Agenda", agendaSchema);
