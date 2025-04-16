import { useState } from "react";
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setNumber(value);  // Always update what the user is typing
  
    // Only validate and update the parent if the value is a non-empty valid number
    if (value === '') {
      setErrorAlert('Number of events is required');
      return;
    }
  
    const parsedValue = parseInt(value, 10);
  
    if (isNaN(parsedValue) || parsedValue < 0) {
      setErrorAlert('Please enter a valid number');
    } else {
      setErrorAlert('');
      setCurrentNOE(parsedValue);
    }
  };
  
 
  return (
    <div id="numberOfEvents">
      <label htmlFor="number" id="number">
        Number of Events:
      <input
        type="text"
        className="number"
        value={number}
        onChange={handleInputChanged}
        />
        </label>
    </div> 
  )

}



NumberOfEvents.propTypes = {
  setCurrentNOE: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired
}

export default NumberOfEvents;