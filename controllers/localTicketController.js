const { LocalTicket, LocalEvent, Attendees, EventHistory } = require('../models');

const obtenerTickets = async (req, res) => {
  try {
    const tickets = await LocalTicket.findAll({
      include: ['event', 'attendees', 'eventHistories'],
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearTicket = async (req, res) => {
  try {
    const { ticket_type, price, availability, id_event } = req.body;

    // Validaciones
    if (!ticket_type || !['General', 'VIP'].includes(ticket_type)) {
      return res.status(400).json({ error: 'El tipo de ticket es obligatorio y debe ser "General" o "VIP".' });
    }
    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'El precio es obligatorio y debe ser un número mayor a 0.' });
    }
    if (!availability || isNaN(availability) || availability < 0) {
      return res.status(400).json({ error: 'La disponibilidad debe ser un número válido mayor o igual a 0.' });
    }
    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento es obligatorio y debe ser un número válido.' });
    }

    const nuevoTicket = await LocalTicket.create({ ticket_type, price, availability, id_event });
    res.status(201).json(nuevoTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { ticket_type, price, availability, id_event } = req.body;

    // Validaciones
    if (!ticket_type || !['General', 'VIP'].includes(ticket_type)) {
      return res.status(400).json({ error: 'El tipo de ticket es obligatorio y debe ser "General" o "VIP".' });
    }
    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'El precio es obligatorio y debe ser un número mayor a 0.' });
    }
    if (!availability || isNaN(availability) || availability < 0) {
      return res.status(400).json({ error: 'La disponibilidad debe ser un número válido mayor o igual a 0.' });
    }
    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento es obligatorio y debe ser un número válido.' });
    }

    const ticket = await LocalTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }

    ticket.ticket_type = ticket_type;
    ticket.price = price;
    ticket.availability = availability;
    ticket.id_event = id_event;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await LocalTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    await ticket.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerTickets,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
};
