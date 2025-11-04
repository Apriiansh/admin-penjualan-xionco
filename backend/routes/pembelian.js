const express = require('express');
const router = express.Router();
const { 
  getAllPembelian,
  getPembelianById,
  createPembelian,
  deletePembelian
} = require('../controllers/pembelianController');

router.get('/', getAllPembelian);

router.get('/:id', getPembelianById);

router.post('/', createPembelian);

router.delete('/:id', deletePembelian);

module.exports = router;