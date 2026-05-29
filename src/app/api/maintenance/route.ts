import { NextResponse } from "next/server";
import { getMaintenanceMode } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const maintenance = await getMaintenanceMode();
    return NextResponse.json({ maintenance });
  } catch {
    return NextResponse.json({ maintenance: false });
  }
}
