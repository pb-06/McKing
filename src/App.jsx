import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Rendeles from "./pages/Rendeles";
import Dashboard from "./pages/Dashboard";
import NavbarMenu from "./components/NavbarMenu";
import ProtectedRoute from "./components/ProtectedRoute";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="container text-center mt-5"><h3>Betöltés...</h3></div>;
  }

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <NavbarMenu loggedIn={loggedIn} onLogout={handleLogout} />
      <div style={{ paddingTop: '60px' }}> {/* Navbar miatt paddingTop */}
        <Routes>
          <Route path="/rendeles" element={<Rendeles />} />
          <Route path="/login" element={!loggedIn ? <Login /> : <Navigate to="/dashboard" />} />

          <Route path="/" element={<Navigate to="/rendeles" />} />

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/rendeles" />} />
        </Routes>
      </div>
    </Router>
  );
}