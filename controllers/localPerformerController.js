const { LocalPerformer, EventDetail, LocalEvent } = require('../models');

const obtenerPerformers = async (req, res) => {
  try {
    const performers = await LocalPerformer.findAll({
      include: ['event', 'eventDetails'],
    });
    res.json(performers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearPerformer = async (req, res) => {
  try {
    const { performer_name, genre, id_event } = req.body;

    // Validaciones
    if (!performer_name || performer_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del performer es obligatorio.' });
    }
    if (performer_name.length < 2 || performer_name.length > 100) {
      return res.status(400).json({ error: 'El nombre del performer debe tener entre 2 y 100 caracteres.' });
    }
    if (genre && genre.length > 50) {
      return res.status(400).json({ error: 'El género no puede tener más de 50 caracteres.' });
    }
    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento es obligatorio y debe ser un número válido.' });
    }

    const nuevoPerformer = await LocalPerformer.create({ performer_name, genre, id_event });
    res.status(201).json(nuevoPerformer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarPerformer = async (req, res) => {
  try {
    const { id } = req.params;
    const { performer_name, genre, id_event } = req.body;

    // Validaciones
    if (!performer_name || performer_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del performer es obligatorio.' });
    }
    if (performer_name.length < 2 || performer_name.length > 100) {
      return res.status(400).json({ error: 'El nombre del performer debe tener entre 2 y 100 caracteres.' });
    }
    if (genre && genre.length > 50) {
      return res.status(400).json({ error: 'El género no puede tener más de 50 caracteres.' });
    }
    if (!id_event || isNaN(id_event)) {
      return res.status(400).json({ error: 'El ID del evento es obligatorio y debe ser un número válido.' });
    }

    const performer = await LocalPerformer.findByPk(id);
    if (!performer) {
      return res.status(404).json({ error: 'Performer no encontrado' });
    }

    performer.performer_name = performer_name;
    performer.genre = genre;
    performer.id_event = id_event;
    await performer.save();
    res.json(performer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarPerformer = async (req, res) => {
  try {
    const { id } = req.params;
    const performer = await LocalPerformer.findByPk(id);
    if (!performer) {
      return res.status(404).json({ error: 'Performer no encontrado' });
    }
    await performer.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerPerformers,
  crearPerformer,
  actualizarPerformer,
  eliminarPerformer,
};
