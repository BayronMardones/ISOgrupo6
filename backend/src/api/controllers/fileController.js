import { application } from "express";
import Solicitud from "../models/solicitud.js";
import fileUpload from "../models/file.js";
import fs from "fs";
import solicitud from "../models/solicitud.js";


const uploadfile = async (req, res) => {
  const { files } = req
  const newFiles = await Promise.all(files.map(async (file) => {
    const newFile = new fileUpload({
      url: file.path,
      name: file.originalname,
      mimeType: file.mimetype,
      idSolicitud: req.params.id
    })
    await newFile.save()
    return newFile
  }))
  return res.status(201).send(newFiles)
}

const getFiles = (req, res) => {
  console.log("req.query", req.query.elvis)
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


const deleteFiles = async (req, res) => {
  const { idSolicitud } = req.params
  fileUpload.findOne({idSolicitud}, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error al obtener los archivos" });
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no encontrado 1." })
    }
    fileUpload.findByIdAndDelete(file._id, (error, fmas) => {
      if (error) {
        return res.status(400).send({ message: "Error." })
      }
      if (!fmas) {
        return res.status(404).send({ message: "Archivo no encontrado." })
      }
      fs.unlink(fmas.url, (error) => {
        if(error){
          return res.status(404).send({ message: "Error." })
        }
        if(!fmas){
          return res.status(404).send({ message: "Error" })
        }
        return res.status(200).send({ message: "Archivo Eliminado"})
      })
    });
  });
}

const deleteFilesS = async (req, res) => {
  const { id } = req.params
  fileUpload.findByIdAndDelete(id, (error, file) => {
    if (error) {
      return res.status(400).send({ message: "Error." })
    }
    if (!file) {
      return res.status(404).send({ message: "Archivo no encontrado." })
    }
    fs.unlink(file.url, (error) => {
      if(error){
        return res.status(404).send({ message: "Error." })
      }
      if(!file){
        return res.status(404).send({ message: "Error" })
      }
      return res.status(200).send({ message: "Archivo Eliminado"})
    })
  });
}

export default {
  uploadfile,
  getFiles,
  getSpecificFile,
  deleteFiles,
  deleteFilesS
};  