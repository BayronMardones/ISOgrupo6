import { Schema, model } from "mongoose";
const fileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  idSolicitud: {
     type: String,
     required: true,
  },
});

export default model("file", fileSchema);