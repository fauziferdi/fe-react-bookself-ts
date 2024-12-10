import React, { useState } from "react";
import Book from "../types/Book";

interface BookFromProps {
  onSubmit: (book: Omit<Book, "id">) => void;
}

const BookForm: React.FC<BookFromProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, author, description });
    setTitle("");
    setAuthor("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-plus-square me-2"></i> Add Book
      </button>
    </form>
  );
};

export default BookForm;
