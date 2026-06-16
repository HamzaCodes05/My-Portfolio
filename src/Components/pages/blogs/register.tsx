"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", {
        username,
        password,
        role,
        picture: picture || null,
      });

      if (res.status === 201) {
        alert("✅ Registration successful! Please log in.");
        router.push("/dashboard/login");
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          Create Account
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Register a new admin user
        </p>

        {error && (
          <p className="text-red-400 bg-red-950 border border-red-800 rounded-md p-2 text-center mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Username — maps to users.username */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
            required
          />
        </div>

        {/* Password — maps to users.password */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Role — maps to users.role (default: admin) */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Picture — maps to users.picture (optional) */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-1">
            Profile Picture URL{" "}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="url"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/dashboard/login")}
            className="text-blue-400 hover:text-blue-500"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
