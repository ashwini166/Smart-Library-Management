import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
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

    console.log("Sending:", formData);

    const response = await loginUser(formData);

    console.log("FULL RESPONSE:");

    console.log(response);

    console.log("RESPONSE DATA:");

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    console.log(
      "TOKEN SAVED:",
      localStorage.getItem("token")
    );

    alert("Login Successful");

    navigate("/home");

  } catch(error){

    console.log("LOGIN ERROR:");

    console.log(error);

    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-150 via-slate-200 to-slate-200 flex justify-center items-center px-4">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        {/* Icon */}

        <div className="flex justify-center mb-5">

          <div className="bg-white p-5 rounded-full shadow-lg">

            <FaUser className="text-5xl text-blue-700" />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-Black mb-3">

          User Login

        </h1>

        <p className="text-center text-slate-500 mb-8">

          Login to borrow and manage books

        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
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

          {/* Login Button */}

          <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">

            Login

          </button>

        </form>

        {/* Signup Link */}

        <p className="text-center text-gray mt-6">

          New User?{" "}

          <Link
            to="/register"
            className="text-green-800 hover:text-blue-800 font-semibold"
          >

            Signup Here

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;