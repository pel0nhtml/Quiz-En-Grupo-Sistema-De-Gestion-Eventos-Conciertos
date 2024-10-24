const { EventDetail, LocalEvent, LocalPerformer } = require('../models');

const obtenerDetalles = async (req, res) => {
  try {
    const detalles = await EventDetail.findAll({
      include: ['event', 'performer'],
    });
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearDetalle = async (req, res) => {
  try {
    const { schedule, description, id_event, id_performer } = req.body;

    // Validaciones para tontos creando detalles
    if (!schedule || schedule.trim() === '') {
      return res.status(400).json({ error: 'El horario (schedule) es obligatorio.' });
    }

    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento (id_event) es obligatorio y debe ser un número válido.' });
    }

    if (!id_performer || isNaN(id_performer)) {
      return res.status(400).json({ error: 'El ID del performer (id_performer) es obligatorio y debe ser un número válido.' });
    }

    // Validar la longitud de la descripción
    if (description && description.length > 500) {
      return res.status(400).json({ error: 'La descripción no puede tener más de 500 caracteres.' });
    }

    const nuevoDetalle = await EventDetail.create({ schedule, description, id_event, id_performer });
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule, description, id_event, id_performer } = req.body;

    // Validaciones para tontos actualizando detalles
    if (!schedule || schedule.trim() === '') {
      return res.status(400).json({ error: 'El horario (schedule) es obligatorio.' });
    }

    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento (id_event) es obligatorio y debe ser un número válido.' });
    }

    if (!id_performer || isNaN(id_performer)) {
      return res.status(400).json({ error: 'El ID del performer (id_performer) es obligatorio y debe ser un número válido.' });
    }

    if (description && description.length > 500) {
      return res.status(400).json({ error: 'La descripción no puede tener más de 500 caracteres.' });
    }

    const detalle = await EventDetail.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ error: 'Detalle no encontrado' });
    }

    detalle.schedule = schedule;
    detalle.description = description;
    detalle.id_event = id_event;
    detalle.id_performer = id_performer;
    await detalle.save();
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await EventDetail.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ error: 'Detalle no encontrado' });
    }
    await detalle.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerDetalles,
  crearDetalle,
  actualizarDetalle,
  eliminarDetalle,
};
