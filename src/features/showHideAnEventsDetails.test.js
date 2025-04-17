import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EventList from '../components/EventList'; // adjust path if needed
import mockData from '../mock-data'; // import your mock data

// Load the corresponding feature file (located alongside this test file)
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');


defineFeature(feature, test => {
  test('Show event details', ({ given, when, then }) => {
    given('the user is on the events list page', () => {
      render(<EventList events={mockData} />);
    });

    when('the user clicks on the "Show Details" button for an event', async () => {
      const [showBtn] = await screen.findAllByText(/show details/i);
      fireEvent.click(showBtn);
    });

    then('the event details should be displayed', () => {
      // now just assert the details container is in the DOM
      expect(screen.getByTestId('event-details')).toBeInTheDocument();
    });
  });

  test('Hide event details', ({ given, when, then }) => {
    given('the user has expanded the details of an event', async () => {
      render(<EventList events={mockData} />);
      const [showBtn] = await screen.findAllByText(/show details/i);
      fireEvent.click(showBtn);
    });

    when('the user clicks on the "Hide Details" button', async () => {
      const [hideBtn] = await screen.findAllByText(/hide details/i);
      fireEvent.click(hideBtn);
    });

    then('the event details should be hidden', () => {
      expect(screen.queryByTestId('event-details')).toBeNull();
    });
  });
});