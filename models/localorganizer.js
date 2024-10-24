'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocalOrganizer extends Model {
    static associate(models) {
      // Un organizador puede tener muchos eventos
      LocalOrganizer.hasMany(models.LocalEvent, {
        foreignKey: 'id_organizer',
        as: 'events',
      });
    }
  }

  LocalOrganizer.init({
    organizer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del organizador no puede estar vacío.',
        },
        len: {
          args: [3, 100],
          msg: 'El nombre del organizador debe tener entre 3 y 100 caracteres.',
        },
      },
    },
    contact_info: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'La información de contacto no puede tener más de 100 caracteres.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'LocalOrganizer',
  });

  return LocalOrganizer;
};
