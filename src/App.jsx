


import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import Login from "./Login";

function AppLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex">
      <Sidebar onNavigate={(panel) => navigate(panel === "users" ? "/" : "/items")}/>
      <div className="flex-1 ml-64 relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-8 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition z-20"
        >
          Cerrar sesión
        </button>
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
