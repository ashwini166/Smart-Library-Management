import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-slate-900 text-white px-8 py-4 flex gap-8 shadow-md">

      <Link
        to="/"
        className="hover:text-blue-400 transition"
      >
        Home
      </Link>

      <Link
        to="/login"
        className="hover:text-blue-400 transition"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="hover:text-blue-400 transition"
      >
        Register
      </Link>

      <Link
        to="/admin"
        className="hover:text-blue-400 transition"
      >
        Admin
      </Link>

      <Link
        to="/borrowed-books"
        className="hover:text-blue-400 transition"
      >
        Borrowed Books
      </Link>

    </div>
  );
}

export default Navbar;