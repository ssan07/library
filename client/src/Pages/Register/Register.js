import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// ======================================
// REGISTER PAGE
// ======================================
export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username: name,
        email: email,
        password: password,
      });
      setMsg(response.data?.message ?? "Account created");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(response.data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        const errMsg = error.response.data?.error || error.response.data?.message || "Signup failed";
        setMsg(errMsg);
      } else {
        setMsg("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
        <p className="text-sm text-gray-500 mb-6">Register to manage books</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              className="mt-1 p-2 h-[40px] w-full rounded-md border-gray-200 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Choose username"
               required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 h-[40px] w-full rounded-md border-gray-200 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
               required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              className="mt-1 h-[40px] w-full rounded-md border-gray-200 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
               required
            />
          </div>

          <button type="submit" className="w-full py-2 rounded-md bg-green-600 text-white font-medium">
            Register
          </button>
          <div>{msg}</div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}