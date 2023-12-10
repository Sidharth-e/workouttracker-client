import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./pages/Main/index";
import Signup from "./pages/Singup/index";
import Login from "./pages/Login/index";
import Admin from "./pages/Admin/admin";
import jwt_decode from "jwt-decode";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Always show the Signup and Login routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect to /login if the user is not logged in */}
        {!user && <Route path="/" element={<Navigate to="/login" replace />} />}

        {user && isAdmin(user) ? (
          <Route path="/" element={<Admin />} />
        ) : (
          <Route path="/" element={<Main />} />
        )}
      </Routes>
    </Router>
  );
}

function isAdmin(user) {
  const decodedToken = jwt_decode(user);
  const role = decodedToken.role;

  return role;
}

export default App;
