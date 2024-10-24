'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocalEvent extends Model {
    static associate(models) {
      // Un evento pertenece a un organizador
      LocalEvent.belongsTo(models.LocalOrganizer, {
        foreignKey: 'id_organizer',
        as: 'organizer',
      });

      // Un evento tiene muchas entradas (LocalTickets)
      LocalEvent.hasMany(models.LocalTicket, {
        foreignKey: 'id_event',
        as: 'tickets',
      });

      // Un evento tiene muchos performers (LocalPerformers)
      LocalEvent.hasMany(models.LocalPerformer, {
        foreignKey: 'id_event',
        as: 'performers',
      });

      // Un evento tiene muchos registros en el historial (EventHistory)
      LocalEvent.hasMany(models.EventHistory, {
        foreignKey: 'id_event',
        as: 'eventHistories',
      });
    }
  }

  LocalEvent.init({
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del evento es obligatorio.',
        },
        len: {
          args: [3, 100],
          msg: 'El nombre del evento debe tener entre 3 y 100 caracteres.',
        },
      },
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La fecha del evento es obligatoria.',
        },
        isDate: {
          msg: 'Debe ser una fecha válida.',
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La ubicación es obligatoria.',
        },
        len: {
          args: [5, 150],
          msg: 'La ubicación debe tener entre 5 y 150 caracteres.',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: 'La descripción no puede tener más de 500 caracteres.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'LocalEvent',
  });

  return LocalEvent;
};
