/**
 * Evita vazar mensagens de erro internas (stack, providers) em JSON para o cliente.
 * Use em rotas API: log no servidor, retorne mensagem genérica ao usuário.
 */
export function logApiError(route: string, error: unknown): void {
  console.error(`[${route}]`, error);
}

export function userFacingMessage(
  error: unknown,
  fallback = "Ocorreu um erro. Tente novamente em instantes.",
): string {
  if (error instanceof Error && error.message && error.message.length < 120) {
    // Mensagens curtas já controladas pelo app (ex.: validação de negócio).
    if (
      !error.message.includes("OpenRouter") &&
      !error.message.includes("fetch") &&
      !error.message.includes("ECONN")
    ) {
      return error.message;
    }
  }
  return fallback;
}
