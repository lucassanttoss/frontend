import { NextResponse } from "next/server";
import { serverData } from "@lib/data";

export async function GET() {
  return NextResponse.json(serverData.projects);
}
