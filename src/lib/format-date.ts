// src/lib/format-date.ts

/**
 * Format date/time untuk frontend
 * @param value - bisa Date object atau ISO string
 * @param type - "datetime" | "date" | "time"
 */
export function formatDate(
  value: string | Date,
  type: "datetime" | "date" | "time" = "datetime"
) {
  const date = value instanceof Date ? value : new Date(value);

  switch (type) {
    case "date":
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "time":
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    default:
      return date.toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  }
}
