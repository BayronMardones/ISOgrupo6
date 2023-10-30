import { Router } from "express";
import checkUserRole from "../middlewares/autorizacion.js";

import agendaController from "../controllers/agendaController.js";

const router = Router();

// rutas con middleware para verificar roles
router.get("/", checkUserRole(["admin", "encargado"]), agendaController.listarEntradasAgenda);
router.post("/", checkUserRole(["admin"]), agendaController.crearEntradaAgenda);
router.get("/:id", checkUserRole(["admin", "encargado"]), agendaController.buscarEntradaAgendaPorId);
router.put("/:id", checkUserRole(["admin"]), agendaController.actualizarEntradaAgendaPorId);
router.delete("/:id", checkUserRole(["admin"]), agendaController.eliminarEntradaAgendaPorId);


export default router;
