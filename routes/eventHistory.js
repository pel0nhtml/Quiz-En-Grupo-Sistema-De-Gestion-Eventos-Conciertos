const express = require('express');
const router = express.Router();
const eventHistoryController = require('../controllers/eventHistoryController');

// Rutas para EventHistory
router.get('/', eventHistoryController.obtenerHistorial);
router.post('/', eventHistoryController.crearHistorial);
router.put('/:id', eventHistoryController.actualizarHistorial);
router.delete('/:id', eventHistoryController.eliminarHistorial);

module.exports = router;
