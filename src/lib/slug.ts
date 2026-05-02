export const MAX_SLUG_LENGTH = 191;
export const SLUG_PATTERN = /^[a-zA-Z0-9_\-/.]+$/;

export function isValidSlug(slug: string | null): slug is string {
  return !!slug && slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}
