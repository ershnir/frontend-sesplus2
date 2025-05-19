const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
    const { method } = req;

    switch ( method ) {
        case 'GET': {
            const fetchRes = await fetch(`${BACKEND_URL}/api/books`);
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }

        case 'POST': {
            const { title, author } = req.body;
            console.log(title, author);
            const fetchRes = await fetch(`${BACKEND_URL}/api/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
            });
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }
    }
}