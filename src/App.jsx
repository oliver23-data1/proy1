

import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ItemsDashboard from "./ItemsDashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [panel, setPanel] = useState("users");

  return (
    <div className="flex">
      <Sidebar onNavigate={setPanel} />
      <div className="flex-1 ml-64">
        {panel === "users" ? <Dashboard /> : <ItemsDashboard />}
      </div>
    </div>
  );
}

export default App;
