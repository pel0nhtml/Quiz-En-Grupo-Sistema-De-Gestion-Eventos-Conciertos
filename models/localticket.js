'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocalTicket extends Model {
    static associate(models) {
      // Una entrada pertenece a un evento
      LocalTicket.belongsTo(models.LocalEvent, {
        foreignKey: 'id_event',
        as: 'event',
      });

      // Una entrada puede estar asociada a muchos asistentes
      LocalTicket.hasMany(models.Attendees, {
        foreignKey: 'id_ticket',
        as: 'attendees',
      });

      // Una entrada puede estar en el historial de eventos
      LocalTicket.hasMany(models.EventHistory, {
        foreignKey: 'id_ticket',
        as: 'eventHistories',
      });
    }
  }

  LocalTicket.init({
    ticket_type: {
      type: DataTypes.ENUM('General', 'VIP'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['General', 'VIP']],
          msg: 'El tipo de ticket debe ser "General" o "VIP".',
        },
        notEmpty: {
          msg: 'El tipo de ticket no puede estar vacío.',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'El precio debe ser un número decimal válido.',
        },
        min: {
          args: [0.01],
          msg: 'El precio debe ser mayor que 0.',
        },
      },
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'La disponibilidad debe ser un número entero válido.',
        },
        min: {
          args: [0],
          msg: 'La disponibilidad debe ser mayor o igual a 0.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'LocalTicket',
  });
  return LocalTicket;
};
