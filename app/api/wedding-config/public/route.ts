import { NextResponse } from "next/server";
import { WeddingConfigService } from "@/lib/services/wedding-config-service";

const configService = WeddingConfigService.getInstance();

export async function GET() {
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
