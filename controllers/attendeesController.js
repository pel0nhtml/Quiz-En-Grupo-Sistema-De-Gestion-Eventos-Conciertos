
const { Attendees, EventHistory, LocalTicket } = require('../models');

const obtenerAsistentes = async (req, res) => {
  try {
    const asistentes = await Attendees.findAll({
      include: ['ticket', 'eventHistories'],
    });
    res.json(asistentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearAsistente = async (req, res) => {
  try {
    const { attendee_name, email, id_ticket } = req.body;

    // Validaciones personalizadas
    if (!attendee_name || attendee_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del asistente es obligatorio.' });
    }
    if (!/^[a-zA-Z\s]+$/.test(attendee_name)) {
      return res.status(400).json({ error: 'El nombre solo puede contener letras.' });
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Debe proporcionar un correo electrónico válido.' });
    }
    if (!id_ticket || isNaN(id_ticket)) {
      return res.status(400).json({ error: 'El ID del ticket debe ser un número válido.' });
    }

    const nuevoAsistente = await Attendees.create({ attendee_name, email, id_ticket });
    res.status(201).json(nuevoAsistente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarAsistente = async (req, res) => {
  try {
    const { id } = req.params;
    const { attendee_name, email, id_ticket } = req.body;

    // Validaciones personalizadas
    if (!attendee_name || attendee_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del asistente es obligatorio.' });
    }
    if (!/^[a-zA-Z\s]+$/.test(attendee_name)) {
      return res.status(400).json({ error: 'El nombre solo puede contener letras.' });
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Debe proporcionar un correo electrónico válido.' });
    }
    if (!id_ticket || isNaN(id_ticket)) {
      return res.status(400).json({ error: 'El ID del ticket debe ser un número válido.' });
    }

    const asistente = await Attendees.findByPk(id);
    if (!asistente) {
      return res.status(404).json({ error: 'Asistente no encontrado' });
    }

    asistente.attendee_name = attendee_name;
    asistente.email = email;
    asistente.id_ticket = id_ticket;
    await asistente.save();

    res.json(asistente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarAsistente = async (req, res) => {
  try {
    const { id } = req.params;
    const asistente = await Attendees.findByPk(id);
    if (!asistente) {
      return res.status(404).json({ error: 'Asistente no encontrado' });
    }
    await asistente.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerAsistentes,
  crearAsistente,
  actualizarAsistente,
  eliminarAsistente,
};
