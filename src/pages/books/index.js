import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { getBooks } from '../../../lib/api/books';

export default function Booklist() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  // Fetch books
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/books?search=${search}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Gagal memuat data.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [search]);

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus buku ini?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/books');
      } else {
        const data = await response.json();
        setError(data.message || 'Gagal menghapus buku.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Gagal menghapus buku.');
    }
  };

  return (
    <div className="min-h-screen bg-black px-8 py-10">
      {/* Header & Search */}
      <div className="mb-10 max-w-md">
        <h1 className="text-white text-3xl font-bold mb-2">Daftar Buku</h1>
        <div className="h-1 bg-white w-24 mb-6"></div>
    <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari buku..."
        className="w-full px-5 py-3 rounded-2xl bg-purple-600 text-white placeholder-white border border-purple-700 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-md"
    />
      </div>
      <Link
        href="/books/add"
        className="block w-full max-w-xs text-center bg-lime-400 text-black font-bold py-4 rounded-2xl text-xl mb-10"
      >
        Tambah Buku
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((b) => (
          <div key={b.id} className="bg-[#fdf7e4] rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <h2 className="text-xl text-purple-700 font-bold mb-2">{b.title}</h2>
            <hr className="border-gray-400 mb-2" />
            <p className="text-black font-semibold mb-1">
              Oleh: <span className="font-normal">{b.author}</span>
            </p>

            <div className="flex justify-between mt-auto pt-4">
              <Link href={`/books/${b.id}`}>
                <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">Edit</button>
              </Link>
              <button
                onClick={() => deleteBook(b.id)}
                className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
