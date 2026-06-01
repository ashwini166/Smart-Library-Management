import { Link } from "react-router-dom";

import {
  FaUserShield,
  FaUser,
  FaBookOpen
} from "react-icons/fa";

function LandingPage() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex justify-center items-center px-4">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        {/* Logo */}

        <div className="flex justify-center mb-5">

          <div className="bg-white p-5 rounded-full shadow-lg">

            <FaBookOpen className="text-5xl text-slate-800" />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-white mb-3">

          E Library 

        </h1>

        <p className="text-center text-slate-300 mb-10">

          Manage books, borrow easily and explore knowledge.

        </p>

        {/* ADMIN LOGIN */}

        <Link to="/admin-login">

          <button className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">

            <FaUserShield />

            Admin Login

          </button>

        </Link>

        <br/>

        {/* USER LOGIN */}

        <Link to="/login">

          <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">

            <FaUser />

            User Login

          </button>

        </Link>

        <br/>

        {/* VIEW BOOKS */}

        <Link to="/home">

          <button className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-600 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">

            <FaBookOpen />

            View Books

          </button>

        </Link>

      </div>

    </div>

  );

}

export default LandingPage;