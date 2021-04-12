'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      arrival: {
        type: Sequelize.DATE
      },
      leave: {
        type: Sequelize.DATE
      },
      roomID: {
        type: Sequelize.INTEGER
      },
      riskForLunch:{
        type: Sequelize.STRING
      },
      riskForDinner: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendances');
  }
};