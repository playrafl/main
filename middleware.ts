import { NextRequest, NextResponse } from "next/server";

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  const headerOrigin = request.headers.get("origin");
  const referrer = request.headers.get("referer");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const origin = headerOrigin || referrer || forwardedHost || "";

  const isAllowedOrigin = origin.includes(String(process.env.NEXT_ORIGIN_URL));

  const isPreflight = request.method === "OPTIONS";
  if (!isAllowedOrigin)
    return NextResponse.json(
      { error: "CORS Error" },
      {
        status: 401,
      }
    );

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
