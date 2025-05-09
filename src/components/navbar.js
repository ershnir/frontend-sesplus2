export default function Navbar()
{
    return(
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-4xl font-semibold mb-2">Selamat Datang di Website</h1>
        <h2 className="text-5xl font-bold text-purple-600 mb-8">Daftar Buku</h2>

        <button className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-10 rounded-full text-xl transition duration-300">
            Masuk Lewat /Books
        </button>
      </div>
        </div>
    )
}