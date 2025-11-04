"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProduk, createPembelian, Produk, CreatePembelianDto } from '@/lib/api';

export default function NewPembelianPage() {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [produkId, setProdukId] = useState<string>('');
  const [jumlah, setJumlah] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProduk, setLoadingProduk] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        setLoadingProduk(true);
        const data = await getProduk();
        setProduk(data);
        if (data.length > 0) {
          setProdukId(String(data[0].id));
        }
      } catch (err) {
        setError('Gagal memuat data produk');
        console.error(err);
      } finally {
        setLoadingProduk(false);
      }
    };
    fetchProduk();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!produkId || !jumlah) {
      setError('Produk dan jumlah harus diisi');
      setIsSubmitting(false);
      return;
    }

    const data: CreatePembelianDto = {
      produkId: parseInt(produkId, 10),
      jumlah: parseInt(jumlah, 10),
    };

    try {
      await createPembelian(data);
      router.push('/admin/pembelian');
    } catch (err) {
      setError('Gagal membuat pembelian');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full p-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <header className="bg-[var(--secondary)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto py-6 px-6 flex items-center justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            INPUT PEMBELIAN BARU
          </h1>
        </div>
      </header>

      <main>
        <div className="max-w-md mx-auto py-10 px-6">
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            {error && (
              <div
                className="bg-[var(--danger)]/10 border border-[var(--danger)] text-[var(--danger)] px-4 py-3 rounded-lg mb-4"
                role="alert"
              >
                <strong className="font-semibold">Error: </strong>
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="produkId" className="block text-sm font-medium text-[var(--muted)] mb-2">
                Produk
              </label>
              <select
                id="produkId"
                value={produkId}
                onChange={(e) => setProdukId(e.target.value)}
                className={inputStyles}
                required
                disabled={loadingProduk || produk.length === 0}
              >
                {loadingProduk ? (
                  <option>Memuat produk...</option>
                ) : produk.length === 0 ? (
                  <option>Tidak ada produk tersedia</option>
                ) : (
                  produk.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label htmlFor="jumlah" className="block text-sm font-medium text-[var(--muted)] mb-2">
                Jumlah
              </label>
              <input
                type="number"
                id="jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className={inputStyles}
                min="1"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Pembelian'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
