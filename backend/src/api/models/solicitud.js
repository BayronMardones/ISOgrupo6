import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
    comentarios: String,
    archivosAdjuntosFeedback: [String],
}, {
    timestamps: true,
    versionKey: false,
});

const solicitudSchema = new Schema({
    solicitante: { type: Schema.Types.ObjectId, ref: "Usuario" },
    detalles: String,
    estado: { type: String, enum: ["aprobado", "rechazado", "pendiente"], default: "pendiente" },
    archivosAdjuntos: [String],
    direccion: {
        zona: String,
        calle: String,
        numero: String,
    },
    feedback: [feedbackSchema], // Utiliza el esquema de feedback
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Solicitud", solicitudSchema);
