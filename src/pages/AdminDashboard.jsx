import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
toast
}
from
"react-toastify";
import {
getDashboard
}
from
"../services/bookService";

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
  const [totalCopies, setTotalCopies] = useState("");
const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);
const [dashboard,setDashboard] = useState([]);

  // ================= FETCH BOOKS =================

useEffect(() => {
  fetchBooks();
  fetchDashboard();

  const interval = setInterval(() => {
    fetchBooks();
    fetchDashboard();
  }, 10000);

  return () => clearInterval(interval);
}, []);


const fetchBooks = async () => {
  try {
    const res = await getBooks();

    console.log("BOOKS FROM SERVER:", res.data.books);

    setBooks(res.data.books || []);
  } catch (error) {
    console.log(error);
  }
};

const fetchDashboard =
async()=>{

try{

const res =
await getDashboard();
setDashboard(res.data?.dashboard || []);

}catch(error){

console.log(error);

}

};

  // ================= ADD BOOK =================
const handleAddBook = async () => {
  try {
    if (!title || !author || !quantity) {
      toast.error("All fields are required");
      return;
    }

    const res = await addBook({
      title: title.trim(),
      author: author.trim(),
      totalCopies: Number(quantity)
    });

    fetchBooks();

    setTitle("");
    setAuthor("");
    setQuantity("");

    toast.success("Book added successfully");
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Failed to add book"
    );
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

    toast.error("Failed to delete book");

  }

};


  // ================= EDIT =================

  const editBook = (book) => {

    setTitle(book.title);

    setAuthor(book.author);

setQuantity(book.totalCopies);
    setEditingId(book._id);

  };


  // ================= UPDATE =================

const handleUpdateBook = async () => {
  try {
    await updateBook(editingId, {
      title,
      author,
  totalCopies: Number(quantity)
    });
    fetchBooks();

    toast.success("Book updated successfully");


    setEditingId(null);
    setTitle("");
    setAuthor("");
    setQuantity("");

  } catch (error) {
    console.log(error.response?.data);
    toast.error("Failed to update book");
  }
};

  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("admin");

    toast.success("Logged Out Successfully");

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

<input
  type="number"
  placeholder="Enter total copies"
  value={quantity}
  onChange={(e)=>setQuantity(e.target.value)}
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
                <br/>

<p className="text-slate-600">
  Total Copies: {book.totalCopies}
</p>

<p className="text-green-700 font-semibold">
  Available: {book.availableCopies}
</p>
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


{/* DASHBOARD ANALYTICS */}

<div className="mt-10">

  <h2 className="text-3xl font-bold">

    Borrow Analytics

  </h2>

  {

    dashboard.map((item)=>(

      <div
        key={item.title}
        className="border p-5 rounded-xl mt-4 bg-gray-50"
      >

        <h3 className="text-xl font-bold">

          {item.title}

        </h3>

        <p className="mt-2">

          Borrowed: {item.borrowCount}

        </p>

        <p className="mt-2">

          Users:

          {

            item.borrowers.join(", ")

          }

        </p>

      </div>

    ))

  }

</div>

</div>

);
}

export default AdminDashboard;