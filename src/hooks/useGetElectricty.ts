import { useQuery } from "@tanstack/vue-query";
import { axiosFetch } from "./fetch";

export enum PRICE_AREA {
  EAST_NORWAY = "NO1", // Oslo / Øst-Norge
  SOUTH_NORWAY = "NO2", // Stavanger / Sør-Norge
  MID_NORWAY = "NO3", // Trondheim / Midt-Norge
  NORTH_NORWAY = "NO4", // Tromsø / Nord-Norge doesn't pay MVA
  WEST_NORWAY = "NO5", // Bergen / Vest-Norge
}

export interface IElectricity {
  NOK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: Date;
  time_end: Date;
}

const isValidDate = (input: ELECTRICITY_ARGUMENTS): boolean => {
  const earliestDate = new Date(
    EARLIEST_DATE.year,
    EARLIEST_DATE.month,
    EARLIEST_DATE.day,
  );
  const validDate = new Date(input.year, input.month - 1, input.day);

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

const EARLIEST_DATE = {
  year: 2021,
  month: 12,
  day: 1,
};

export type ELECTRICITY_ARGUMENTS = {
  year: number;
  month: number;
  day: number;
  priceArea: PRICE_AREA;
};

export const useGetElectricity = (args: ELECTRICITY_ARGUMENTS) => {
  const { year, month, day, priceArea } = args;
  const isValid = isValidDate(args);

  const formattedDate = `${year}/${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;

  return useQuery({
    queryKey: ["electricity", formattedDate, priceArea],
    queryFn: () =>
      axiosFetch<IElectricity[]>({ url: `${formattedDate}_${priceArea}` }),
    enabled: isValid,
  });
};
