const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Admin Pembelian API Running' });
});

// Routes
const produkRoutes = require('./routes/produk');
const pembelianRoutes = require('./routes/pembelian');
const stockRoutes = require('./routes/stock');

app.use('/api/produk', produkRoutes);
app.use('/api/pembelian', pembelianRoutes);
app.use('/api/stock', stockRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
