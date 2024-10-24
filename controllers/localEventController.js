const { LocalEvent, LocalOrganizer, LocalPerformer, EventHistory, LocalTicket } = require('../models');

const obtenerEventos = async (req, res) => {
  try {
    const eventos = await LocalEvent.findAll({
      include: ['organizer', 'performers', 'tickets', 'eventHistories'],
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearEvento = async (req, res) => {
  try {
    const { event_name, event_date, location, description, id_organizer } = req.body;

    // Validaciones
    if (!event_name || event_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del evento es obligatorio.' });
    }
    if (!event_date || isNaN(Date.parse(event_date))) {
      return res.status(400).json({ error: 'La fecha del evento es obligatoria y debe tener un formato válido.' });
    }
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'La ubicación del evento es obligatoria.' });
    }
    if (!id_organizer || isNaN(id_organizer)) {
      return res.status(400).json({ error: 'El ID del organizador es obligatorio y debe ser un número válido.' });
    }

    const nuevoEvento = await LocalEvent.create({ event_name, event_date, location, description, id_organizer });
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { event_name, event_date, location, description, id_organizer } = req.body;

    // Validaciones
    if (!event_name || event_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del evento es obligatorio.' });
    }
    if (!event_date || isNaN(Date.parse(event_date))) {
      return res.status(400).json({ error: 'La fecha del evento es obligatoria y debe tener un formato válido.' });
    }
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'La ubicación del evento es obligatoria.' });
    }
    if (!id_organizer || isNaN(id_organizer)) {
      return res.status(400).json({ error: 'El ID del organizador es obligatorio y debe ser un número válido.' });
    }

    const evento = await LocalEvent.findByPk(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    evento.event_name = event_name;
    evento.event_date = event_date;
    evento.location = location;
    evento.description = description;
    evento.id_organizer = id_organizer;
    await evento.save();
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await LocalEvent.findByPk(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    await evento.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
