'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       this.hasMany(models.cart, {foreignKey: "productID", as: "productCart"})
    }
  }
  product.init({
    productID: {
      allowNull:false,
      autoIncrement:true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_name: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};