import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBook() {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error('Failed to fetch book data');
        const data = await res.json();
        setBook(data);
        setTitle(data.title);
        setAuthor(data.author);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });

      if (!res.ok) throw new Error('Gagal mengupdate buku, harap mengisi karakter minimal 5');

      alert('Berhasil diupdate!');
      router.push('/'); // Redirect ke halaman utama atau daftar buku
    } catch (err) {
      alert(err.message);
    }
  };

  if (error)
    return (
      <div className="p-10 text-red-500 text-center text-lg font-semibold">
        Error: {error}
      </div>
    );

  if (!book)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="bg-cream rounded-3xl p-10 shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Edit Buku</h1>

        <div className="text-left mb-4">
          <label className="block font-semibold mb-1">Judul Buku</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="text-left mb-6">
          <label className="block font-semibold mb-1">Penulis</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Masukkan nama penulis"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 rounded-full mb-4 transition"
        >
          Simpan
        </button>

        <p
          onClick={() => router.back()}
          className="text-purple-600 hover:text-purple-800 cursor-pointer text-sm"
        >
          ← Kembali ke daftar
        </p>
      </div>
    </div>
  );
}