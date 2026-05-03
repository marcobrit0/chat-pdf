import Link from "next/link";

import { MarketingShell } from "@/components/marketing-shell";

const destinations = [
  { href: "/resumir-pdf", label: "Resumir PDF grátis", hint: "Comece sem cadastro" },
  { href: "/chat-pdf", label: "Chat com PDF", hint: "Respostas com citação de página" },
  { href: "/precos", label: "Preços", hint: "Gratuito ou Premium R$29/mês" },
  { href: "/chatpdf-vs-chatgpt", label: "PDFIA vs ChatGPT", hint: "Comparação direta" },
  { href: "/analisar-contrato-clt", label: "Contrato CLT", hint: "Salário, jornada, rescisão" },
  { href: "/ler-edital-com-ia", label: "Editais", hint: "Objeto, prazos, penalidades" },
  { href: "/analisar-apolice-de-seguro", label: "Apólice de seguro", hint: "Coberturas e exclusões" },
  { href: "/entender-laudo-medico", label: "Laudo médico", hint: "Termos clínicos em PT-BR" },
];

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <p className="font-display text-[clamp(6rem,18vw,12rem)] font-semibold leading-none tracking-tight text-midnight-ink">
          404
        </p>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-midnight-ink">
          Não encontramos esta página.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-text sm:text-lg">
          O link pode ter sido movido ou o endereço digitado está incorreto.
          Talvez você esteja procurando uma destas:
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {destinations.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="block rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-5 transition-colors hover:border-midnight-ink"
              >
                <p className="font-display text-lg font-semibold text-midnight-ink">
                  {d.label}
                </p>
                <p className="mt-1 text-sm text-charcoal-text">{d.hint}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
          >
            Voltar à página inicial
          </Link>
          <Link
            href="/guias"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink"
          >
            Explorar guias
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
