const { EventHistory, Attendees, LocalEvent, LocalTicket } = require('../models');

const obtenerHistorial = async (req, res) => {
  try {
    const historial = await EventHistory.findAll({
      include: ['attendee', 'event', 'ticket'],
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearHistorial = async (req, res) => {
  try {
    const { attended_date, id_attendee, id_event, id_ticket } = req.body;

    // Validaciones para tontos
    if (!attended_date || isNaN(Date.parse(attended_date))) {
      return res.status(400).json({ error: 'La fecha de asistencia (attended_date) es obligatoria y debe tener un formato válido.' });
    }
    if (!id_attendee || isNaN(id_attendee)) {
      return res.status(400).json({ error: 'El ID del asistente (id_attendee) es obligatorio y debe ser un número válido.' });
    }
    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento (id_event) es obligatorio y debe ser un número válido.' });
    }
    if (!id_ticket || isNaN(id_ticket)) {
      return res.status(400).json({ error: 'El ID del ticket (id_ticket) es obligatorio y debe ser un número válido.' });
    }

    const nuevoHistorial = await EventHistory.create({ attended_date, id_attendee, id_event, id_ticket });
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { attended_date, id_attendee, id_event, id_ticket } = req.body;

    // Validaciones para tontos
    if (!attended_date || isNaN(Date.parse(attended_date))) {
      return res.status(400).json({ error: 'La fecha de asistencia (attended_date) es obligatoria y debe tener un formato válido.' });
    }
    if (!id_attendee || isNaN(id_attendee)) {
      return res.status(400).json({ error: 'El ID del asistente (id_attendee) es obligatorio y debe ser un número válido.' });
    }
    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento (id_event) es obligatorio y debe ser un número válido.' });
    }
    if (!id_ticket || isNaN(id_ticket)) {
      return res.status(400).json({ error: 'El ID del ticket (id_ticket) es obligatorio y debe ser un número válido.' });
    }

    const historial = await EventHistory.findByPk(id);
    if (!historial) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    historial.attended_date = attended_date;
    historial.id_attendee = id_attendee;
    historial.id_event = id_event;
    historial.id_ticket = id_ticket;
    await historial.save();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await EventHistory.findByPk(id);
    if (!historial) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }
    await historial.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerHistorial,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial,
};
