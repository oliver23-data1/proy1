


import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";

function AppLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar onNavigate={(panel) => navigate(panel === "users" ? "/" : "/items")}/>
      <div className="flex-1 ml-64">
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
