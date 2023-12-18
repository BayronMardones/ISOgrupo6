import { Router } from "express";

import checkUserRole from "../middlewares/autorizacion.js";
import fileController from "../controllers/fileController.js";
import upload from "../middlewares/handleMulter.js";
import fileSize from "../middlewares/fileSize.js";


const routers = Router();
routers.post("/file/:id/:archivo", checkUserRole(["encargado", "oficinista", "solicitante"]),upload.array('archivos'), fileSize, fileController.uploadfile);
routers.get('/files', checkUserRole(["admin", "oficinista","encargado"]),fileController.getFiles);
routers.get('/file/download/:id', checkUserRole(["admin", "oficinista", "encargado", "solicitante"]),fileController.getSpecificFile);
routers.delete('/file/deletes/:id', checkUserRole(["admin", "oficinista"]),fileController.deleteFile);


export default routers;
