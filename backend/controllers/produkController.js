const { Produk, Stock, sequelize } = require('../models');

// Get all products with their stock
const getAllProduk = async (req, res) => {
  try {
    const produk = await Produk.findAll({
      include: [{
        model: Stock,
        as: 'stock',
        attributes: ['jumlah']
      }]
    });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findByPk(req.params.id, {
      include: [{
        model: Stock,
        as: 'stock',
        attributes: ['jumlah']
      }]
    });
    if (produk) {
      res.json(produk);
    } else {
      res.status(404).json({ message: 'Produk not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product and its initial stock
const createProduk = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { nama, harga, kategori, warna, img, deskripsi, jumlah_stock } = req.body;

    const newProduk = await Produk.create({
      nama,
      harga,
      kategori,
      warna,
      img,
      deskripsi
    }, { transaction: t });

    await Stock.create({
      produkId: newProduk.id,
      jumlah: jumlah_stock || 0
    }, { transaction: t });

    await t.commit();
    res.status(201).json(newProduk);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: error.message });
  }
};

// Update a product
const updateProduk = async (req, res) => {
  try {
    const produk = await Produk.findByPk(req.params.id);
    if (produk) {
      await produk.update(req.body);
      res.json(produk);
    } else {
      res.status(404).json({ message: 'Produk not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product and its stock
const deleteProduk = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const produk = await Produk.findByPk(req.params.id);
    if (produk) {
      // First delete the stock associated with the product
      await Stock.destroy({ where: { produkId: req.params.id } }, { transaction: t });
      // Then delete the product
      await produk.destroy({ transaction: t });
      
      await t.commit();
      res.json({ message: 'Produk deleted successfully' });
    } else {
      await t.rollback();
      res.status(404).json({ message: 'Produk not found' });
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk
};