'use strict';

const fs = require('fs');
const path = require('path');
const sequelize = require('../db/db'); // Usar la conexión existente
const Sequelize = require('sequelize'); // Importar Sequelize para usar DataTypes
const basename = path.basename(__filename);
const db = {};

// Cargar todos los modelos automáticamente
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Pasar tanto sequelize como Sequelize.DataTypes a cada modelo
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
