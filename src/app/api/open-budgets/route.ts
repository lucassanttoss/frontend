import { NextResponse } from "next/server";
import { serverData } from "@lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  const search = searchParams.get("search")?.toLowerCase();
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  let data = serverData["open-budgets"];

  if (projectId) {
    data = data.filter((item) => item.projectId === Number(projectId));
  }

  if (search) {
    data = data.filter(
      (item) =>
        item.code.toLowerCase().includes(search) ||
        item.typeAction.toLowerCase().includes(search) ||
        item.createdBy.toLowerCase().includes(search)
    );
  }

  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  return NextResponse.json({
    total: data.length,
    page,
    limit,
    results: paginated,
  });
}
