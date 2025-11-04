const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Stock {
    jumlah: number;
}

export interface Produk {
    id: number;
    nama: string;
    harga: number;
    kategori: string;
    warna: string;
    img: string;
    deskripsi: string;
    createdAt: string;
    updatedAt: string;
    stock: Stock | null;
}

export interface Pembelian {
    id: number;
    produkId: number;
    jumlah: number;
    totalHarga: number;
    status: string;
    tanggalBeli: string;    
    produk?: {
        nama: string;
        harga: number;
    }
}

export type CreateProdukDto = Omit<Produk, 'id' | 'createdAt' | 'updatedAt' | 'stock'> & {
    jumlah_stock: number;
};

export type UpdateProdukDto = Partial<CreateProdukDto>;

export type CreatePembelianDto = {
    produkId: number;
    jumlah: number;
}

// API FUNCTION
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    if (response.status === 204 || response.headers.get('Content-Length') === '0') return;

    return response.json();
}

// Produk API
export const getProduk = (): Promise<Produk[]> => fetchAPI('/produk');

export const getProdukById = (id: number): Promise<Produk> => fetchAPI(`/produk/${id}`);

export const createProduk = (data: CreateProdukDto): Promise<Produk> => fetchAPI('/produk', {
  method: 'POST',
  body: JSON.stringify(data),
});

export const updateProduk = (id: number, data: UpdateProdukDto): Promise<Produk> => fetchAPI(`/produk/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data),
});

export const deleteProduk = (id: number): Promise<void> => fetchAPI(`/produk/${id}`, {
  method: 'DELETE',
});

// Stock API
export const updateStock = (produkId: number, jumlah: number): Promise<Stock> => fetchAPI(`/stock/${produkId}`, {
    method: 'PATCH',
    body: JSON.stringify({ jumlah }),
});

// Pembelian API
export const getPembelian = (): Promise<Pembelian[]> => fetchAPI('/pembelian');

export const createPembelian = (data: CreatePembelianDto): Promise<Pembelian> => fetchAPI('/pembelian', {
    method: 'POST',
    body: JSON.stringify(data),
});

export const deletePembelian = (id: number): Promise<void> => fetchAPI(`/pembelian/${id}`, {
    method: 'DELETE',
});


