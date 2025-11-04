
import Link from 'next/link';
import { FaShoppingBasket } from 'react-icons/fa';

export default function Navbar() {
  return (
    <header className="bg-[var(--card-bg)] shadow-sm border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <FaShoppingBasket className="text-2xl text-[var(--primary)]" />
            <span className="text-xl font-semibold text-[var(--foreground)] tracking-tight">
              Admin Toko
            </span>
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="/" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/pembelian" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                  Pembelian
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
