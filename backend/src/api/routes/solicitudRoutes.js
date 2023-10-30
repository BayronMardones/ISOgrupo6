import { Router } from "express";
import checkUserRole from "../middlewares/autorizacion.js";

import solicitudController from "../controllers/solicitudController.js";

const router = Router();

router.get("/listar", checkUserRole(["admin", "encargado", "oficinista"]), solicitudController.listarSolicitudes);
router.post("/crear", checkUserRole(["oficinista", "solicitante"]), solicitudController.crearSolicitud);
router.get("/buscar/:id", checkUserRole(["admin", "encargado", "oficinista", "solicitante"]), solicitudController.buscarSolicitudPorId);
router.put("/actualizar/:id", checkUserRole(["admin", "oficinista", "solicitante"]), solicitudController.actualizarSolicitudPorId);
router.delete("/eliminar/:id", checkUserRole(["admin"]), solicitudController.eliminarSolicitudPorId);

router.post("/actualizar/:id", checkUserRole(["admin", "encargado"]), solicitudController.modificarEstadoPorId); //modificar estado de la solicitud


export default router;
