import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

// Import the components
import AddCase from './pages/AddCase';
import MyCases from './pages/MyCases';
import AllCases from './pages/AllCases';
import Helper from './pages/Helper';
import Logout from './pages/Logout';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <Router>
      <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>{sidebarOpen ? "<" : ">" }</button>

        {/* Modify the sidebar div to include the open class when sidebarOpen is true */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav>
            <Link to="/add-case" className="sidebar-item">
              Add Case
            </Link>
            <Link to="/my-cases" className="sidebar-item">
              My Cases
            </Link>
            <Link to="/all-cases" className="sidebar-item">
              All Cases
            </Link>
            <Link to="/helper" className="sidebar-item">
              Helper
            </Link>
            <Link to="/logout" className="sidebar-item">
              Log Out
            </Link>
          </nav>
        </div>

        <Routes>
          <Route path="/add-case" element={<AddCase />} />
          <Route path="/my-cases" element={<MyCases />} />
          <Route path="/all-cases" element={<AllCases />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;