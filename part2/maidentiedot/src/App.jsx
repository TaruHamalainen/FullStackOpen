import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // Get all countries from API
  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const getAllCountries = () => {
    axios.get(baseURL).then((response) => {
      setAllCountries(response.data);
    });
  };
  useEffect(getAllCountries, []);

  // Get filtered countries
  const countriesToShow = allCountries.filter((country) =>
    filter
      ? country.name.common.toLowerCase().startsWith(filter.toLowerCase())
      : null
  );

  return (
    <>
      Search Countries{" "}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Display countries={countriesToShow} />
    </>
  );
};

const Display = ({ countries }) => {
  // More than one country but less than 10 countries
  if (countries.length <= 10 && countries.length > 1) {
    return <CountriesList countries={countries} />;

    // more than 10 countries
  } else if (countries.length > 10) {
    return <ErrorMessage />;

    // One country
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;

    // No search input
  } else {
    return null;
  }
};

// List of filtered countries
const CountriesList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountrySimple key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

// country with name and show button
const CountrySimple = ({ country }) => {
  return <li>{country.name.common}</li>;
};

// details of country
const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

// Error message
const ErrorMessage = () => {
  return <div>Too many matches, specify another filter</div>;
};

export default App;
