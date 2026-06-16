import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import type { ProjectRow } from "./types";

export async function GET() {
  try {
    const rows = await db.select().from(projects);
    const data: ProjectRow[] = rows.map((r) => ({
      id: r.id,
      title: r.title,
      link: r.link,
      image: r.image,
    }));
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !link) {
      return NextResponse.json({ error: "Title and link are required" }, { status: 400 });
    }

    let imagePath: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "_")}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(path.join(uploadsDir, filename), buffer);
      imagePath = `/uploads/${filename}`;
    }

    await db.insert(projects).values({ title, link, image: imagePath });

    return NextResponse.json({ message: "Project created" }, { status: 201 });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
