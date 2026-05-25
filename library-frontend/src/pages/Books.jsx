import React, { useEffect, useState } from "react";

const Books = () => {

  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");


const fetchBooks = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/books");

    const data = await res.json();

    setBooks(data.books); // ✅ IMPORTANT FIX

  } catch (error) {
    console.log(error);
  }
};

  const borrowBook = async (id) => {

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

    fetchBooks();
  };


  const returnBook = async (id) => {

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

    fetchBooks();
  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        All Books
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {books.map((book) => (

          <div
            key={book._id}
            className="bg-white p-6 shadow rounded-xl"
          >

            <h2>{book.title}</h2>

            <p>{book.author}</p>

            <p>
              {book.available
                ? "Available"
                : "Borrowed"}
            </p>

            {token && (

              book.available ? (

                <button
                  onClick={() => borrowBook(book._id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Borrow
                </button>

              ) : (

                <button
                  onClick={() => returnBook(book._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Return
                </button>

              )

            )}

          </div>

        ))}

      </div>

    </div>

  );
};

export default Books;