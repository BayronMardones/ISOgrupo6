import express, { json } from "express";

//importar variables de entorno

import { setupDB } from "./config/db.config.js";

// importar rutas
import agendaRoutes from "./api/routes/agendaRoutes.js";
import solicitudRoutes from "./api/routes/solicitudRoutes.js";
import usuarioRoutes from "./api/routes/usuarioRoutes.js";
import loginRoutes from "./api/routes/loginRoutes.js";
import feedbackRoutes from "./api/routes/feedbackRoutes.js";


const app = express();
const port = 3000;

//middleware
app.use(json());

//rutas
app.use("/api/agenda", agendaRoutes);
app.use("/api/solicitud", solicitudRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/feedback", feedbackRoutes);


app.get("/", (req, res) => {
	res.send("Hola Mundo!!");
});

app.listen(port, () => {
	console.log(`Api en la url http://localhost:${port}`);
	setupDB();
});
