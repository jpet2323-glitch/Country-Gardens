/**
 * Formspree endpoint for inquiry + donation forms.
 *
 * Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in .env.local (and in Vercel's
 * Environment Variables UI). Falls back to the friend's original
 * endpoint so local dev still works with no config.
 */
export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/maqlgggp";
