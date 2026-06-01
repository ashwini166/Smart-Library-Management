import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  // FETCH ONLY USER'S BORROWED BOOKS (FIXED BACKEND API)
  const fetchBorrowedBooks = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/books/my-books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to load borrowed books ❌");
        return;
      }

      setBooks(data.books || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load borrowed books ❌");
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  // RETURN BOOK
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

      if (!res.ok) {
        toast.error(data.message || "Return failed ❌");
        return;
      }

      toast.success(data.message || "Book returned successfully 📕");

      // refresh list
      fetchBorrowedBooks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Borrowed Books 📚
      </h1>

      {books.length === 0 ? (
        <p className="text-gray-500">
          No borrowed books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-6 shadow rounded-xl border"
            >

              <h2 className="text-xl font-bold">
                {book.title}
              </h2>

              <p className="text-gray-600">
                Author: {book.author}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                Status: Borrowed
              </p>

              <button
                onClick={() => returnBook(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Return Book
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;