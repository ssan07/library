
export default function Books({ books = [], onDelete }) {
  if (!Array.isArray(books) || books.length === 0) return null;

  return (
    <>
      {books.map((book, index) => (
        <tr key={book.id ?? index}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {index+1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {book.title}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {book.genre}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {book.author}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
            {book.year}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
            <button className="px-3 py-1 rounded-md border text-sm">Edit</button>
            <button
              type="button"
              onClick={() => onDelete && onDelete(book.id)}
              className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}