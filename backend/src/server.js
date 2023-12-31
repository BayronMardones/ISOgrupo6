import cors from "cors";
import express, { json } from "express";
//importar variables de entorno

import { setupDB } from "./config/db.config.js";

// importar rutas
import agendaRoutes from "./api/routes/agendaRoutes.js";
import solicitudRoutes from "./api/routes/solicitudRoutes.js";
import usuarioRoutes from "./api/routes/usuarioRoutes.js";
import loginRoutes from "./api/routes/loginRoutes.js";
import feedbackRoutes from "./api/routes/feedbackRoutes.js";

//middleware
import checkUserRole from "./api/middlewares/autorizacion.js";
import filesRoutes from "./api/routes/fileRoutes.js";

const app = express();
const port = process.env.PORT;

//middleware
app.use(json());

//cors
app.use(cors());

//middleware para verificar roles admin, encargado, oficinista, vecino en las rutas
app.use("/api/agenda", checkUserRole(["admin", "encargado", "oficinista"]), agendaRoutes);
app.use("/api/solicitud", solicitudRoutes);
app.use("/api/usuario", checkUserRole(["admin", "encargado", "oficinista"]), usuarioRoutes);
app.use("/api/login" , loginRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/", filesRoutes);



app.get("/", (req, res) => {
	res.send("Pagina en contruccion");
});

app.listen(port, () => {
	console.log(`Api en la url http://localhost:${port}`);
	setupDB();
});
