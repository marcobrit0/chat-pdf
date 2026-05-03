/** Anonymous free tier — small PDFs only, summary without chat. */
export const ANON_MAX_PAGES = 10;
export const ANON_MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MiB — conservative for V1
export const ANON_SUMMARIES_PER_DAY = 5;

/** Premium workspace uploads — larger docs for grounded chat (server-enforced). */
export const PREMIUM_MAX_PAGES = 400;
export const PREMIUM_MAX_FILE_BYTES = 40 * 1024 * 1024; // 40 MiB

/** Cost controls — enforced server-side through daily counters. */
export const PREMIUM_CHAT_REQUESTS_PER_DAY = 80;
export const PREMIUM_ANALYZE_REQUESTS_PER_DAY = 30;
export const PREMIUM_UPLOADS_PER_DAY = 20;
export const CHECKOUT_ATTEMPTS_PER_DAY = 10;

/** MIME types accepted for PDF upload validation. */
export const PDF_MIME_TYPES = ["application/pdf"] as const;
