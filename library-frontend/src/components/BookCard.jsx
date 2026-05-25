function BookCard({ book }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">

      <h2 className="text-2xl font-bold text-slate-800 mb-3">
        {book.title}
      </h2>

      <p className="text-gray-600 mb-3">
        Author: {book.author}
      </p>

      <p
        className={`font-semibold ${
          book.available
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {
          book.available
            ? "Available"
            : "Borrowed"
        }
      </p>

      <button
        className={`mt-5 px-5 py-2 rounded-lg text-white font-medium ${
          book.available
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-500 hover:bg-gray-600"
        } transition`}
      >
        {
          book.available
            ? "Borrow Book"
            : "Unavailable"
        }
      </button>

    </div>
  );
}

export default BookCard;