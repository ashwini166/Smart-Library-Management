import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaUserPlus,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(formData);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-slate-100 to-slate-100 flex justify-center items-center px-4">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        {/* Icon */}

        <div className="flex justify-center mb-5">

          <div className="bg-white p-5 rounded-full shadow-lg">

            <FaUserPlus className="text-5xl text-green-700" />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-green-700 mb-3">

          Create Account

        </h1>

        <p className="text-center text-gray-400 mb-8">

          Register to borrow and manage books

        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* Full Name */}

          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            className="p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          {/* Password */}

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter password"
              className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleChange}
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-gray-600"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* Register Button */}

          <button className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">

            Register

          </button>

        </form>

        {/* Login Link */}

        <p className="text-center text-gray-600 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >

            Login Here

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;