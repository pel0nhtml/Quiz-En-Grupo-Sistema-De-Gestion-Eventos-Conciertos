const express = require('express');
const router = express.Router();
const localOrganizerController = require('../controllers/localOrganizerController');

// Rutas para LocalOrganizers
router.get('/', localOrganizerController.obtenerOrganizadores);
router.post('/', localOrganizerController.crearOrganizador);
router.put('/:id', localOrganizerController.actualizarOrganizador);
router.delete('/:id', localOrganizerController.eliminarOrganizador);

module.exports = router;
