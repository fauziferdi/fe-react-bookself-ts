import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Book from "../types/Book";
import apiClient from "../utils/api";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    apiClient
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id: number) => {
    apiClient
      .delete(`/books/${id}`)
      .then(() => {
        getData();
        console.log("data berhasil terhapus");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Bookshelf</h1>
      <BookList onDelete={handleDelete} books={books} />
    </div>
  );
};

export default Home;
