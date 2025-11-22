import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Books from "./Components/Books/Books";
import YearSelect from "./Components/yearselecter/YearSelect";

// Minimal React + Tailwind UI for a Library app.
// No JavaScript logic included — just markup and Tailwind classes.
// You (the user) can add state, handlers and fetch calls where indicated.

export default function LibraryFrontEnd() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [id, setId] = useState(null);

  const filteredBooks=books
  .filter(
    (book) => {
      return (
      (book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
      book.author.toLowerCase().includes(searchBook.toLowerCase())) &&
      ( searchYear === "" || book.year.toString() === searchYear)
    );
  })
.sort((a, b) => {
  const valA = a[filter];
  const valB = b[filter];

  if (typeof valA === "number" && typeof valB === "number") {
    return valA - valB;
  }

  // Otherwise do string compare
  return String(valA).localeCompare(String(valB));
});

  
  // fetch function reused by mount and after add/refresh
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


  // delete handler used by row buttons
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      // optional confirm
      await axios.delete(`http://localhost:8000/books/${id}`);
      await fetchBooks();
    } catch (err) {
      console.error("Delete book error:", err);
      setMessage("Failed to delete book");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Library
            </h1>
            <p className="text-sm text-gray-500">
              Manage books — add, edit, delete.
            </p>
          </div>
          <nav className="space-x-4">
            <Link to="/login" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium">
              Login
            </Link>
            <Link to="/" className="px-4 py-2 rounded-md border border-gray-200 text-sm">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Controls / Add Book Form */}
        {/* <section className="col-span-1 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Add New Book</h2>

          <form onSubmit={handleGetBook} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input name="title" placeholder="Book title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 h-[45px] block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-indigo-500" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input name="author" placeholder="Author name" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 p-2 h-[45px] block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-indigo-500" required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input name="year" placeholder="e.g. 2023" value={year} onChange={(e) => setYear(e.target.value)} className="mt-1 p-2 h-[45px] block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-indigo-500" required/>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium">
                Add Book
              </button>
              <button type="reset" onClick={() => { setTitle(""); setAuthor(""); setYear(""); }} className="px-4 py-2 rounded-md border text-sm">
                Reset
              </button>
            </div>
            <div>{message}</div>


            <p className="text-xs text-gray-400">
              Note: hook up the form submission in React to call your backend.
            </p>
          </form>
        </section> */}

        {/* Right: Book list and search */}
        <section className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <input placeholder="Search by title or author" value={searchBook} onChange={(e) => setSearchBook(e.target.value)} className="w-72 p-2 h-[45px] rounded-md border-gray-200 shadow-sm px-3 py-2"  required/>
                
                {/* Year Select Component */}
                <YearSelect searchYear={searchYear} setSearchYear={setSearchYear} />


              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Total: <strong>{books.length}</strong>
                </span>
                <select className="border px-3 py-2 rounded-md" value={filter} onChange={(e) => setFilter(e.target.value)} >
                  <option value="title">Select filter</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="year">Year</option>
                  <option value="genre">Genre</option>
                </select>
                <button onClick={fetchBooks} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">
                  Refresh
                </button>
              </div>
            </div>

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
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredBooks.length > 0 ? (
                    <Books books={filteredBooks} onDelete={handleDelete}/>
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-400">
                        No books found. Add your first book using the form.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination placeholder */}
            <div className="mt-4 flex items-center justify-end gap-2 text-sm"></div>
          </div>

          {/* Small help / notes */}
          <div className="mt-4 text-xs text-gray-500">
            <p>Notes:</p>
            <ul className="list-disc ml-5">
              <li>Hook the table rows to your API to list books.</li>
              <li>Use the form to POST /books (title, author, year).</li>
              <li>
                Protect actions (edit/delete) with auth when you implement
                backend.
              </li>
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
