const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define un esquema para la agenda
const agendaSchema = new mongoose.Schema({
  solicitud: { type: mongoose.Schema.Types.ObjectId, ref: "Solicitud" }, // Referencia a la solicitud
  encargadoVisita: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al encargado de visita
  fecha: Date,
  aprobada: Boolean,
  feedback: String,
  adjuntos: [String],
});

// Crea un modelo de agenda basado en el esquema
const Agenda = mongoose.model("Agenda", agendaSchema);
