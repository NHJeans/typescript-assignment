import { useState } from "react";
import { Country } from "../types/country";
import { useCountries } from "../hooks/useCountries";
import CountryItem from "./CountryItem";
import LoadingSpinner from "./LoadingSpinner";

const CountryList: React.FC = () => {
  const { data: countries, error, isPending } = useCountries();
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);

  // 즐겨찾기에 추가된 국가인지 확인
  const isFavorite = (country: Country) => {
    return favoriteCountries.find(
      (favCountry) => favCountry.name.common === country.name.common
    );
  };

  // 즐겨찾기에 국가 추가
  const addFavorite = (country: Country) => {
    setFavoriteCountries((prevFavorites) => [...prevFavorites, country]);
  };

  // 즐겨찾기에서 국가 제거
  const removeFavorite = (country: Country) => {
    setFavoriteCountries((prevFavorites) =>
      prevFavorites.filter(
        (favCountry) => favCountry.name.common !== country.name.common
      )
    );
  };

  // 국가가 즐겨찾기 목록에 있는지 여부에 따라 추가 또는 제거
  // isFavorite 함수를 사용하여 즐겨찾기 여부를 확인한 후, addFavorite 또는 removeFavorite 함수를 호출
  const toggleCountry = (country: Country) => {
    isFavorite(country) ? removeFavorite(country) : addFavorite(country);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const nonFavoriteCountries = countries?.filter(
    (country) => !isFavorite(country)
  );

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-10 text-center mt-8">
        Favorite Countries
      </h2>
      <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {favoriteCountries.map((country) => (
          <CountryItem
            key={country.name.common}
            country={country}
            onClick={() => toggleCountry(country)}
          />
        ))}
      </div>
      <h2 className="text-4xl font-bold mb-10 text-center">Countries</h2>
      <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nonFavoriteCountries?.map((country) => (
          <CountryItem
            key={country.name.common}
            country={country}
            onClick={() => toggleCountry(country)}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
