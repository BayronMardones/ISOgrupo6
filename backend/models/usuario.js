const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define un esquema para los usuarios
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  contrasena: String,
  rol: String,
});

// Crea un modelo de usuario basado en el esquema
const Usuario = mongoose.model("Usuario", usuarioSchema);
