'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LocalTickets', {
      id_ticket: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ticket_type: {
        type: Sequelize.ENUM('General', 'VIP'),  
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      availability: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_event: {
        type: Sequelize.INTEGER,
        references: {
          model: 'LocalEvents',
          key: 'id_event',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LocalTickets');
  },
};
