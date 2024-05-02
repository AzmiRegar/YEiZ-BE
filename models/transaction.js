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
      this.hasOne(models.detail, {foreignKey: "transID", as: "transDetail"})
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
    cartID: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    date: DataTypes.DATE,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};