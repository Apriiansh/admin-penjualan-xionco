"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPembelian, deletePembelian, Pembelian } from "@/lib/api";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

export default function AdminPembelianPage() {
  const [pembelian, setPembelian] = useState<Pembelian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPembelian = async () => {
    try {
      setLoading(true);
      const data = await getPembelian();
      setPembelian(data);
    } catch (err) {
      setError("Gagal memuat data pembelian");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPembelian();
  }, []);

  const handleCancel = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan pembelian ini?")) {
      try {
        await deletePembelian(id);
        fetchPembelian(); // refresh list
      } catch (err) {
        setError("Gagal membatalkan pembelian");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <header className="bg-[var(--secondary)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto py-6 px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            DAFTAR PEMBELIAN
          </h1>
          <Link
            href="/admin/pembelian/new"
            className="btn-primary flex items-center gap-2"
          >
            <FaPlusCircle className="text-lg" />
            <span>Tambah Pembelian</span>
          </Link>
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

          {loading ? (
            <div className="text-center py-10 text-[var(--muted)]">
              Memuat data...
            </div>
          ) : pembelian.length === 0 ? (
            <div className="text-center py-10 text-[var(--muted)] italic">
              Belum ada data pembelian
            </div>
          ) : (
            <div className="space-y-4">
              {pembelian.map((item) => (
                <div
                  key={item.id}
                  className="card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-[var(--primary)]">
                        #{item.id}
                      </span>
                      <h2 className="text-lg font-semibold text-[var(--foreground)]">
                        {item.produk?.nama || "Produk tidak ditemukan"}
                      </h2>
                    </div>
                    <div className="text-sm text-[var(--muted)] mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>
                        Jumlah:{" "}
                        <span className="font-medium text-[var(--foreground)]">
                          {item.jumlah}
                        </span>
                      </span>
                      <span className="hidden sm:inline">|</span>
                      <span>
                        Total:{" "}
                        <span className="font-semibold text-[var(--foreground)]">
                          Rp {item.totalHarga.toLocaleString("id-ID")}
                        </span>
                      </span>
                      <span className="hidden sm:inline">|</span>
                      <span>
                        Tanggal:{" "}
                        <span className="font-medium text-[var(--foreground)]">
                          {new Date(item.tanggalBeli).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        item.status === "selesai"
                          ? "bg-[var(--success)]/10 text-[var(--success)]"
                          : item.status === "pending"
                          ? "bg-[var(--warning)]/10 text-[var(--warning)]"
                          : "bg-[var(--danger)]/10 text-[var(--danger)]"
                      }`}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleCancel(item.id)}
                      className="btn-danger flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <FaTrash />
                      <span>Batal</span>
                    </button>
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
