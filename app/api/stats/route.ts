import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects, users } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const [[projectCount], [userCount]] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(projects),
      db.select({ count: sql<number>`count(*)` }).from(users),
    ]);

    const recentProjects = await db
      .select({ id: projects.id, title: projects.title, link: projects.link, image: projects.image })
      .from(projects)
      .limit(5);

    return NextResponse.json({
      totalProjects: Number(projectCount.count),
      totalUsers: Number(userCount.count),
      recentProjects,
    });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
