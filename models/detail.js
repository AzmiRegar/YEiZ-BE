'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       this.belongsTo(models.transaction, {foreignKey: "transID"})

    }
  }
  detail.init({
    detailID: {
      allowNull:false,
      autoIncrement:true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    transID: DataTypes.INTEGER,
    cartID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};