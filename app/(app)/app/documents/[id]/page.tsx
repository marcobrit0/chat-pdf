import Link from "next/link";
import { DocumentWorkspace } from "@/components/app/DocumentWorkspace";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DocumentWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <p className="text-charcoal-text">
        Defina as variáveis públicas do Supabase pra carregar o workspace.
      </p>
    );
  }

  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const gate = await requirePremiumAccess(supabase, user.id);
  if (!gate.ok) {
    return (
      <div className="space-y-4">
        <p className="text-charcoal-text">{gate.reason}</p>
        <Link href="/precos" className="text-midnight-ink underline">
          Ver o Premium
        </Link>
      </div>
    );
  }

  const { data: doc, error } = await supabase
    .from("documents")
    .select("id, title, page_count")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return <p className="text-charcoal-text">Não rolou carregar esse PDF. Tenta de novo em um minuto.</p>;
  }
  if (!doc) {
    return (
      <div className="space-y-4">
        <p className="text-charcoal-text">Esse PDF não existe ou foi removido.</p>
        <Link href="/app" className="underline">
          ← Voltar pra biblioteca
        </Link>
      </div>
    );
  }

  const { data: chunks } = await supabase
    .from("document_chunks")
    .select("id, page_start, page_end, content")
    .eq("document_id", id)
    .order("chunk_index", { ascending: true });

  const citationRefs = (chunks ?? []).map((c) => ({
    id: c.id,
    label:
      c.page_start === c.page_end
        ? `p. ${c.page_start}`
        : `p. ${c.page_start}–${c.page_end}`,
    excerpt:
      c.content.length > 280 ? `${c.content.slice(0, 280)}…` : c.content,
  }));

  return (
    <DocumentWorkspace
      documentId={doc.id}
      title={doc.title ?? "PDF sem título"}
      pageCount={doc.page_count}
      citationRefs={citationRefs}
    />
  );
}
