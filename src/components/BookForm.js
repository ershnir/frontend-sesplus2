import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [author, setAuthor] = useState(initialData?.author || '');
    const [description, setDescription] = useState(initialData?.description || '');

    useEffect(() => {
        setTitle(initialData?.title || '');
        setAuthor(initialData?.author || '');
        setDescription(initialData?.description || '');
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, author, description });
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <form 
                onSubmit={handleSubmit} 
                className="bg-black text-white w-full max-w-2xl"
            >
                <div className="border border-white rounded-xl overflow-hidden mb-6">
                    <div className="p-6 border-b border-white">
                        <label htmlFor="title" className="block text-xl font-bold mb-2">Judul:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black border-none text-white placeholder-gray-400 focus:outline-none"
                            placeholder="Masukkan judul"
                        />
                    </div>
                    <div className="p-6 border-b border-white">
                        <label htmlFor="author" className="block text-xl font-bold mb-2">Penulis:</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full bg-black border-none text-white placeholder-gray-400 focus:outline-none"
                            placeholder="Masukkan nama penulis"
                        />
                    </div>
                    <div className="p-6">
                        <label htmlFor="description" className="block text-xl font-bold mb-2">Penjelasan:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black border-none text-white placeholder-gray-400 focus:outline-none"
                            placeholder="Masukkan penjelasan"
                            rows={3}
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-2xl text-xl"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
