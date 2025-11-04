const { Pembelian, Produk, Stock, sequelize } = require('../models');

// Get all purchases
const getAllPembelian = async (req, res) => {
  try {
    const pembelian = await Pembelian.findAll({
      include: [{
        model: Produk,
        as: 'produk',
        attributes: ['nama', 'harga']
      }]
    });
    res.json(pembelian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single purchase by ID
const getPembelianById = async (req, res) => {
  try {
    const pembelian = await Pembelian.findByPk(req.params.id, {
      include: [{
        model: Produk,
        as: 'produk',
        attributes: ['nama', 'harga']
      }]
    });
    if (pembelian) {
      res.json(pembelian);
    } else {
      res.status(404).json({ message: 'Pembelian not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new purchase
const createPembelian = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { produkId, jumlah } = req.body;

    if (!produkId || !jumlah || jumlah <= 0) {
      return res.status(400).json({ message: 'produkId and a valid jumlah are required' });
    }

    const produk = await Produk.findByPk(produkId, { transaction: t });
    if (!produk) {
      await t.rollback();
      return res.status(404).json({ message: 'Produk not found' });
    }

    const stock = await Stock.findOne({ where: { produkId } }, { transaction: t });
    if (!stock || stock.jumlah < jumlah) {
      await t.rollback();
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const totalHarga = produk.harga * jumlah;

    const newPembelian = await Pembelian.create({
      produkId,
      jumlah,
      totalHarga,
      tanggalBeli: new Date()
    }, { transaction: t });

    stock.jumlah -= jumlah;
    await stock.save({ transaction: t });

    await t.commit();
    res.status(201).json(newPembelian);

  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: error.message });
  }
};

// Delete a purchase (cancel)
const deletePembelian = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const pembelian = await Pembelian.findByPk(req.params.id, { transaction: t });
    if (!pembelian) {
      await t.rollback();
      return res.status(404).json({ message: 'Pembelian not found' });
    }

    const stock = await Stock.findOne({ where: { produkId: pembelian.produkId } }, { transaction: t });
    if (stock) {
      stock.jumlah += pembelian.jumlah;
      await stock.save({ transaction: t });
    }
    // If stock not found, something is wrong, but we proceed to delete the purchase record anyway

    await pembelian.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Pembelian cancelled and stock restored.' });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllPembelian,
  getPembelianById,
  createPembelian,
  deletePembelian
};
