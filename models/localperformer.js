'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocalPerformer extends Model {
    static associate(models) {
      // Un performer pertenece a un evento
      LocalPerformer.belongsTo(models.LocalEvent, {
        foreignKey: 'id_event',
        as: 'event',
      });

      // Un performer puede aparecer en los detalles de un evento
      LocalPerformer.hasMany(models.EventDetail, {
        foreignKey: 'id_performer',
        as: 'eventDetails',
      });
    }
  }

  LocalPerformer.init({
    performer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del performer no puede estar vacío.',
        },
        len: {
          args: [2, 100],
          msg: 'El nombre del performer debe tener entre 2 y 100 caracteres.',
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 50],
          msg: 'El género no puede tener más de 50 caracteres.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'LocalPerformer',
  });
  return LocalPerformer;
};
