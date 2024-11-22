import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import './App.css';

const App = () => (
  <Router>
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link> | <Link to="/chat" className="navbar-link">Chat</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </Router>
);

export default App;
