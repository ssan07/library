import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// ======================================
// LOGIN PAGE
// ======================================
export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: user,
        password: password,
      });
      setMessage(response.data?.message ?? "Login successful");
      setTimeout(() => {
        navigate("/library");
      }, 1000);

      console.log(response.data);
      setUser("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        const errMsg = error.response.data?.error || error.response.data?.message || "Login failed";
        setMessage(errMsg);
      } else {
        setMessage("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Login</h1>
        <p className="text-sm text-gray-500 mb-6">Access your library account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              className="mt-1 p-2 h-[40px] w-full rounded-md border-gray-200 shadow-sm"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter username"
               required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1 p-2 h-[40px] w-full rounded-md border-gray-200 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
               required
            />
          </div>

          <button type="submit" className="w-full py-2 rounded-md bg-indigo-600 text-white font-medium">
            Login
          </button>
          <div>{message}</div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </div>
    </div>
  );
}