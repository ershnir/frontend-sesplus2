import { useRouter } from "next/router";
import React, { useState } from "react";
import BookForm from "../../components/BookForm.js";
import { createBook } from "../../../lib/api/books.js";

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await createBook(title, author);
            router.push("/books");
        } catch (err) {
            setError(err.message || "");
        } finally {
            setLoading(false);
        }
    };
}