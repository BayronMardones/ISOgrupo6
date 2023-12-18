import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";
import checkUserRole from "../middlewares/autorizacion.js";

const router = Router();

router.get("/", checkUserRole(["admin", "oficinista"]), usuarioController.listarUsuarios);
router.post("/", checkUserRole(["admin", "oficinista"]), usuarioController.crearUsuario);
router.get("/:id", checkUserRole(["admin", "oficinista"]), usuarioController.buscarUsuarioPorID);
router.put("/:id", checkUserRole(["admin", "oficinista"]), usuarioController.actualizarUsuarioPorID);
router.delete("/:id", checkUserRole(["admin", "oficinista"]), usuarioController.eliminarUsuarioPorID);
router.post("/buscarsolicitud", checkUserRole(["solicitante"]),usuarioController.obtenerSolicitud);
router.post("/modificar",checkUserRole(["admin"]), usuarioController.ModificarRol);

export default router;
