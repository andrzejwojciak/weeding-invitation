import { NextResponse } from "next/server";
import { WeddingConfigService } from "@/lib/services/wedding-config-service";

const configService = WeddingConfigService.getInstance();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "";

function validateAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_SECRET_KEY;
}

export async function GET(request: Request) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = await configService.getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch wedding config:", error);
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = await request.json();
    await configService.updateConfig(config);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update wedding config:", error);
    return NextResponse.json(
      { error: "Failed to update config" },
      { status: 500 },
    );
  }
}
