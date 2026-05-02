import "server-only";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export type DocumentChunkInsert = {
  chunkIndex: number;
  pageStart: number;
  pageEnd: number;
  content: string;
};

export type StoredDocument = {
  id: string;
  title: string;
  pageCount: number;
  chunkCount: number;
};

/**
 * Persists Premium documents after route-level auth, entitlement, and upload checks pass.
 * This uses the service role because public RLS intentionally blocks direct paid-table writes.
 */
export async function createPremiumDocumentWithChunks(options: {
  userId: string;
  title: string;
  pageCount: number;
  chunks: DocumentChunkInsert[];
}): Promise<StoredDocument> {
  const admin = createServiceRoleClient();

  const { data: doc, error: docErr } = await admin
    .from("documents")
    .insert({
      user_id: options.userId,
      title: options.title,
      storage_path: null,
      page_count: options.pageCount,
    })
    .select("id")
    .single();

  if (docErr || !doc) {
    throw new Error("Não foi possível salvar o documento.");
  }

  const rows = options.chunks.map((c) => ({
    document_id: doc.id,
    chunk_index: c.chunkIndex,
    page_start: c.pageStart,
    page_end: c.pageEnd,
    content: c.content,
  }));

  const { error: chunkErr } = await admin.from("document_chunks").insert(rows);
  if (chunkErr) {
    // Roll back the parent so failed indexing never leaves orphaned workspace entries.
    await admin.from("documents").delete().eq("id", doc.id);
    throw new Error("Falha ao indexar o texto do PDF.");
  }

  return {
    id: doc.id as string,
    title: options.title,
    pageCount: options.pageCount,
    chunkCount: rows.length,
  };
}
