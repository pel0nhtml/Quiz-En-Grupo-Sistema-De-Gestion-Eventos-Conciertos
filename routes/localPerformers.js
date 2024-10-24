const express = require('express');
const router = express.Router();
const localPerformerController = require('../controllers/localPerformerController');

// Rutas para LocalPerformers
router.get('/', localPerformerController.obtenerPerformers);
router.post('/', localPerformerController.crearPerformer);
router.put('/:id', localPerformerController.actualizarPerformer);
router.delete('/:id', localPerformerController.eliminarPerformer);

module.exports = router;
