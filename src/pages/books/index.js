import { useEffect, useState } from "react";
import Link from 'next/link';

export default function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/books')
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    const deleteBook = async (id) => {
        await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'DELETE',
        });
        setBooks(books.filter(b => b.id !== id));
    };

    return (
        <div className="min-h-screen bg-black px-8 py-10">
            <h1 className="text-white text-3xl font-bold mb-4">Daftar Buku</h1>
            <div className="h-1 bg-white mb-6 w-full max-w-xs"></div>

            <Link href="/books/add" className="block w-full max-w-xs text-center bg-lime-400 text-black font-bold py-4 rounded-2xl text-xl mb-10">
                Tambah Buku
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((b) => (
                    <div key={b.id} className="bg-[#fdf7e4] rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <h2 className="text-xl text-purple-700 font-bold mb-2">{b.title}</h2>
                        <hr className="border-gray-400 mb-2" />
                        <p className="text-black font-semibold mb-1">Oleh: <span className="font-normal">{b.author}</span></p>
                        <p className="text-black text-sm mb-4">
                            <span className="font-semibold">Penjelasan:</span><br />
                            {b.description}
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
