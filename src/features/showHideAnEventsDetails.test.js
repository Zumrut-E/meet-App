import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, fireEvent, screen } from '@testing-library/react';
import EventList from '../components/EventList'; // Adjust the path based on your structure

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('Show event details', ({ given, when, then }) => {
    given('the user is on the events list page', () => {
      render(<EventList />);
    });

    when('the user clicks on the "Show Details" button for an event', async () => {
      const showButton = await screen.findByText('Show Details');
      fireEvent.click(showButton);
    });

    then('the event details should be displayed', async () => {
      expect(await screen.findByText('Event Details')).toBeInTheDocument();
    });
  });

  test('Hide event details', ({ given, when, then }) => {
    given('the user has expanded the details of an event', async () => {
      render(<EventList />);
      const showButton = await screen.findByText('Show Details');
      fireEvent.click(showButton);
    });

    when('the user clicks on the "Hide Details" button', async () => {
      const hideButton = await screen.findByText('Hide Details');
      fireEvent.click(hideButton);
    });

    then('the event details should be hidden', () => {
      expect(screen.queryByText('Event Details')).not.toBeInTheDocument();
    });
  });
});
