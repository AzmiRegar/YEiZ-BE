'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.hasMany(models.transaction, {foreignKey: "cartID", as:"cartTrans"})
        this.belongsTo(models.user, {foreignKey: "userID"})
        this.belongsTo(models.product, {foreignKey: "productID"})
    }
  }
  cart.init({
    cartID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};