import axios from "axios";

const BASE_URL = "https://www.hvakosterstrommen.no/api/v1/prices/";

export const axiosFetch = async <T>({ url }: { url: string }): Promise<T> => {
  const response = await axios.get(`${BASE_URL}${url}.json`);
  return response.data;
};
