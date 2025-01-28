import type { PRICE_AREA } from "@/types";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export const formatDateHours = (date: Date) =>
  format(date, "HH:mm", { locale: nb });

export type ELECTRICITY_ARGUMENTS = {
  date: Date;
  priceArea: PRICE_AREA;
};

export const isValidDate = (input: ELECTRICITY_ARGUMENTS): boolean => {
  const EARLIEST_DATE = {
    year: 2021,
    month: 12,
    day: 1,
  };

  const year = input.date.getFullYear();
  const month = input.date.getMonth() + 1;
  const day = input.date.getDate();
  const earliestDate = new Date(
    EARLIEST_DATE.year,
    EARLIEST_DATE.month,
    EARLIEST_DATE.day,
  );
  const validDate = new Date(year, month - 1, day);

  if (validDate < earliestDate) {
    return false;
  }

  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const latestAllowedDate = now.getHours() >= 13 ? tomorrow : now;
  if (validDate > latestAllowedDate) {
    return false;
  }

  return true;
};

export const formatDateForEndpoint = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};
