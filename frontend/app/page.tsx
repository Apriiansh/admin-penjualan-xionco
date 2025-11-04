'use client';

import { useEffect, useState } from 'react';
import { getProduk, updateStock, Produk } from '@/lib/api';
import { IoMdAddCircle } from 'react-icons/io';
import { HiOutlineMinusCircle } from 'react-icons/hi';

export default function Home() {
  const [products, setProducts] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Fetch produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduk();
        setProducts(data);
      } catch (err) {
        setError('Gagal memuat data produk');
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Handler tambah/kurangi stok
  const handleUpdateStock = async (produkId: number, delta: number) => {
    try {
      setUpdatingId(produkId);
      const product = products.find((p) => p.id === produkId);
      if (!product) return;

      const currentStock = product.stock?.jumlah || 0;
      const newStock = Math.max(currentStock + delta, 0); // tidak boleh negatif

      await updateStock(produkId, newStock);

      // update tampilan tanpa refetch
      setProducts((prev) =>
        prev.map((p) =>
          p.id === produkId ? { ...p, stock: { jumlah: newStock } } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui stok!');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <header className="bg-[var(--secondary)] shadow-sm border-b border-[var(--border)] flex items-center justify-center">
        <div className="max-w-7xl mx-auto py-6 px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            DAFTAR PRODUK
          </h1>
          {/* <a
            href="/admin/produk/tambah"
            className="btn-primary text-sm"
          >
            + Tambah Produk
          </a> */}
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-10 px-6">
          {error && (
            <div
              className="bg-[var(--danger)]/10 border border-[var(--danger)] text-[var(--danger)] px-4 py-3 rounded-lg mb-4"
              role="alert"
            >
              <strong className="font-semibold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          {!error && products.length === 0 && (
            <p className="text-center text-[var(--muted)] mt-10">
              Belum ada produk yang tersedia.
            </p>
          )}

          {!error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-6">
              {products.map((product) => (
                <div key={product.id} className="card group relative">
                  {updatingId === product.id && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center text-sm text-[var(--foreground)]">
                      <span className="animate-pulse">Updating...</span>
                    </div>
                  )}

                  <img
                    src={product.img}
                    alt={product.nama}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-semibold truncate mb-1">
                      {product.nama}
                    </h2>
                    <p className="text-[var(--muted)] text-sm">
                      Rp {product.harga.toLocaleString('id-ID')}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p
                        className={`text-sm font-medium ${
                          product.stock && product.stock.jumlah > 0
                            ? 'text-[var(--success)]'
                            : 'text-[var(--danger)]'
                        }`}
                      >
                        Stok: {product.stock ? product.stock.jumlah : 'N/A'}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateStock(product.id, -1)}
                          disabled={updatingId === product.id}
                          className="p-1 rounded-full hover:bg-[var(--secondary-hover)] transition"
                        >
                          <HiOutlineMinusCircle className="w-5 h-5 text-[var(--danger)]" />
                        </button>

                        <button
                          onClick={() => handleUpdateStock(product.id, +1)}
                          disabled={updatingId === product.id}
                          className="p-1 rounded-full hover:bg-[var(--secondary-hover)] transition"
                        >
                          <IoMdAddCircle className="w-5 h-5 text-[var(--success)]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
