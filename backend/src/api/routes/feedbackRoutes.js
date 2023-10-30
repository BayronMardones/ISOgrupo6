import { Router } from "express";
import feedbackController from "../controllers/feedbackController.js";
import checkUserRole from "../middlewares/autorizacion.js";

const router = Router();

// Rutas para el oficinista 
router.get('/:solicitud', checkUserRole(['encargado']), feedbackController.getFeedback);
router.post('/:solicitud', checkUserRole(['encargado']), feedbackController.createFeedback);
router.put('/:solicitud/:feedbackId', checkUserRole(['encargado']), feedbackController.updateFeedback);
router.delete('/:solicitud/:feedbackId', checkUserRole(['encargado']), feedbackController.deleteFeedback);


export default router;
