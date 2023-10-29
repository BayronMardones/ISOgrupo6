import { Router } from "express";
import feedbackController from "../controllers/feedbackController.js";

const router = Router();

// Define tus rutas y asigna las funciones del controlador a cada ruta
router.post('/:solicitudId', feedbackController.createFeedback);
router.get('/:solicitudId', feedbackController.getFeedback);
router.put('/:solicitudId/:feedbackId', feedbackController.updateFeedback);
router.delete('/:solicitudId/:feedbackId', feedbackController.deleteFeedback);

export default router;
