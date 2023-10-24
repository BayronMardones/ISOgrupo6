const Agenda = require('../models/agenda');

// Crear una nueva entrada en la agenda
const crearEntradaAgenda = (solicitud, encargadoVisita, fecha, aprobada, feedback, adjuntos, callback) => {
  const nuevaEntradaAgenda = new Agenda({
    solicitud,
    encargadoVisita,
    fecha,
    aprobada,
    feedback,
    adjuntos,
  });

  nuevaEntradaAgenda.save((err, entrada) => {
    if (err) {
      console.error('Error al crear una entrada en la agenda:', err);
    } else {
      console.log('Entrada de agenda creada:', entrada);
      callback(null, entrada);
    }
  });
};

// Buscar una entrada en la agenda por ID
const buscarEntradaAgendaPorId = (entradaId, callback) => {
  Agenda.findById(entradaId, (err, entrada) => {
    if (err) {
      console.error('Error al buscar una entrada en la agenda:', err);
      callback(err, null);
    } else {
      console.log('Entrada de agenda encontrada:', entrada);
      callback(null, entrada);
    }
  });
};

// Actualizar una entrada en la agenda por ID
const actualizarEntradaAgendaPorId = (entradaId, actualizaciones, callback) => {
  Agenda.findByIdAndUpdate(entradaId, actualizaciones, { new: true }, (err, entrada) => {
    if (err) {
      console.error('Error al actualizar una entrada en la agenda:', err);
      callback(err, null);
    } else {
      console.log('Entrada de agenda actualizada:', entrada);
      callback(null, entrada);
    }
  });
};

// Eliminar una entrada en la agenda por ID
const eliminarEntradaAgendaPorId = (entradaId, callback) => {
  Agenda.findByIdAndRemove(entradaId, (err, entrada) => {
    if (err) {
      console.error('Error al eliminar una entrada en la agenda:', err);
      callback(err, null);
    } else {
      console.log('Entrada de agenda eliminada:', entrada);
      callback(null, entrada);
    }
  });
};

// Listar todas las entradas en la agenda
const listarEntradasAgenda = (callback) => {
  Agenda.find({}, (err, entradas) => {
    if (err) {
      console.error('Error al buscar entradas en la agenda:', err);
      callback(err, null);
    } else {
      console.log('Entradas de agenda encontradas:', entradas);
      callback(null, entradas);
    }
  });
};

// Exporta las funciones CRUD de la agenda
module.exports = {
  crearEntradaAgenda,
  buscarEntradaAgendaPorId,
  actualizarEntradaAgendaPorId,
  eliminarEntradaAgendaPorId,
  listarEntradasAgenda,
};
