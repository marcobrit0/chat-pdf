export type PremiumChatRequestTurn = {
  role: "user" | "assistant";
  content: string;
};

/**
 * The UI keeps presentation metadata on chat turns, but the API schema is
 * deliberately strict. Send only the fields the server owns.
 */
export function toPremiumChatRequestMessages<T extends PremiumChatRequestTurn>(
  messages: T[],
): PremiumChatRequestTurn[] {
  return messages.map(({ role, content }) => ({ role, content }));
}
