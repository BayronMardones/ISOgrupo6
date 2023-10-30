import { Schema, model } from "mongoose";
const fileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    requiered: true,
  },
  mimeType: {
    type: String,
    requiere: true,
  },
  idSolicitud: {
    type: String,
    requiere: true,
  },
});

export default model("file", fileSchema);