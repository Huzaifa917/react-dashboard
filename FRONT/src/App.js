import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import FrontPage from "./components/Pages/Front";
import LoginScreen from "./components/Pages/Login";
import Dashboard from "./components/Pages/Dashboard";
import MapContainer from "./components/Pages/Maps";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maps" element={<MapContainer/>} />
        

     

        {/* Add other routes for additional pages if needed */}
      </Routes>
    </Router>
  );
};

export default App;
