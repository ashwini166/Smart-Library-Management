import { FaBook } from "react-icons/fa";
import { useEffect, useState } from "react";

function PublicBooks() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH BOOKS =================
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/books");
      const data = await res.json();

      console.log("API RESPONSE:", data);

      setBooks(data.books); // IMPORTANT FIX
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ================= BORROW BOOK =================
  const borrowBook = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/books/borrow/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      alert(data.message);

      fetchBooks(); // refresh UI
    } catch (error) {
      console.log(error);
    }
  };

  // ================= RETURN BOOK =================
  const returnBook = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/books/return/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      alert(data.message);

      fetchBooks(); // refresh UI
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-slate-800">
          Library Books
        </h1>
        <p className="text-gray-600 mt-2">
          Public users can explore available books
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white border border-gray-200 p-6 rounded-3xl shadow-lg hover:bg-gray-100 transition duration-300"
          >
            {/* Icon */}
            <div className="bg-gray-100 w-fit p-4 rounded-2xl mb-5">
              <FaBook className="text-3xl text-slate-800" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              {book.title}
            </h2>

            {/* Author */}
            <p className="text-slate-600 text-lg">
              Author: {book.author}
            </p>

            {/* Status */}
            <p className="text-slate-600 text-lg mt-2">
              Status: {book.available ? "Available" : "Borrowed"}
            </p>

            {/* BUTTONS (ONLY IF LOGGED IN) */}
            {token ? (
              <div className="mt-5">
                {book.available ? (
                  <button
                    onClick={() => borrowBook(book._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                  >
                    Borrow Book
                  </button>
                ) : (
                  <button
                    onClick={() => returnBook(book._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    Return Book
                  </button>
                )}
              </div>
            ) : (
              <p className="text-red-500 mt-3">
                Login to borrow or return books
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicBooks;