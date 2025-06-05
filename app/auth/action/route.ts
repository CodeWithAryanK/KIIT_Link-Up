import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("mode")
  const oobCode = searchParams.get("oobCode")

  if (mode === "verifyEmail" && oobCode) {
    // Redirect to your verification page
    return NextResponse.redirect(new URL(`/auth/verify?oobCode=${oobCode}`, request.url))
  }

  // Handle other modes (resetPassword, etc.) if needed
  return NextResponse.redirect(new URL("/auth/login", request.url))
}
