'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembelian extends Model {
    static associate(models) {
      Pembelian.belongsTo(models.Produk, {
        foreignKey: 'produkId',
        as: 'produk'
      });
    }
  }
  Pembelian.init({
    produkId: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    totalHarga: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'aktif' 
    },
    tanggalBeli: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pembelian',
    tableName: 'Pembelian'
  });
  return Pembelian;
};