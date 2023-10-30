import { Router } from "express";

import loginController from "../controllers/loginController.js";

const router = Router();

router.post("/login", loginController.iniciarSesion);
router.post("/logout", loginController.cerrarSesion);
export default router;
