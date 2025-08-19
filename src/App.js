import React from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';
import logo from './logo1.svg';
import * as atatus from 'atatus-spa';

atatus.config('e5cee82248e04c28a8e7a55f5f026126').install();

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState(""); 

  // Function to fetch event data
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));  // Make sure currentNOE is a number
    setAllLocations(extractLocations(allEvents));
  }

  // Fetch data when the component mounts or dependencies change
  useEffect(() => {
    if (navigator.onLine) {
      // ✅ User is online
      setWarningAlert('');
    } else {
      // ⚠️ User is offline
      setWarningAlert('You are currently offline. Displayed data may not be up to date.');
    }
    fetchData();
  }, [currentCity, currentNOE]); // Re-fetch data when currentCity or currentNOE changes

  return (
    <div className="App">
      <div className="alerts-container">
       {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
       {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
     </div>
      {/* App header with logo */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>My Event App</h1>
      </header>

      {/* Main app components */}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <EventList events={events} />
    </div>
  );
};

export default App;

