import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import PublicBooks from "./pages/PublicBooks";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import BorrowedBooks from "./pages/BorrowedBooks";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        
        <Route path="/home" element={<PublicBooks />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/borrowed-books"
          element={<BorrowedBooks />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
  path="/books"
  element={<PublicBooks />}
/>

      </Routes>
      

    </BrowserRouter>
    
  );
}

export default App;