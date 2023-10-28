import { Router } from "express";

import agendaController from "../controllers/agendaController.js";

const router = Router();

router.get("/", agendaController.listarEntradasAgenda);
router.post("/", agendaController.crearEntradaAgenda);
router.get("/:id", agendaController.buscarEntradaAgendaPorId);
router.put("/:id", agendaController.actualizarEntradaAgendaPorId);
router.delete("/:id", agendaController.eliminarEntradaAgendaPorId);

export default router;
