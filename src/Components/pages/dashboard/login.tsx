"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    role: string;
    picture?: string;
  };
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post<LoginResponse>(
        "/api/auth/login",
        { username, password }
      );
      return res.data;
    },
    onSuccess: (data) => {
      const { token, user } = data;

      // Save to localStorage — matches users schema fields
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      queryClient.setQueryData(["user"], user);
      router.push("/dashboard/view");
    },
    onError: (error: any) => {
      console.error("❌ Login error:", error);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Sign in to your admin account
        </p>

        {loginMutation.isError && (
          <p className="text-red-400 bg-red-950 border border-red-800 rounded-md p-2 text-center mb-4 text-sm">
            {(loginMutation.error as any)?.response?.data?.message ||
              "Invalid username or password."}
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
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password — maps to users.password */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className={`w-full py-2 rounded-md font-semibold transition ${
            loginMutation.isPending
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loginMutation.isPending ? "Signing in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/dashboard/register")}
            className="text-blue-400 hover:text-blue-500"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
