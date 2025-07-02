import { format } from 'date-fns';

export function formatDate(date) {
  return format(new Date(date), 'PPpp');
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
