//const fs = require('fs');
import Solicitud from "../models/solicitud.js";
//import Usuario from "../models/usuario.js";
import multer from "multer";
import fs from "fs";

// Configurar Multer para almacenar archivos en una ubicación temporal
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Listar todas las solicitudes
const listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();

    if (solicitudes.length === 0) {
      return res.status(404).json({ message: "No se encontraron solicitudes" });
    }

    return res.status(200).send(solicitudes.map(solicitud => {
      return {
        ...solicitud,
        archivosAdjuntos: solicitud.archivosAdjuntos.map(archivo => {
          return {
            nombre: archivo.nombre,
            archivo: `/data/${archivo.archivo}`,
          };
        }),
      };
    }));
  } catch (err) {
    console.error("Error al listar las solicitudes:", err);
    return res
      .status(500)
      .json({ message: "Error al listar las solicitudes", error: err.message });
  }
};

// Función para crear una nueva solicitud
const crearSolicitud = upload.array('archivosAdjuntos', 1, async (req, res) => {
	try {
	  //  const { solicitante, detalles, estado } = req.body;
  
	  // Obtén los nombres de los archivos cargados
	  const archivosAdjuntos = req.files.map(file => file.filename);
  
	  // Leer archivos adjuntos y almacenarlos como objetos binarios
	  const archivosAdjuntosBinarios = await Promise.all(
		archivosAdjuntos.map(file => fs.readFileSync(file.path))
	  );
  
	  // Crear una nueva solicitud
	  const nuevaSolicitud = new Solicitud({
		  //solicitante,
		  //detalles,
		  //estado,
		  archivosAdjuntos: archivosAdjuntosBinarios,
	  });
  
	  // Guardar la solicitud en la base de datos
	  const solicitudGuardada = await nuevaSolicitud.save();
  
	  res.status(201).json(solicitudGuardada);
	} catch (err) {
	  console.error("Error al crear una solicitud:", err);
	  res
		.status(500)
		.json({ message: "Error al crear una solicitud", error: err.message });
	}
});
  
// Función para actualizar una solicitud por su ID
const actualizarSolicitudPorId = async (req, res) => {
  try {
    const solicitudId = req.params.id;
    const updatedData = req.body;

    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      solicitudId,
      updatedData,
      {
        new: true,
      }
    );

    if (!solicitudActualizada) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    return res.status(200).json(solicitudActualizada);
  } catch (err) {
    console.error("Error al actualizar una solicitud por ID:", err);
    res
      .status(500)
      .json({
        message: "Error al actualizar una solicitud por ID",
        error: err.message,
      });
  }
}

// Función para buscar una solicitud por su ID
const buscarSolicitudPorId = async (req, res) => {
  try {
    const solicitudId = req.params.id;

    const solicitudEncontrada = await Solicitud.findById(solicitudId);

    if (!solicitudEncontrada) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    res.status(200).json(solicitudEncontrada);
  } catch (err) {
    console.error("Error al buscar una solicitud por ID:", err);
    res
      .status(500)
      .json({
        message: "Error al buscar una solicitud por ID",
        error: err.message,
      });
  }
};

// Función para eliminar una solicitud por su ID
const eliminarSolicitudPorId = async (req, res) => {
  try {
    const solicitudId = req.params.id;

    const solicitudEncontrada = await Solicitud.findByIdAndDelete(solicitudId);

    if (!solicitudEncontrada) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    res.status(200).json({ message: "Solicitud eliminada" });
  } catch (err) {
    console.error("Error al eliminar una solicitud por ID:", err);
    res
      .status(500)
      .json({
        message: "Error al eliminar una solicitud por ID",
        error: err.message,
      });
  }
};

export default {
  listarSolicitudes,
  crearSolicitud,
  buscarSolicitudPorId,
  actualizarSolicitudPorId,
  eliminarSolicitudPorId,
};
