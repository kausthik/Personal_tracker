export function isToday(date: Date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function isTomorrow(date: Date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  );
}

export function isPastDate(date: Date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return date < today;
}

export function getRelativeDate(date: Date) {
  if (isToday(date)) return "Today";

  if (isTomorrow(date)) return "Tomorrow";

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diff =
    Math.ceil(
      (target.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

  if (diff > 1) {
    return `In ${diff} days`;
  }

  return target.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Whole days from now until `date` (negative once it has passed)
export function daysUntil(date: Date) {
  return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}
