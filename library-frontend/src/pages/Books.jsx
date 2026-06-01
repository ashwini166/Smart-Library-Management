import { FaBook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { getBooks } from "../services/bookService";

function Books() {
  const [books, setBooks] = useState([]);

  // ================= FETCH BOOKS =================
  const fetchBooks = async () => {
    try {
      const res = await getBooks();

      setBooks(res.data?.books || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load books ❌");
    }
  };

  useEffect(() => {
    fetchBooks();

    // 🔥 AUTO REFRESH EVERY 10 SEC
    const interval = setInterval(() => {
      fetchBooks();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ================= BORROW BOOK =================
  const handleBorrow = async (bookId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to borrow books ❌");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/books/borrow/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book borrowed successfully 📚");

      // 🔥 REFRESH UI
      await fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Borrow failed ❌"
      );
    }
  };

  // ================= RETURN BOOK =================
  const handleReturn = async (bookId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to return books ❌");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/books/return/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book returned successfully 📕");

      // 🔥 REFRESH UI
      await fetchBooks();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Return failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">

      <h1 className="text-5xl font-bold text-slate-800">
        Available Library Books 📚
      </h1>

      <p className="text-gray-600 mt-2">
        Explore our collection and borrow your next read
      </p>

      <br />
      <br />

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {books.map((book) => (
          <div
            key={book._id}
            className="border p-6 rounded-3xl shadow-lg"
          >

            <div className="bg-gray-100 w-fit p-4 rounded-2xl mb-5">
              <FaBook className="text-3xl" />
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              {book.title}
            </h2>

            <p className="text-slate-600 text-lg">
              Author: {book.author}
            </p>

 <p className="text-green-600 font-semibold mt-2">
  Available Copies: {book.availableCopies}
</p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-5">

              <button
                onClick={() => handleBorrow(book._id)}
                disabled={book.availableCopies <= 0}
                className={`px-4 py-2 rounded-xl text-white ${
                  book.availableCopies <= 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600"
                }`}
              >
                Borrow
              </button>

              <button
                onClick={() => handleReturn(book._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Return
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Books;