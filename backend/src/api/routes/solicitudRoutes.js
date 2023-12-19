import { Router } from "express";
import checkUserRole from "../middlewares/autorizacion.js";
import solicitudController from "../controllers/solicitudController.js";

const router = Router();

router.get("/listar", checkUserRole(["admin", "oficinista", "encargado"]), solicitudController.listarSolicitudes);
router.post("/crearA",checkUserRole(["admin", "oficinista", "solicitante"]),solicitudController.crearSolicitud);
router.get("/buscar/:id", checkUserRole(["admin", "oficinista", "solicitante", "encargado"]),solicitudController.buscarSolicitudPorId);
router.put("/actualizar/:id",checkUserRole(["admin", "oficinista", "encargado"]), solicitudController.actualizarSolicitudPorId);

router.patch("/modificarEstado/:id",checkUserRole(["admin", "encargado"]), solicitudController.modificarEstadoPorId);

router.delete("/eliminar/:id", checkUserRole(["admin", "oficinista"]),solicitudController.eliminarSolicitudPorId);

export default router;
