import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicBooks from "./pages/PublicBooks";
import Books from "./pages/Books";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import BorrowedBooks from "./pages/BorrowedBooks";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      {/* ONLY ONE TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PublicBooks />} />
        <Route path="/books" element={<Books />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;