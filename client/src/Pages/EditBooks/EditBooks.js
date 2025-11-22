import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EditBooks() {
  const [books, setBooks] = useState([]);

  const [id, setId] = useState();
  const [UpdateTitle, setUpdateTitle] = useState("");
  const [UpdateAuthor, setUpdateAuthor] = useState("");
  const [UpdateGenre, setUpdateGenre] = useState("");
  const [UpdateYear, setUpdateYear] = useState("");
  const [UpdateMessage, setUpdateMessage] = useState("");
  const [UpdateIndex, setUpdateIndex] = useState("");

  // Fetch all books on page load
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

  // Autofill edit form when index changes
  useEffect(() => {
    if (UpdateIndex === "") {
      setId();
      setUpdateTitle("");
      setUpdateGenre("");
      setUpdateAuthor("");
      setUpdateYear("");
      return;
    }

    const idx = Number(UpdateIndex) - 1;

    if (!Number.isFinite(idx) || idx < 0 || idx >= books.length) {
      setId(undefined);
      setUpdateMessage("Invalid index: out of range");
      return;
    }

    const book = books[idx];

    if (!book || !book.id) {
      setId(undefined);
      setUpdateMessage("Book not found");
      return;
    }

    setId(book.id);
    setUpdateTitle(book.title);
    setUpdateAuthor(book.author);
    setUpdateGenre(book.genre);
    setUpdateYear(book.year);
    setUpdateMessage("");
  }, [UpdateIndex, books]);

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    if (!id) {
      setUpdateMessage("Invalid index: book ID not found");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/books/${id}`,
        {
          title: UpdateTitle,
          genre: UpdateGenre,
          author: UpdateAuthor,
          year: Number(UpdateYear),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUpdateMessage("Book updated successfully!");
      fetchBooks();

      setUpdateIndex("");
      setUpdateTitle("");
      setUpdateAuthor("");
      setUpdateGenre("");
      setUpdateYear("");

      setTimeout(() => setUpdateMessage(""), 2000);
    } catch (err) {
      console.error("Update error:", err);
      setUpdateMessage("Failed to update");
    }
  };
return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Book
      </h1>

      <form onSubmit={handleUpdateBook} className="space-y-5">

        {/* Index */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book Index
          </label>
          <input
            value={UpdateIndex}
            onChange={(e) => setUpdateIndex(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Book index"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            value={UpdateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Book title"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <input
            value={UpdateGenre}
            onChange={(e) => setUpdateGenre(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Book genre"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            value={UpdateAuthor}
            onChange={(e) => setUpdateAuthor(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Author name"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <input
            value={UpdateYear}
            onChange={(e) => setUpdateYear(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Published year"
          />
        </div>

        {/* Button */}
        <button
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          Update Book
        </button>

        {/* Message */}
        {UpdateMessage && (
          <div
            className={`text-center font-medium ${
              UpdateMessage.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {UpdateMessage}
          </div>
        )}
      </form>
    </div>
    <div className="w-screen flex justify-center mt-1">
    {/* <button className="mt-4 px-6 py-2 bg-gray-500 hover:bg-gray-700 text-gray-800 rounded-lg font-medium transition"> */}
      <Link
              to="/admin/library"
              className="px-4 py-2 rounded-md border border-gray-200 text-sm"
            >
             Back
            </Link>
    {/* </button> */}
    </div>
  </div>
);

}

export default EditBooks;
