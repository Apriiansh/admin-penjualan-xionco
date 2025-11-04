'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    static associate(models) {
      Produk.hasOne(models.Stock, {
        foreignKey: 'produkId',
        as: 'stock'
      });
      Produk.hasMany(models.Pembelian, {
        foreignKey: 'produkId',
        as: 'pembelian'
      });
    }
  }
  Produk.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    kategori: DataTypes.STRING,
    warna: DataTypes.STRING,
    img: DataTypes.TEXT,
    deskripsi: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Produk',
    tableName: 'Produk'
  });
  return Produk;
};