import { NextResponse } from "next/server";

function plansUpstreamBase(): string {
  const explicit = process.env.LANDING_PLANS_UPSTREAM_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  // Local landing dev should hit the local app API, not production (avoids CORS + undeployed routes).
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:3000";
  }

  const app = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (app) return app.replace(/\/$/, "");

  return "https://app.tryidentiq.com";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const upstream = `${plansUpstreamBase()}/api/billing/plans/public?${searchParams.toString()}`;

  try {
    const res = await fetch(upstream, { cache: "no-store" });
    const body = await res.text();

    if (!res.ok) {
      console.error("[landing] plans upstream error", res.status, upstream);
      return NextResponse.json(
        {
          error: "Could not load plans from the app API.",
          upstream,
          status: res.status,
        },
        { status: res.status === 404 ? 502 : res.status },
      );
    }

    return new NextResponse(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[landing] plans upstream fetch failed:", upstream, error);
    return NextResponse.json(
      {
        error:
          "Could not reach the app API. For local dev, run the main app on port 3000 and set NEXT_PUBLIC_APP_URL=http://localhost:3000 in identiq-landing/.env.local.",
        upstream,
      },
      { status: 503 },
    );
  }
}
