const express = require('express');
const router = express.Router();
const localEventController = require('../controllers/localEventController');

// Rutas para LocalEvents
router.get('/', localEventController.obtenerEventos);
router.post('/', localEventController.crearEvento);
router.put('/:id', localEventController.actualizarEvento);
router.delete('/:id', localEventController.eliminarEvento);

module.exports = router;
