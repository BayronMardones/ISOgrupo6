import { Router } from "express";

import solicitudController from "../controllers/solicitudController.js";

const router = Router();

router.get("/", solicitudController.listarSolicitudes);
router.post("/", solicitudController.crearSolicitud);
router.get("/:id", solicitudController.buscarSolicitudPorId);
router.put("/:id", solicitudController.actualizarSolicitudPorId);
router.delete("/:id", solicitudController.eliminarSolicitudPorId);

export default router;
