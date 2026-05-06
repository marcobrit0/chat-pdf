import { Card } from "@/components/ui/card";
import { Eyebrow, MonoLabel } from "@/components/ui/labels";

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
    <aside className="flex h-full min-h-[320px] flex-col border-t border-subtle-gray pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
      <Eyebrow>Trechos do PDF</Eyebrow>
      <p className="mt-1 text-caption text-faded-stone">
        Estes são os pedaços do documento que a IA usa pra responder. Quando
        você vir [p. 2] na resposta, é daqui que veio.
      </p>
      <ol className="mt-4 flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1 text-body-sm">
        {items.length === 0 ? (
          <li className="text-charcoal-text">Nenhum trecho carregado ainda.</li>
        ) : (
          items.map((c, i) => (
            <Card key={c.id} as="li" variant="compact" className="bg-canvas">
              <MonoLabel className="text-soft-stone">
                {(i + 1).toString().padStart(2, "0")}
              </MonoLabel>{" "}
              <span className="font-display text-body-sm font-semibold text-midnight-ink">
                {c.label}
              </span>
              <p className="mt-2 text-charcoal-text">{c.excerpt}</p>
            </Card>
          ))
        )}
      </ol>
    </aside>
  );
}
