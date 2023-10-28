import { Router } from "express";

import loginController from "../controllers/loginController.js";

const router = Router();

router.post("/iniciar-sesion", loginController.iniciarSesion);

export default router;