import axios from "axios";
import { useEffect, useState } from "react";
import APIKEY from "./config.js"; // getting API key from config file

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
      <Display
        countries={countriesToShow}
        onSelectCountry={(name) => setFilter(name)}
      />
    </>
  );
};

// Display component
const Display = ({ countries, onSelectCountry }) => {
  // More than one country but less than 10 countries
  if (countries.length <= 10 && countries.length > 1) {
    return (
      <CountriesList countries={countries} onSelectCountry={onSelectCountry} />
    );

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
const CountriesList = ({ countries, onSelectCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => onSelectCountry(country.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

// details of country
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState([]);
  // Getting weather from API
  const getWeather = () => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          appid: APIKEY,
          lat: country.capitalInfo.latlng[0],
          lon: country.capitalInfo.latlng[1],
          units: "metric",
        },
      })
      .then((res) => setWeather(res.data));
  };

  useEffect(getWeather, [country.capitalInfo.latlng]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather.length === 0 ? null : (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature {weather.main.temp} Celsius </p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            title={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

// Error message
const ErrorMessage = () => {
  return <div>Too many matches, specify another filter</div>;
};

export default App;
