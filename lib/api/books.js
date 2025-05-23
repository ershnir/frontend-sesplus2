export async function getBook(id) {
    const res = await fetch(`/api/books/${id}`);
    if (!res.ok) throw new Error('buku tidak ditemukan');
    return res.json();
}

export async function createBook(title, author, category) {
    const res = await fetch(`/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, category }),
    })
    if (!res.ok) throw new Error('gagal membuat buku')
    return res.json()

}

export async function updateBook(id, title, author, category) {
    const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, category }),
    })
    if (!res.ok) throw new Error('gagal mengupdate buku')
    return res.json()
}

export async function deleteBook(id) {
    const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('gagal menghapus buku')
    return res.json()
}