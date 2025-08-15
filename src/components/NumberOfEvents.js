// NumberOfEvents.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NumberOfEvents.css";

const MIN = 1, MAX = 32;

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber]   = useState(32);
  const [error, setError]     = useState("");

  const handleInputChanged = (e) => {
    const val = e.target.value;
    setNumber(val);

    // empty?
    if (val === "") {
      setError("Please enter a number between 1 and 32.");
      setCurrentNOE(0);
      return;
    }

    const n = parseInt(val, 10);
    if (isNaN(n) || n < MIN || n > MAX) {
      setError(`Please enter a number between ${MIN} and ${MAX}.`);
      setCurrentNOE(0);
    } else {
      setError("");
      setCurrentNOE(n);
    }
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="number">
        Number of Events:
        <input
          type="number"
          id="number"
          className="number"
          min={MIN}
          max={MAX}
          value={number}
          onChange={handleInputChanged}
        />
      </label>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

NumberOfEvents.propTypes = {
  setCurrentNOE: PropTypes.func.isRequired,
};

export default NumberOfEvents;

