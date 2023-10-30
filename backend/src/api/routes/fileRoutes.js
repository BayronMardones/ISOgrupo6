import { Router } from "express";
import fileController  from "../controllers/fileController.js";
import upload  from "../middlewares/handleMulter.js";
import fileSize  from "../middlewares/fileSize.js";

const routers = Router();
routers.post("/file/:archivo", upload.array('archivos'), fileSize, fileController.uploadfile);
routers.get('/files', fileController.getFiles);
routers.get('/file/download/:id', fileController.getSpecificFile);
routers.delete('/file/delete/:idacta', fileController.deleteFiles);
routers.delete('/file/deletes/:id', fileController.deleteFilesS);

export default routers;