import { application } from "express";
import Solicitud from "../models/solicitud.js";
import fileUpload from "../models/file.js";
import fs from "fs";
import solicitud from "../models/solicitud.js";


const uploadfile = async (req, res) => {
  const { files } = req;
  const {id} = req.params;

  const newFiles = await Promise.all(files.map(async (file) => {
    const newFile = new fileUpload({
      url: file.path,
      name: file.originalname,
      mimeType: file.mimetype,
      idSolicitud: id,

    })
    await newFile.save()
    return newFile
  }))
  return res.status(201).send(newFiles)
}


const getFiles = (req, res) => {
  fileModel.find({}, (err, file) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener los archivos" })
    }
    return res.status(200).send(file)
  })
}

const getSpecificFile = (req, res) => {
  const { id } = req.params
  fileModel.findById(id, (err, file) => {
    if (err) {
      return res.status(400).send({ message: "Error al obtener el archivo" })
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no existe" })
    }
    return res.download('./' + file.url)

  })
}

const deleteFile = async (req, res) => {
  const { id } = req.params;

  // Buscar el archivo por ID.
  const file = await fileUpload.findById(id);

  // Si el archivo no existe, devolver una respuesta de error.
  if (!file) {
    return res.status(404).send({ message: "Archivo no encontrado." });
  }

  console.log(file);

  // Eliminar el archivo.
  await fileUpload.findByIdAndRemove(id);

  // Eliminar el archivo del sistema de archivos.
  fs.unlink(file.url, (error) => {
    if (error) {
      // Registrar el error, pero no devolver una respuesta de falla.
      console.log(error);
    }
  });
  // Enviar una respuesta de éxito.
  return res.status(200).send({ message: "Archivo eliminado correctamente." });
};

export default {
  uploadfile,
  getFiles,
  getSpecificFile,
  deleteFile,
};