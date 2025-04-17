// src/components/Event.js
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <button 
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && event.description && (
        <div className="details" data-testid="event-details">
          <p>{event.description}</p>
        </div>
      )}
    </li>
  );
};

export default Event;


