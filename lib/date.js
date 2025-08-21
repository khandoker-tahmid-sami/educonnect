export function formatMyDate(value, locale = "en-US", options = {}) {
  if (value == null) return "—"; // null/undefined

  // Support dates coming as Date, ISO string, number, or Mongo Extended JSON { $date: ... }
  const raw = value && value.$date ? value.$date : value;

  // If it's a unix seconds number, convert to ms
  const asNumber =
    typeof raw === "number" ? (raw < 1e12 ? raw * 1000 : raw) : raw;

  const d = raw instanceof Date ? raw : new Date(asNumber);

  if (isNaN(d.getTime())) return "—";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(d);
}
