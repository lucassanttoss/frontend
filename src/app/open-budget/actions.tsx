"use server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function getOpenBudgets(
  projectId?: string,
  search?: string,
  page = 1,
  limit = 8
) {
  const params = new URLSearchParams();
  if (projectId) params.append("projectId", projectId);
  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(
    `${baseUrl}/api/open-budgets?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}
