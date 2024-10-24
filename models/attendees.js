'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendees extends Model {
    static associate(models) {
      // Un cliente tiene un ticket
      Attendees.belongsTo(models.LocalTicket, {
        foreignKey: 'id_ticket',
        as: 'ticket',
      });

      // Un cliente puede tener un historial de eventos
      Attendees.hasMany(models.EventHistory, {
        foreignKey: 'id_attendee',
        as: 'eventHistories',
      });
    }
  }

  Attendees.init({
    attendee_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del asistente no puede estar vacío.',
        },
        isAlpha: {
          msg: 'El nombre solo debe contener letras.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'El correo electrónico no es válido.',
        },
        notEmpty: {
          msg: 'El correo electrónico no puede estar vacío.',
        },
      },
    },
    id_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'El ID del ticket debe ser un número entero.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Attendees',
  });

  return Attendees;
};
