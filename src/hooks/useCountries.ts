import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../apis/country";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};
