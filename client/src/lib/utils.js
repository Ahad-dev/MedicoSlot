import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import moment from 'moment';

export const formatMonthYear = (date) => {
  return moment(date).format('MMMM YYYY');
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertTo12HourFormat = (time24)=> {
  // Parse the time in HH:mm format
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Return the formatted time
  return `${hours12}:${String(minutes).padStart(2, "0")}${period}`;
}