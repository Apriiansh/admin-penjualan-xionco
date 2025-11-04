'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stock', null, {});
    await queryInterface.bulkDelete('Produk', null, {});

    const products = [
      {
        nama: 'CAPRA SERIES SOFA 3 SEATER',
        harga: 3500000,
        kategori: 'seats',
        warna: 'Abu-abu',
        img: 'https://www.xionco.com/wp-content/uploads/2025/02/CAPRA_Sign_disp_1-removebg-preview-670x698.png',
        deskripsi: 'Sofa 3 Seater from CAPRA SERIES.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'CUBIX Modular Series SOFA 2 SEATER',
        harga: 2800000,
        kategori: 'seats',
        warna: 'Biru',
        img: 'https://www.xionco.com/wp-content/uploads/2024/07/2-Seater-Cubix-670x698.jpg',
        deskripsi: 'Sofa 2 Seater from CUBIX Modular Series.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'L7 Personal Workstation',
        harga: 1500000,
        kategori: 'table',
        warna: 'Coklat',
        img: 'https://www.xionco.com/wp-content/uploads/2024/12/XC.com-Thumbnail-18-670x698.png',
        deskripsi: 'Personal Workstation L7.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'QAZTAC Industrial Nightstand',
        harga: 800000,
        kategori: 'table',
        warna: 'Hitam',
        img: 'https://www.xionco.com/wp-content/uploads/2024/07/QAZTAC-Thumbnail-3-e1734703263864-670x698.png',
        deskripsi: 'Industrial Nightstand QAZTAC.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'REGALE • Kitchenette',
        harga: 4500000,
        kategori: 'cabinet',
        warna: 'Putih',
        img: 'https://www.xionco.com/wp-content/uploads/2024/09/REGALE-Thumbnail-6-670x698.png',
        deskripsi: 'Kitchenette from REGALE.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'VAZRA SERIES | POWER TRACK',
        harga: 500000,
        kategori: 'decor',
        warna: 'Hitam',
        img: 'https://www.xionco.com/wp-content/uploads/2024/12/Vazra_power_track_disp_1-removebg-preview-670x698.png',
        deskripsi: 'Power Track from VAZRA SERIES.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'POEL Platform Bed',
        harga: 5500000,
        kategori: 'bedframe',
        warna: 'Coklat',
        img: 'https://www.xionco.com/wp-content/uploads/2024/12/POEL-308x322-1-670x698.png',
        deskripsi: 'Platform Bed from POEL.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'SOMNO Platform Bed',
        harga: 6000000,
        kategori: 'bedframe',
        warna: 'Abu-abu',
        img: 'https://www.xionco.com/wp-content/uploads/2023/06/WhatsApp-Image-2024-08-03-at-16.14.45-670x698.jpeg',
        deskripsi: 'Platform Bed from SOMNO.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'GUISE SIGNATURE SERIES SOFA 3 SEATER',
        harga: 4200000,
        kategori: 'seats',
        warna: 'Hijau',
        img: 'https://www.xionco.com/wp-content/uploads/2024/07/XC.com-Thumbnail-4-670x698.png',
        deskripsi: 'Sofa 3 Seater from GUISE SIGNATURE SERIES.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama: 'ASTRAL SERIES SOFA 3 SEATER',
        harga: 4800000,
        kategori: 'seats',
        warna: 'Biru Tua',
        img: 'https://www.xionco.com/wp-content/uploads/2023/06/XC.com-Thumbnail-9-670x698.png',
        deskripsi: 'Sofa 3 Seater from ASTRAL SERIES.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Produk', products, {});

    const [results] = await queryInterface.sequelize.query('SELECT id FROM Produk ORDER BY id DESC LIMIT 10');
    const maxId = results.length ? results[0].id : 0;

    const stocks = [];
    for (let i = maxId - 9; i <= maxId; i++) {
      stocks.push({
        produkId: i,
        jumlah: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Stock', stocks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stock', null, {});
    await queryInterface.bulkDelete('Produk', null, {});
  }
};
