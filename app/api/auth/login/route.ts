import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { signToken } from "@/lib/jwt";
import type { LoginBody, LoginResponse } from "../types";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = (await req.json()) as LoginBody;

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.username, username));

    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const token = signToken({ id: user.id, username: user.username, role: user.role });

    const response: LoginResponse = {
      token,
      user: { id: user.id, name: user.username, role: user.role, picture: user.picture },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
