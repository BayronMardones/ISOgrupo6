import express, { json } from "express";
import enviarCorreo from './api/controllers/mailerController.js';
//importar variables de entorno

import { setupDB } from "./config/db.config.js";

// importar rutas
import agendaRoutes from "./api/routes/agendaRoutes.js";
import solicitudRoutes from "./api/routes/solicitudRoutes.js";
import usuarioRoutes from "./api/routes/usuarioRoutes.js";
import loginRoutes from "./api/routes/loginRoutes.js";
import feedbackRoutes from "./api/routes/feedbackRoutes.js";

//middleware
import checkUserRole from "./api/middleware/autorizacion.js";
import filesRoutes from "./api/routes/fileRoutes.js";

const app = express();
const port = process.env.PORT;

//middleware
app.use(json());

//enviar correo
//enviarCorreo();
//console.log("correo enviado actualizado");

//middleware para verificar roles admin, encargado, oficinista, vecino en las rutas
app.use("/api/agenda", checkUserRole(["admin", "encargado", "oficinista"]), agendaRoutes);
app.use("/api/solicitud", checkUserRole(["admin", "encargado", "oficinista", "solicitante"]), solicitudRoutes);
app.use("/api/usuario", checkUserRole(["admin", "encargado", "oficinista"]), usuarioRoutes);
app.use("/api/login" , loginRoutes);
app.use("/api/feedback", checkUserRole(["admin", "encargado"]), feedbackRoutes);
app.use("/api/", filesRoutes);


app.get("/", (req, res) => {
	res.send("Pagina en contruccion");
});

app.listen(port, () => {
	console.log(`Api en la url http://localhost:${port}`);
	setupDB();
});
