export function getDatePart(dateTime: Date | string): string {
  const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;

  if (isNaN(date.getTime())) {
    throw new Error("invalid date format");
  }

  // format the date as YYYY-MM-DD.
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
