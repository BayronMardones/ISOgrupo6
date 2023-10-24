const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); // Asegúrate de importar los controladores
const solicitudController = require('../controllers/solicitudController');
const agendaController = require('../controllers/agendaController');

// Rutas para el CRUD de Usuarios
router.post('/usuarios', usuarioController.crearUsuario);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorID);
router.put('/usuarios/:id', usuarioController.actualizarUsuarioPorID);
router.delete('/usuarios/:id', usuarioController.eliminarUsuarioPorID);


// Rutas para el CRUD de Solicitudes
router.post('/solicitudes', solicitudController.crearSolicitud);
router.get('/solicitudes/:id', solicitudController.buscarSolicitudPorID);
router.put('/solicitudes/:id', solicitudController.actualizarSolicitudPorID);
router.delete('/solicitudes/:id', solicitudController.eliminarSolicitudPorID);


// Rutas para el CRUD de Agenda
router.post('/agenda', agendaController.crearEntradaAgenda);
router.get('/agenda/:id', agendaController.buscarEntradaAgendaPorId);
router.put('/agenda/:id', agendaController.actualizarEntradaAgendaPorId);
router.delete('/agenda/:id', agendaController.eliminarEntradaAgendaPorId);
//router.get('/agenda', agendaController.listarEntradasAgenda);

module.exports = router;
