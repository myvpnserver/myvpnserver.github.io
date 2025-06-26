export function formatDateFromMillis(ms) {
  if (!ms) return 'Не указано';
  const date = new Date(ms);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateFromISO(isoString) {
  if (!isoString) return 'Не указано';
  const date = new Date(isoString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
