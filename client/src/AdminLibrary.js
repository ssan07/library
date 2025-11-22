import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Books from "./Components/Books/Books";
import YearSelect from "./Components/yearselecter/YearSelect";

export default function LibraryFrontEnd() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [filter, setFilter] = useState("");

  const filteredBooks = books
    .filter((book) => {
      return (
        (book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
          book.author.toLowerCase().includes(searchBook.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchBook.toLowerCase()) ||
          book.year.toString().includes(searchBook)
        ) &&
        (searchYear === "" || book.year.toString() === searchYear)
      );
    })
    .sort((a, b) => {
      const valA = a[filter];
      const valB = b[filter];

      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }
      return String(valA).localeCompare(String(valB));
    });

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/books/");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBooks();
    } catch (err) {
      console.error("Delete book error:", err);
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Library</h1>
            <p className="text-sm text-gray-500">
              Manage books — search, filter, delete.
            </p>
          </div>
          <nav className="space-x-4">
            <Link
              to="/admin/addbook"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium"
            >
              Add Book
            </Link>
            <Link
              to="/admin/editbook"
              className="px-4 py-2 rounded-md border border-gray-200 text-sm"
            >
              Edit Book
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION REMOVED — NO ADD/EDIT FORMS */}

        {/* Right: Book list and search */}
        <section className="lg:col-span-3">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              {/* Search */}
              <div className="flex items-center gap-3">
                <input
                  placeholder="Search by title or author"
                  value={searchBook}
                  onChange={(e) => setSearchBook(e.target.value)}
                  className="w-72 p-2 h-[45px] rounded-md border-gray-200 shadow-sm px-3"
                />

                {/* Year Select */}
                <YearSelect
                  searchYear={searchYear}
                  setSearchYear={setSearchYear}
                />
              </div>

              {/* Filter + Refresh */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Total: <strong>{books.length}</strong>
                </span>

                <select
                  className="border px-3 py-2 rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">Select filter</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="year">Year</option>
                  <option value="genre">Genre</option>
                </select>

                <button
                  onClick={fetchBooks}
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="max-h-[60vh] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Genre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredBooks.length > 0 ? (
                    <Books books={filteredBooks} onDelete={handleDelete} Display="true" />
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-sm text-gray-400"
                      >
                        No books found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-4 text-xs text-gray-500">
            <p>Notes:</p>
            <ul className="list-disc ml-5">
              <li>Search books by title or author.</li>
              <li>Filter books by year or sort by any field.</li>
              <li>Delete books from the table.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} My Library
      </footer>
    </div>
  );
}
