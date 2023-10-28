import { connect } from "mongoose";

// La configuracion de las variables de entorno se encuentra en el archivo .env
// y se cargan en el archivo env.config.js
import { DB_URL } from "./env.config.js";

// opciones de configuracion de la base de datos
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
// Funcion que crea la conexion a la base de datos
export async function setupDB() {
	try {
		await connect(DB_URL, options);
		console.log("=> Conexion a la base de datos exitosa");
	} catch (error) {
		console.error(
			"=> Ocurrio un error al intentar conectar a la base de datos"
		);
		console.error(error);
	}
}
