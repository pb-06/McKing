import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Rendeles from "./pages/Rendeles";
import Dashboard from "./pages/Dashboard";
import NavbarMenu from "./components/NavbarMenu";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

export default function App() {
  return (
    <Router>
      <NavbarMenu />
      <div style={{ paddingTop: '60px' }}> {/* Navbar miatt paddingTop */}
        <Routes>
          <Route path="/rendeles" element={<Rendeles />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<Navigate to="/rendeles" />} />
          <Route path="*" element={<Navigate to="/rendeles" />} />
        </Routes>
      </div>
    </Router>
  );
}