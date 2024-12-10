import React, { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import apiClient from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../types/Book";

const EditBook: React.FC = () => {
  const { id } = useParams(); // Ambil ID buku dari URL
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await apiClient.get(`/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (updatedBook: Omit<Book, "id">) => {
    try {
      await apiClient.put(`/books/${id}`, updatedBook);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Edit Book</h1>
      <BookForm
        onSubmit={handleSubmit}
        initialValues={book} // Berikan nilai awal ke form
      />
    </div>
  );
};

export default EditBook;
