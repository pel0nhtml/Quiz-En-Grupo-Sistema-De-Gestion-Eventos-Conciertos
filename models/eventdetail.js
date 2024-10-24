'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventDetail extends Model {
    static associate(models) {
      // Detalle evento
      EventDetail.belongsTo(models.LocalEvent, {
        foreignKey: 'id_event',
        as: 'event',
      });

      // Detalle performer
      EventDetail.belongsTo(models.LocalPerformer, {
        foreignKey: 'id_performer',
        as: 'performer',
      });
    }
  }

  EventDetail.init({
    schedule: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El horario es obligatorio.',
        },
        isDate: {
          msg: 'El formato del horario no es válido.',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500], // descripcion maxima de 500 caracteres
          msg: 'La descripción no puede tener más de 500 caracteres.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'EventDetail',
  });
  return EventDetail;
};
