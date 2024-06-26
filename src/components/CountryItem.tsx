import { Country } from "../types/country";
interface CountryItemProps {
  country: Country;
  onClick: () => void;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform cursor-pointer "
    >
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="w-20 h-auto mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold mb-2 text-center">
        {country.name.common}
      </h3>
      <p className="text-gray-600 text-center">
        {country.capital?.join(", ") || "N/A"}
      </p>
    </div>
  );
};

export default CountryItem;
