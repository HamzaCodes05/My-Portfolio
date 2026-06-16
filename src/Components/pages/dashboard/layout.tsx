"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  LogOut,
  Home,
  FolderKanban,
  FileText,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";

interface UserType {
  id?: string;
  name: string;
  picture?: string;
  role?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const isAuthPage =
    pathname === "/dashboard/login" || pathname === "/dashboard/register";

  useEffect(() => {
    if (isAuthPage) return;

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null") as UserType | null;
    const role = localStorage.getItem("role") || user?.role;

    if (!token || !user || role !== "admin") {
      router.replace("/dashboard/login");
    } else {
      if (!queryClient.getQueryData(["user"])) {
        queryClient.setQueryData(["user"], user);
      }
      setAuthorized(true);
    }
  }, [router, queryClient, isAuthPage]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.clear();
      queryClient.clear();
    },
    onSuccess: () => {
      router.replace("/dashboard/login");
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Blogs", path: "/dashboard/view", icon: <FileText size={18} /> },
    { name: "Projects", path: "/dashboard/projects/view", icon: <FolderKanban size={18} /> },
  ];

  if (isAuthPage) return <>{children}</>;
  if (!authorized) return null;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-gray-900">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
          Admin Dashboard
        </h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded hover:bg-gray-800"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex min-h-screen">
        <aside
          className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-gray-900 p-6 transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            Admin Dashboard
          </h2>

          <nav className="space-y-3 mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                  ${
                    pathname === link.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={`mt-8 flex items-center gap-2 w-full justify-center py-2 rounded-lg transition-colors
              ${
                logoutMutation.isPending
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            <LogOut size={18} />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}

        <main className="flex-1 p-6 md:p-8 bg-black overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
