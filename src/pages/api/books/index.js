import { books } from '../../../../data';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(books);
    } else if (req.method === 'POST') {
        const { title, author, description } = req.body;
        const newBook = {
            id: Date.now(),
            title,
            author,
            description,
        };
        books.push(newBook);
        res.status(201).json(newBook);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const filePath = path.join(process.cwd(), 'data.js');
    const updateData = `let books = ${JSON.stringify( books, null, 2 )};
    \module.exports = { books };`;
    fs.writeFileSync(filePath, updateData, 'utf8');

    res.status(201).json(newBook);

    
}