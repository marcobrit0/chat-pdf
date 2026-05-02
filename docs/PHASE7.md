# Fase 7 — Iteração pós-lançamento (SEO + roteiro Premium)

Este documento registra o que foi entregue nesta fase incremental e o que permanece em backlog.

## Entregue

### SEO

- Novas rotas de marketing em PT-BR com `SeoPageTemplate`: licitações (`/ler-edital-com-ia`, `/resumir-edital-de-licitacao`), seguros (`/analisar-apolice-de-seguro`), saúde (`/entender-laudo-medico`).
- Hub `/guias` e guia stub `/guias/como-resumir-pdf-com-ia`.
- `app/sitemap.ts` atualizado; header e footer com links para guias e landings de exemplo.

### Roteiro Premium (placeholders honestos)

- Cartões no workspace `/app` para **Comparar PDFs** e **Pasta de PDFs**; visitantes sem Premium veem `PaywallCta` e podem abrir `/app/compare` e `/app/pasta` (texto “em breve”, sem processar arquivos).
- Rotas `/app/compare` e `/app/pasta` com copy clara e CTA para `/precos` quando aplicável.

### Produto

- No chat do documento, dicas de **páginas citadas** extraídas do texto da resposta (padrões `[p. N]`) e preparação para `answerPageLabels` opcional na API.

## Backlog (não prometido nesta entrega)

- **OCR** e PDFs escaneados de baixa qualidade.
- **Motor real de comparação** (diff semântico ou por bloco) entre dois PDFs.
- **Armazenamento multi-PDF** (pastas / projetos) além da biblioteca linear atual.
- **Citações estruturadas por resposta** no backend (hoje: painel de trechos + parsing do texto).

## Verificação

```bash
npm run lint
npm run typecheck
npm run build
```

Rotas novas: abrir as URLs listadas no sitemap; autenticado, testar `/app`, `/app/compare` e `/app/pasta`.
