import { NextResponse } from "next/server";
import { captureServerEvent } from "@/lib/posthog-server";
import { createClient } from "@/lib/supabase/server";

/**
 * Completes Supabase magic-link auth and stores the session cookies before entering the app.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = safeNextPath(url.searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const isNewUser =
          !!user.created_at &&
          Date.now() - new Date(user.created_at).getTime() < 60_000;
        await captureServerEvent(user.id, "auth_signed_in", {
          method: "magic_link",
          is_new_user: isNewUser,
          email: user.email ?? undefined,
        });
      }
      return NextResponse.redirect(new URL(nextPath ?? "/app", url.origin));
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth", url.origin));
}

/**
 * Allows only same-origin paths after auth; protocol-relative URLs are rejected.
 */
function safeNextPath(value: string | null): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/app";
}
