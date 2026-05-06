import { absoluteUrl, getSiteUrl } from "@/lib/seo";

type JsonLdProps = { data: Record<string, unknown> | Array<Record<string, unknown>> };

/**
 * Server-rendered JSON-LD script. Render anywhere inside a page tree;
 * Next puts it into the head streaming output.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* —— Schema builders —— */

const ORG = {
  "@type": "Organization",
  name: "PDFIA",
  url: getSiteUrl(),
} as const;

export function softwareApplicationSchema(input?: {
  ratingValue?: number;
  ratingCount?: number;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDFIA",
    description:
      "Resuma PDF em português e converse com o documento — com a página de origem citada em cada resposta. Feito pra contrato, edital, apólice e laudo brasileiro.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: getSiteUrl(),
    inLanguage: "pt-BR",
    offers: [
      {
        "@type": "Offer",
        name: "Grátis",
        price: "0",
        priceCurrency: "BRL",
        description: "Resumo grátis sem cadastro pra PDF de até 10 páginas.",
      },
      {
        "@type": "Offer",
        name: "Premium mensal",
        price: "29",
        priceCurrency: "BRL",
        description: "Chat com a página citada, PDFs até 100 páginas, biblioteca salva.",
        url: absoluteUrl("/precos"),
      },
      {
        "@type": "Offer",
        name: "Premium anual",
        price: "290",
        priceCurrency: "BRL",
        description: "R$24,17/mês no anual — economia de R$58 no ano.",
        url: absoluteUrl("/precos"),
      },
    ],
  };
  if (input?.ratingValue && input?.ratingCount) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.ratingValue,
      reviewCount: input.ratingCount,
    };
  }
  return data;
}

export function breadcrumbSchema(items: Array<{ label: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  offers: Array<{ name: string; price: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: ORG,
    offers: input.offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "BRL",
      url: o.url,
      availability: "https://schema.org/InStock",
    })),
  };
}
