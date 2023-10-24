const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define un esquema para las solicitudes
const solicitudSchema = new mongoose.Schema({
  solicitante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, // Referencia al usuario solicitante
  detalles: String,
  estado: String,
  archivosAdjuntos: [String],
  fechaCreacion: { type: Date, default: Date.now },
});

// Crea un modelo de solicitud basado en el esquema
const Solicitud = mongoose.model("Solicitud", solicitudSchema);
