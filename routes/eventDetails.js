const express = require('express');
const router = express.Router();
const eventDetailController = require('../controllers/eventDetailController');

// Rutas para EventDetails
router.get('/', eventDetailController.obtenerDetalles);
router.post('/', eventDetailController.crearDetalle);
router.put('/:id', eventDetailController.actualizarDetalle);
router.delete('/:id', eventDetailController.eliminarDetalle);

module.exports = router;