import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

import { FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password
      });

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // OPTIONAL ADMIN FLAG
localStorage.setItem("role", "admin");      // ✅ TOAST SUCCESS
      toast.success("Admin Login Successful ");

      // Redirect
      navigate("/admin");

    } catch (error) {
      console.log(error);

      // ❌ TOAST ERROR
      toast.error(
        error.response?.data?.message || "Login Failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-slate-200 flex justify-center items-center px-4">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-slate-100 p-5 rounded-full shadow-lg">
            <FaUserShield className="text-5xl text-slate-800" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-black mb-3">
          Admin Login
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Secure access for administrators
        </p>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Enter admin email"
            className="p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button className="bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-lg">
            
            Login

          </button>

        </form>

      </div>

    </div>

  );
}

export default AdminLogin;