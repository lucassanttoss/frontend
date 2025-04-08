"use server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function getProjects() {
  const results = await fetch(`${baseUrl}/api/projects`);
  if (!results.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await results.json();
  return data;
}
