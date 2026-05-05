"use client";

import Link from "next/link";

/**
 * Limite de erro da árvore `app/`: não exibir mensagens técnicas vindas do servidor.
 */
export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col px-4 py-24 text-center">
      <h1 className="font-display text-heading font-semibold text-midnight-ink">Algo deu errado</h1>
      <p className="mt-3 text-charcoal-text">
        Não foi possível carregar esta página. Você pode tentar novamente ou voltar ao início.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-apollo-gold px-5 py-3 text-body-sm font-medium text-midnight-ink"
        >
          Tentar de novo
        </button>
        <Link
          href="/"
          className="rounded-lg border border-midnight-ink px-5 py-3 text-body-sm font-medium text-midnight-ink"
        >
          Ir ao início
        </Link>
      </div>
    </div>
  );
}
