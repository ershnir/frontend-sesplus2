const BACKEND_URL = "http://localhost:3333";

export default async function handler(req, res) {
  const { method, query, body } = req;


  switch (method) {
    case 'GET':
      try {
        const fetchRes = await fetch(`${BACKEND_URL}/books`);
        const data = await fetchRes.json();

        const { search } = query;
        let filteredData = data;
        if (search) {
          filteredData = data.filter(book =>
            book.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        return res.status(200).json(filteredData);
      } catch (error) {
        console.error("GET error:", error);
        return res.status(500).json({ message: "Gagal mengambil data" });
      }

    case 'POST':
      try {
        const { title, author } = body;
        if (!title || !author) {
          return res.status(400).json({ message: "Semua field wajib diisi." });
        }

        const response = await fetch(`${BACKEND_URL}/books`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author }),
        });

        const data = await response.json();
        return res.status(response.status).json(data);
      } catch (error) {
        console.error("POST error:", error);
        return res.status(500).json({ message: "Gagal menambahkan data" });
      }
      

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
