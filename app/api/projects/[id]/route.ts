import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import path from "path";
import fs from "fs/promises";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;
    const imageFile = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;

    if (!title || !link) {
      return NextResponse.json({ error: "Title and link are required" }, { status: 400 });
    }

    const updateData: { title: string; link: string; image?: string } = { title, link };

    if (imageUrl && imageUrl.startsWith("http")) {
      updateData.image = imageUrl;
    } else if (imageFile && imageFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "_")}`;
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(path.join(uploadsDir, filename), buffer);
      updateData.image = `/uploads/${filename}`;
    }

    await db.update(projects).set(updateData).where(eq(projects.id, id));
    return NextResponse.json({ message: "Project updated" });
  } catch (err) {
    console.error("PUT /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ message: "Project deleted" });
  } catch (err) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
