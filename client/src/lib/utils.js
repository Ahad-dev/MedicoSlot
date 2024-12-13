import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import moment from 'moment';

export const formatMonthYear = (date) => {
  return moment(date).format('MMMM YYYY');
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
