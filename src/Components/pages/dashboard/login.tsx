"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post<LoginResponse>("/api/auth/login", {
        username,
        password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      const { token, user } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      queryClient.setQueryData(["user"], user);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#06060f" }}
    >
      {/* Ambient background orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "floatOrb1 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "floatOrb2 10s ease-in-out infinite",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Glow border wrapper */}
        <div className="relative rounded-3xl p-px overflow-hidden">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.2), rgba(124,58,237,0.1))",
            }}
          />
          <div
            className="relative rounded-3xl p-8 sm:p-10"
            style={{ background: "#0a0a18" }}
          >
            {/* Logo / Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(6,182,212,0.8))",
                  }}
                />
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))",
                    border: "1px solid rgba(124,58,237,0.4)",
                  }}
                >
                  <Lock className="w-7 h-7 text-violet-300" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                Welcome{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #7c3aed, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Back
                </span>
              </h2>
              <p className="text-gray-500 text-sm">
                Sign in to your admin dashboard
              </p>
            </div>

            {/* Error */}
            {loginMutation.isError && (
              <div
                className="mb-6 px-4 py-3 rounded-xl text-sm text-red-300 text-center"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  animation: "shake 0.4s ease",
                }}
              >
                {(loginMutation.error as any)?.response?.data?.message ||
                  "Invalid username or password."}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-300 placeholder:text-gray-600"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(124,58,237,0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-300 placeholder:text-gray-600"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(124,58,237,0.5)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 mt-2"
                style={{
                  background: loginMutation.isPending
                    ? "rgba(124,58,237,0.3)"
                    : "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  boxShadow: loginMutation.isPending
                    ? "none"
                    : "0 0 30px rgba(124,58,237,0.35)",
                  cursor: loginMutation.isPending ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loginMutation.isPending)
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(124,58,237,0.55)";
                }}
                onMouseLeave={(e) => {
                  if (!loginMutation.isPending)
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(124,58,237,0.35)";
                }}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Register link */}
            <p className="text-center text-gray-600 text-xs mt-6">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/dashboard/register")}
                className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.05); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.08); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
