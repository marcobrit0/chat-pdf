import Link from "next/link";

import { MarketingShell } from "@/components/marketing-shell";

const destinations = [
  { href: "/resumir-pdf", label: "Resumir PDF grátis", hint: "Sem cadastro, em segundos" },
  { href: "/chat-pdf", label: "Chat com PDF", hint: "Resposta com a página citada" },
  { href: "/precos", label: "Preços", hint: "Grátis ou Premium R$29/mês" },
  { href: "/chatpdf-vs-chatgpt", label: "PDFIA vs ChatGPT", hint: "Comparação direta, sem floreio" },
  { href: "/analisar-contrato-clt", label: "Contrato CLT", hint: "Salário, jornada, rescisão" },
  { href: "/ler-edital-com-ia", label: "Editais", hint: "Objeto, prazo, penalidade" },
  { href: "/analisar-apolice-de-seguro", label: "Apólice de seguro", hint: "Coberturas e exclusões" },
  { href: "/entender-laudo-medico", label: "Laudo médico", hint: "Termo clínico em PT-BR" },
];

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <p className="font-display text-[clamp(6rem,18vw,12rem)] font-semibold leading-none  text-midnight-ink">
          404
        </p>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3rem)] font-semibold font-display text-midnight-ink">
          Essa página não existe (ou não existe mais).
        </h1>
        <p className="mt-4 max-w-xl text-body  text-charcoal-text sm:text-body-lg">
          Talvez o link mudou, ou o endereço veio com erro. Quem sabe você
          tava procurando uma dessas?
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {destinations.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="block rounded-lg border border-subtle-gray bg-crisp-white p-5 transition-colors hover:border-midnight-ink"
              >
                <p className="font-display text-body-lg font-semibold text-midnight-ink">
                  {d.label}
                </p>
                <p className="mt-1 text-body-sm text-charcoal-text">{d.hint}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
          >
            Voltar pro início
          </Link>
          <Link
            href="/guias"
            className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
          >
            Ver os guias
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
