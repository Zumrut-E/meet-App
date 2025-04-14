import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App'; 

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User sees a default number of events', ({ given, when, then }) => {
    given('the user has not specified the number of events', () => {
      // No action needed, just render the app
    });

    when('the user views the event list', () => {
      render(<App />);
    });

    then('the default number of events should be displayed', async () => {
      const eventItems = await screen.findAllByTestId('event-item');
      expect(eventItems.length).toBe(32); // Assuming 32 is your default
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    given('the user is on the events page', () => {
      render(<App />);
    });

    when('the user enters a number into the event limit input field', async () => {
      const input = await screen.findByPlaceholderText(/number of events/i); // adjust if needed
      fireEvent.change(input, { target: { value: '10' } });
    });

    then('the event list should update to show the specified number of events', async () => {
      await waitFor(async () => {
        const eventItems = await screen.findAllByTestId('event-item');
        expect(eventItems.length).toBe(10);
      });
    });
  });
});
