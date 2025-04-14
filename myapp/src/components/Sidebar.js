import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faFilter, faCog } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css"; // Custom styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <FontAwesomeIcon icon={faChartBar} /> Analytics
        </li>
        <li>
          <FontAwesomeIcon icon={faFilter} /> Filters
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
