export const OPENING_FOUNDER_QUOTE_MARK = '“' as const;
export const CLOSING_FOUNDER_QUOTE_MARK = '”' as const;

export const normalizeFounderQuote = (quote: string) =>
  quote.replace(/^"\s*/, '');
