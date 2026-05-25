import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaBook,
  FaTrash,
  FaEdit,
  FaPlus,
  FaArrowLeft,
  FaSignOutAlt
} from "react-icons/fa";

import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from "../services/bookService";

function AdminDashboard() {

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [editingId, setEditingId] = useState(null);


  // ================= FETCH BOOKS =================

  useEffect(() => {

    fetchBooks();

  }, []);


const fetchBooks = async () => {

  try {

    const res = await getBooks();

    console.log(res.data);

    setBooks(res.data.books);

  } catch (error) {

    console.log(error);

  }

};


  // ================= ADD BOOK =================

const handleAddBook = async () => {

  try {

    const res = await addBook({
      title,
      author
    });

    setBooks([
      ...books,
      res.data.book
    ]);

    setTitle("");
    setAuthor("");

  } catch(error){

    console.log(error);

    alert("Failed to add book");

  }

};


  // ================= DELETE =================

const handleDeleteBook = async (id) => {

  console.log("DELETE ID:", id);

  try {

    await deleteBook(id);

    fetchBooks();

  } catch (error) {

    console.log(error);

    alert("Delete failed");

  }

};


  // ================= EDIT =================

  const editBook = (book) => {

    setTitle(book.title);

    setAuthor(book.author);

    setEditingId(book._id);

  };


  // ================= UPDATE =================

const handleUpdateBook = async () => {

  try {

    console.log("Updating:", editingId);

    await updateBook(
      editingId,
      {
        title,
        author
      }
    );

    fetchBooks();

    setEditingId(null);

    setTitle("");

    setAuthor("");

  } catch(error){

    console.log(error.response?.data);

    alert("Update failed");

  }

};


  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("admin");

    alert("Logged Out Successfully");

    navigate("/");

  };


  return (

    <div className="min-h-screen bg-white p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-400 p-4 rounded-2xl shadow-md transition duration-300"
          >

            <FaArrowLeft className="text-xl text-slate-800" />

          </button>

          <div>

            <h1 className="text-5xl font-bold text-slate-800">

              Admin Dashboard

            </h1>

            <p className="text-gray-600 mt-2">

              Manage your library books professionally

            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 hover:scale-105 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition duration-300 flex items-center gap-3"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>


      {/* FORM */}

      <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl shadow-lg max-w-2xl mb-12 hover:bg-gray-100 transition duration-300">

        <h2 className="text-3xl font-bold mb-6">

          {
            editingId
              ? "Update Book"
              : "Add New Book"
          }

        </h2>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className="p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {

            editingId ? (

              <button
                onClick={handleUpdateBook}
                className="bg-blue-600 hover:bg-blue-500 hover:scale-105 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg flex items-center justify-center gap-3"
              >

                <FaEdit />

                Update Book

              </button>

            ) : (

              <button
                onClick={handleAddBook}
                className="bg-green-600 hover:bg-green-500 hover:scale-105 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg flex items-center justify-center gap-3"
              >

                <FaPlus />

                Add Book

              </button>

            )

          }

        </div>

      </div>


      {/* BOOK CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {

          books.map((book)=>(

            <div
              key={book._id}
              className="bg- border border-gray-200 p-6 rounded-3xl shadow-lg hover:bg-gray-100 hover:scale-105 hover:-translate-y-2 transition duration-300"
            >

              <div className="bg-gray-100 w-fit p-4 rounded-2xl mb-5">

                <FaBook className="text-3xl text-slate-800" />

              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-3">

                {book.title}

              </h2>

              <p className="text-slate-600 text-lg mb-6">

                Author: {book.author}

              </p>

              <div className="flex gap-4">

                <button
                  onClick={() => editBook(book)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 hover:scale-105 text-white py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2"
                >

                  <FaEdit />

                  Update

                </button>

                <button
             onClick={() => {

  console.log("BOOK OBJECT:", book);

  console.log("BOOK ID:", book._id);

  handleDeleteBook(book._id);

}}
                  className="flex-1 bg-red-600 hover:bg-red-500 hover:scale-105 text-white py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2"
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );
}

export default AdminDashboard;