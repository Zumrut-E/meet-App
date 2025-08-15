// CitySearch.js
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./CitySearch.css";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery]           = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  // handle clicks outside the search box
  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

const handleInputChanged = (event) => {
  const value = event.target.value;
  const query = value.trim();

  setQuery(value);
  setShowSuggestions(true);

  if (!query) {
    setSuggestions([]);
    setInfoAlert(""); 
    return;
  }

  const source = Array.isArray(allLocations) ? allLocations : [];
  const filtered = source.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase())
  );

  setSuggestions(filtered);
  setInfoAlert(
    filtered.length === 0
      ? "We cannot find the city you are looking for. Please try another city."
      : ""
  );
};

  const handleItemClicked = (evt) => {
    const city = evt.target.textContent;
    setQuery(city);
    setShowSuggestions(false);
    setCurrentCity(city);
    setInfoAlert("");
  };

  useEffect(() => {
    setSuggestions(allLocations || []);
  }, [allLocations]);

  return (
    <div className="city-search-container" id="city-search" ref={containerRef}>
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s) => (
            <li key={s} onClick={handleItemClicked}>
              {s}
            </li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.array.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
};

export default CitySearch;

