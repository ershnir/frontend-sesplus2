import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookForm from '../../components/BookForm';
import { getBook } from '../../../lib/api/books';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id)return;
    async function fetchBook() {
      setLoading(true);
      setError(null);
      try {
        const data = await getBook(id);
        setTitle(data.title || "");
        setAuthor(data.author || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  
  }, [id]);

  const handerSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateBook(id, title, author);
      router.push('/books');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
}