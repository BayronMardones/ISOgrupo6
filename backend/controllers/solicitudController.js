// Importa el modelo de solicitud
const Solicitud = require("../models/solicitud");

// Función para crear una nueva solicitud
const crearSolicitud = (solicitanteId, detalles, estado, archivosAdjuntos) => {
  const nuevaSolicitud = new Solicitud({
    solicitante, // ID del usuario solicitante
    detalles,
    estado,
    archivosAdjuntos,
  });

  nuevaSolicitud.save((err, solicitud) => {
    if (err) {
      console.error("Error al crear una solicitud:", err);
    } else {
      console.log("Solicitud creada:", solicitud);
    }
  });
};

// Función para buscar una solicitud por su ID
const buscarSolicitudPorID = (idDeSolicitud) => {
  Solicitud.findById(idDeSolicitud, (err, solicitud) => {
    if (err) {
      console.error("Error al buscar una solicitud:", err);
    } else {
      console.log("Solicitud encontrada:", solicitud);
    }
  });
};

// Función para actualizar una solicitud por su ID
const actualizarSolicitudPorID = (
  idDeSolicitud,
  nuevosDetalles,
  nuevoEstado
) => {
  Solicitud.findByIdAndUpdate(
    idDeSolicitud,
    { detalles: nuevosDetalles, estado: nuevoEstado },
    (err, solicitud) => {
      if (err) {
        console.error("Error al actualizar una solicitud:", err);
      } else {
        console.log("Solicitud actualizada:", solicitud);
      }
    }
  );
};

// Función para eliminar una solicitud por su ID
const eliminarSolicitudPorID = (idDeSolicitud) => {
  Solicitud.findByIdAndRemove(idDeSolicitud, (err, solicitud) => {
    if (err) {
      console.error("Error al eliminar una solicitud:", err);
    } else {
      console.log("Solicitud eliminada:", solicitud);
    }
  });
};

module.exports = {
  crearSolicitud,
  buscarSolicitudPorID,
  actualizarSolicitudPorID,
  eliminarSolicitudPorID,
};
