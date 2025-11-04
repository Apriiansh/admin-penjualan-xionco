const { Stock } = require('../models');

const updateStock = async (req, res) => {
  try {
    const { produkId } = req.params;
    const { jumlah } = req.body;

    if (jumlah === undefined) return res.status(400).json({ message: 'Jumlah (quantity) is required' });

    const stock = await Stock.findOne({ where: { produkId: produkId } });

    if (!stock) return res.status(404).json({ message: 'Stock for the given product not found' });
    

    stock.jumlah = jumlah;
    await stock.save();

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateStock
};
