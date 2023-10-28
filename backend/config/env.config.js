import { fileURLToPath } from "node:url";
import path from "node:path";
import dotenv from "dotenv";

// Convierte la URL del archivo a una ruta de archivo
const __filename = fileURLToPath(import.meta.url);

// Obtiene la ruta del archivo .env
const envFilePath = path.resolve(__filename);

// Carga las variables de entorno del archivo .env
dotenv.config({ envFilePath });

// Retorna un objeto con las variables de entorno
// o Tambien retornar las variables de entorno directamente

export const { DB_URL } = process.env;
