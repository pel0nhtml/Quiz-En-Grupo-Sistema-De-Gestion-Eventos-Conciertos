const { LocalOrganizer, LocalEvent } = require('../models');

const obtenerOrganizadores = async (req, res) => {
  try {
    const organizadores = await LocalOrganizer.findAll({
      include: ['events'],
    });
    res.json(organizadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearOrganizador = async (req, res) => {
  try {
    const { organizer_name, contact_info } = req.body;

    // Validaciones
    if (!organizer_name || organizer_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del organizador es obligatorio.' });
    }
    if (organizer_name.length < 3 || organizer_name.length > 100) {
      return res.status(400).json({ error: 'El nombre del organizador debe tener entre 3 y 100 caracteres.' });
    }
    if (contact_info && contact_info.length > 100) {
      return res.status(400).json({ error: 'La información de contacto no puede tener más de 100 caracteres.' });
    }

    const nuevoOrganizador = await LocalOrganizer.create({ organizer_name, contact_info });
    res.status(201).json(nuevoOrganizador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarOrganizador = async (req, res) => {
  try {
    const { id } = req.params;
    const { organizer_name, contact_info } = req.body;

    // Validaciones
    if (!organizer_name || organizer_name.trim() === '') {
      return res.status(400).json({ error: 'El nombre del organizador es obligatorio.' });
    }
    if (organizer_name.length < 3 || organizer_name.length > 100) {
      return res.status(400).json({ error: 'El nombre del organizador debe tener entre 3 y 100 caracteres.' });
    }
    if (contact_info && contact_info.length > 100) {
      return res.status(400).json({ error: 'La información de contacto no puede tener más de 100 caracteres.' });
    }

    const organizador = await LocalOrganizer.findByPk(id);
    if (!organizador) {
      return res.status(404).json({ error: 'Organizador no encontrado' });
    }

    organizador.organizer_name = organizer_name;
    organizador.contact_info = contact_info;
    await organizador.save();
    res.json(organizador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarOrganizador = async (req, res) => {
  try {
    const { id } = req.params;
    const organizador = await LocalOrganizer.findByPk(id);
    if (!organizador) {
      return res.status(404).json({ error: 'Organizador no encontrado' });
    }
    await organizador.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerOrganizadores,
  crearOrganizador,
  actualizarOrganizador,
  eliminarOrganizador,
};
