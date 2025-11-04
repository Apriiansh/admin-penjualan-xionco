'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.Produk, {
        foreignKey: 'produkId',
        as: 'produk'
      });
    }
  }
  Stock.init({
    produkId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stock',
    tableName: 'Stock'
  });
  return Stock;
};