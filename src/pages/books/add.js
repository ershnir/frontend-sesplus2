import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function AddBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = async (e) => {
  e.preventDefault();
  if (!title || !author) return;

  const res = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author }),
  });

  if (res.ok) {
    alert("Buku berhasil ditambahkan!");
    router.push("/books");
  } else {
    const errorData = await res.json();
    alert("Gagal tambah: " + errorData.message);
  }
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="bg-[#fffdeb] rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
          Tambah Buku
        </h1>

    <form onSubmit={addBook} className="space-y-6 text-gray-800">
        <div>
          <label className="block font-semibold mb-1 text-gray-900">Judul Buku</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            placeholder="Masukkan judul"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-900">Penulis</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            placeholder="Masukkan nama penulis"
          />
        </div>

          <button
            type="submit"
            className="w-full py-3 bg-lime-400 text-black font-bold rounded-full hover:bg-lime-300 transition"
          >
            Tambah Buku
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/books" className="text-purple-600 hover:underline font-medium">
            ← Kembali ke daftar
          </Link>
        </div>
      </div>
    </div>
  );
}
