import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import DashboardContent from "./components/DashboardContent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom styles

const App = () => {
  return (
    <div className="dashboard-container">
    <aside className="sidebar">
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Insights</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
    <main className="content">
      <DashboardContent />
    </main>
  </div>
  );
};

export default App;
