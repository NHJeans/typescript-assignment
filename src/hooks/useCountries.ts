import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../apis/country";
import { Country } from "../types/country";

export const useCountries = (): UseQueryResult<Country[], Error> => {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};
