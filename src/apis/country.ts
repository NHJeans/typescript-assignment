import { Country } from "../types/country";
import api from "./axios";

export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await api.get<Country[]>("");
  return data;
};
