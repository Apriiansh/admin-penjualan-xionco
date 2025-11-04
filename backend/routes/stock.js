const express = require('express');
const router = express.Router();
const { updateStock } = require('../controllers/stockController');

router.patch('/:produkId', updateStock);

module.exports = router;
