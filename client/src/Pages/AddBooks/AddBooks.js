import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'


function AddBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);


   const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/books/");
      setBooks(res.data);
    } catch (err) {
      console.error("Error loading books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


    const handleGetBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/books",
        {
          title,
          genre,
          author,
          year,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setMessage(response.data?.message ?? "Book added");
      // refresh list after successful add
      await fetchBooks();

      setTitle("");
      setGenre("");
      setAuthor("");
      setYear("");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Add book error:", error);
      if (error.response) {
        const errMsg =
          error.response.data?.error ||
          error.response.data?.message ||
          JSON.stringify(error.response.data);
        setMessage(errMsg);
      } else {
        setMessage("Book addition failed");
      }
    }
  };
return (
  <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-6 border border-gray-100">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Book</h2>

    <form onSubmit={handleGetBook} className="space-y-5">
      {/* TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          name="title"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      {/* GENRE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <input
          name="genre"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      {/* AUTHOR */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          name="author"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      {/* YEAR */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Year
        </label>
        <input
          name="year"
          placeholder="e.g. 2023"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 shadow"
        >
          Add Book
        </button>

        <button
          type="reset"
          onClick={() => {
            setTitle("");
            setAuthor("");
            setGenre("");
            setYear("");
          }}
          className="px-5 py-2.5 rounded-lg bg-gray-100 border border-gray-300 text-sm hover:bg-gray-200"
        >
          Reset
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="text-sm text-indigo-600 font-medium mt-2">
          {message}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-3">
        Note: This form calls your backend API using Axios.
      </p>
    </form>
  </div>
);

}

export default AddBooks
