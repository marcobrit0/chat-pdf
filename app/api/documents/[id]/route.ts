import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * Returns a single document if it belongs to the session user (RLS).
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { data: doc, error } = await supabase
      .from("documents")
      .select("id, title, page_count, created_at")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: "Falha ao carregar documento" }, { status: 500 });
    }
    if (!doc) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ document: doc });
  } catch {
    return NextResponse.json({ error: "Serviço indisponível" }, { status: 503 });
  }
}

/**
 * Deletes a document and cascaded chunks.
 */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (error) {
      console.error("[documents DELETE]", error);
      return NextResponse.json({ error: "Falha ao remover" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Serviço indisponível" }, { status: 503 });
  }
}
