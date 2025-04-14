import { useState } from "react";
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    let value = e.target.value;
    setNumber(value);

    let errorText;
    if (isNaN(value) || value < 0) { 
      errorText = 'Please enter a valid number'
    } else {
      errorText = '';
    }
    setCurrentNOE(value);
    setErrorAlert(errorText); 

  }
 
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