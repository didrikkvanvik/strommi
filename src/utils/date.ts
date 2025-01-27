import { format } from "date-fns";
import { nb } from "date-fns/locale";

export const formatDateHours = (date: Date) =>
  format(date, "HH:mm", { locale: nb });
