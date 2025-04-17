import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import * as atatus from 'atatus-spa';
atatus.config('e5cee82248e04c28a8e7a55f5f026126').install();

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
 

  // Function to fetch event data
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));  // Make sure currentNOE is a number
    setAllLocations(extractLocations(allEvents));
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); // Re-fetch data when cuNOEtNOE changes

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents  setCurrentNOE={setCurrentNOE} 
  setErrorAlert={() => {}} />
      <EventList events={events} />
    </div>
  );
};

export default App;

