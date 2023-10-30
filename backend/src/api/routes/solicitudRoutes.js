import { Router } from "express";

import solicitudController from "../controllers/solicitudController.js";

const router = Router();

router.get("/listar", solicitudController.listarSolicitudes);
router.post("/crear", solicitudController.crearSolicitud);
router.get("/buscar/:id", solicitudController.buscarSolicitudPorId);
router.put("/actualizar/:id", solicitudController.actualizarSolicitudPorId);
router.delete("/eliminar/:id", solicitudController.eliminarSolicitudPorId);

export default router;
