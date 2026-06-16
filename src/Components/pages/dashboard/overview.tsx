"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FolderKanban, Users, Plus, Eye } from "lucide-react";

interface Stats {
  totalProjects: number;
  totalUsers: number;
  recentProjects: { id: number; title: string; link: string; image?: string | null }[];
}

function useStats() {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axios.get("/api/stats");
      return res.data;
    },
  });
}

export default function DashboardOverview() {
  const router = useRouter();
  const { data, isLoading, isError } = useStats();

  const cards = [
    {
      label: "Total Projects",
      value: data?.totalProjects ?? 0,
      icon: <FolderKanban className="w-6 h-6 text-green-400" />,
      bg: "bg-green-950 border-green-800",
      action: () => router.push("/dashboard/projects/view"),
    },
    {
      label: "Total Users",
      value: data?.totalUsers ?? 0,
      icon: <Users className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-950 border-purple-800",
      action: undefined,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back, Admin</p>
      </div>

      {isLoading && (
        <p className="text-gray-400 text-center py-10">Loading stats...</p>
      )}
      {isError && (
        <p className="text-red-500 text-center py-10">Failed to load dashboard data.</p>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {cards.map((card) => (
              <div
                key={card.label}
                onClick={card.action}
                className={`border rounded-xl p-6 flex items-center gap-4 ${card.bg} ${card.action ? "cursor-pointer hover:opacity-90 transition" : ""}`}
              >
                <div className="bg-black/30 p-3 rounded-lg">{card.icon}</div>
                <div>
                  <p className="text-gray-400 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold text-white">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <button
              onClick={() => router.push("/dashboard/projects/add")}
              className="flex items-center gap-3 bg-gray-900 border border-gray-700 hover:border-green-600 px-5 py-4 rounded-xl transition"
            >
              <Plus className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Add New Project</span>
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
              <button
                onClick={() => router.push("/dashboard/projects/view")}
                className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> View all
              </button>
            </div>
            {data.recentProjects.length === 0 ? (
              <p className="text-gray-500 text-sm">No projects yet.</p>
            ) : (
              <ul className="space-y-3">
                {data.recentProjects.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-3 border-b border-gray-800 pb-2 last:border-0"
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-md border border-gray-700 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-800 rounded-md flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{p.title}</p>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-xs hover:text-green-400 truncate block"
                      >
                        {p.link}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
