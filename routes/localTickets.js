const express = require('express');
const router = express.Router();
const localTicketController = require('../controllers/localTicketController');

// Rutas para LocalTickets
router.get('/', localTicketController.obtenerTickets);
router.post('/', localTicketController.crearTicket);
router.put('/:id', localTicketController.actualizarTicket);
router.delete('/:id', localTicketController.eliminarTicket);

module.exports = router;
