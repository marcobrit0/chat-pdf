/** Anonymous free tier — small PDFs only, summary without chat. */
export const ANON_MAX_PAGES = 10;
export const ANON_MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MiB — conservative for V1
export const ANON_SUMMARIES_PER_DAY = 1;

/** Premium workspace uploads — larger docs for grounded chat (server-enforced). */
export const PREMIUM_MAX_PAGES = 400;
export const PREMIUM_MAX_FILE_BYTES = 40 * 1024 * 1024; // 40 MiB

/** MIME types accepted for PDF upload validation. */
export const PDF_MIME_TYPES = ["application/pdf"] as const;
