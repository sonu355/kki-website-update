/**
 * Resolves a stored `image`/`coverImage` DB value to something an <img>
 * tag can use directly.
 *
 * New uploads (after the Cloudinary migration) store a full secure_url,
 * so they're returned as-is. Older rows created before this migration
 * may still hold a raw base64 string with no data-URI prefix — those
 * are detected and wrapped so nothing already in the database breaks.
 */
export function resolveImageUrl(value) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:")) {
    return value;
  }
  // Legacy base64-in-MySQL row from before the Cloudinary migration.
  return `data:image/jpeg;base64,${value}`;
}
