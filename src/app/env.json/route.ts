export const dynamic = "force-dynamic";

export const GET = () =>
  Response.json(
    { API_URL: process.env.APP_API_URL || "/api" },
    { headers: { "Cache-Control": "no-store" } },
  );
