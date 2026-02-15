import { NextResponse } from "next/server";

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secretKey } = body;

    if (!secretKey || secretKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
