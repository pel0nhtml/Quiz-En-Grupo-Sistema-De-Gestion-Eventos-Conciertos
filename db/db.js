const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('gestion_eventos_conciertos_db','sebastian', '1234', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;