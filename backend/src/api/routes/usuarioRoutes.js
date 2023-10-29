import { Router } from "express";
//importar controlador
import usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.get("/", usuarioController.listarUsuarios);
router.post("/", usuarioController.crearUsuario);
router.get("/:id", usuarioController.buscarUsuarioPorID);
router.put("/:id", usuarioController.actualizarUsuarioPorID);
router.delete("/:id", usuarioController.eliminarUsuarioPorID);
router.post("/buscarsolicitud", usuarioController.obtenerSolicitud);
router.post("/modificar", usuarioController.ModificarRol);

export default router;
