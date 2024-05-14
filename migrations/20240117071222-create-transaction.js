'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      transID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'userID'
        },
        allowNull:false
      },
      productID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'productID'
        },
        allowNull:false
      },
      cartID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'carts',
          key: 'cartID'
        },
        allowNull:false
      },
      date: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      total: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction');
  }
};