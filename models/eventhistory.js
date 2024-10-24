'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventHistory extends Model {
    static associate(models) {
      // Historial está vinculado con un asistente
      EventHistory.belongsTo(models.Attendees, {
        foreignKey: 'id_attendee',
        as: 'attendee',
      });

      // Historial está vinculado con un evento
      EventHistory.belongsTo(models.LocalEvent, {
        foreignKey: 'id_event',
        as: 'event',
      });

      // Historial está vinculado con un ticket
      EventHistory.belongsTo(models.LocalTicket, {
        foreignKey: 'id_ticket',
        as: 'ticket',
      });
    }
  }

  EventHistory.init({
    attended_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La fecha de asistencia no puede estar vacía.',
        },
        isDate: {
          msg: 'El formato de la fecha de asistencia no es válido.',
        },
      },
    },
    id_attendee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El ID del asistente es obligatorio.',
        },
        isInt: {
          msg: 'El ID del asistente debe ser un número entero.',
        },
      },
    },
    id_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El ID del evento es obligatorio.',
        },
        isInt: {
          msg: 'El ID del evento debe ser un número entero.',
        },
      },
    },
    id_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El ID del ticket es obligatorio.',
        },
        isInt: {
          msg: 'El ID del ticket debe ser un número entero.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'EventHistory',
  });
  return EventHistory;
};
