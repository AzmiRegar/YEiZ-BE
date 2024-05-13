'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, {foreignKey: "productID"})
      this.belongsTo(models.cart, {foreignKey: "cartID"})
      }
  }
  transaction.init({
    transID: {
      allowNull:false,
      autoIncrement:true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productID: DataTypes.INTEGER,
    cartID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};