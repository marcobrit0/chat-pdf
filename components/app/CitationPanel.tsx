/**
 * Phase 4 placeholder: lists indexed chunks so users see what the model can cite.
 * Later phases can highlight spans matched from the assistant reply.
 */

export type CitationRef = {
  id: string;
  label: string;
  excerpt: string;
};

type Props = {
  items: CitationRef[];
};

export function CitationPanel({ items }: Props) {
  return (
    <aside className="flex h-full min-h-[320px] flex-col border-l border-subtle-gray bg-surface-primary-card pl-4 md:pl-6">
      <h2 className="eyebrow text-faded-stone">Trechos indexados</h2>
      <p className="mt-1 text-caption text-faded-stone">
        O chat usa estes blocos (com rótulo de página). Citações no estilo [p. 2]
        referem-se a eles.
      </p>
      <ol className="mt-4 flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1 text-body-sm">
        {items.length === 0 ? (
          <li className="text-charcoal-text">Nenhum trecho carregado.</li>
        ) : (
          items.map((c, i) => (
            <li
              key={c.id}
              className="rounded-md border border-subtle-gray bg-canvas p-card-compact"
            >
              <span className="font-mono text-caption text-soft-stone">
                {(i + 1).toString().padStart(2, "0")}
              </span>{" "}
              <span className="font-medium text-midnight-ink">{c.label}</span>
              <p className="mt-2 text-charcoal-text">{c.excerpt}</p>
            </li>
          ))
        )}
      </ol>
    </aside>
  );
}
