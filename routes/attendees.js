const express = require('express');
const router = express.Router();
const attendeesController = require('../controllers/attendeesController');

// Rutas para Attendees
router.get('/', attendeesController.obtenerAsistentes);
router.post('/', attendeesController.crearAsistente);
router.put('/:id', attendeesController.actualizarAsistente);
router.delete('/:id', attendeesController.eliminarAsistente);

module.exports = router;
