import React, { useEffect, useState } from "react";

const BorrowedBooks = () => {

  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBorrowedBooks = async () => {

    try {

      const res = await fetch(
        "http://localhost:8080/api/books"
      );

      const data = await res.json();

      // FILTER only borrowed by logged-in user
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const myBooks = data.filter(
        (book) =>
          book.borrowedBy === user?._id
      );

      setBooks(myBooks);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchBorrowedBooks();
  }, []);


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

      fetchBorrowedBooks();

    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Borrowed Books
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {books.map((book) => (

          <div
            key={book._id}
            className="bg-white p-6 shadow rounded-xl"
          >

            <h2 className="text-xl font-bold">
              {book.title}
            </h2>

            <p>Author: {book.author}</p>

            <p>Status: Borrowed</p>

            <button
              onClick={() => returnBook(book._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Return Book
            </button>

          </div>

        ))}

      </div>

    </div>

  );
};

export default BorrowedBooks;