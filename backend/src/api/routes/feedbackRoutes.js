import { Router } from "express";
import checkUserRole from "../middlewares/autorizacion.js";

import feedbackController from "../controllers/feedbackController.js";

import fileController  from "../controllers/fileController.js";
import upload  from "../middlewares/handleMulter.js";

import fileSize from "../middlewares/fileSize.js";

const router = Router();

// Rutas para el encargado
router.get('/:solicitud', checkUserRole(['encargado']), feedbackController.getFeedback);
router.post('/:solicitud', checkUserRole(['encargado']), feedbackController.createFeedback);
router.put('/:solicitud/:feedbackId', checkUserRole(['encargado']), feedbackController.updateFeedback);
router.delete('/:solicitud/:feedbackId', checkUserRole(['encargado']), feedbackController.deleteFeedback);

//archivos de feedback solo pueden ser subidos por el encargado
router.post("/:solicitud/:archivo", checkUserRole(["encargado"]), upload.array('archivos'),fileSize, fileController.uploadFeedbackFile);
router.get('/files/:solicitud', checkUserRole(["admin","encargado"]),fileController.getFeedbackFiles);
router.get('/file/download/:solicitud/:feedbackId/:fileId', checkUserRole(["admin", "oficinista", "encargado"]),fileController.getSpecificFeedbackFile);
router.delete('/file/delete/:solicitud/:feedbackId/:fileId', checkUserRole(["encargado"]),fileController.deleteFeedbackFile);



export default router;
