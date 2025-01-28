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
