import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  let CitySearchDOM;
  let citySearchInput;
  let suggestionListItems;

  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {
      // Nothing to set up
    });

    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see the list of all upcoming events.', async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });

    when('user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await user.type(citySearchInput, "Berlin");
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', async () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBeGreaterThan(0);
      expect(suggestionListItems[0].textContent).toMatch(/Berlin/);
    });
  });

  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    given('user was typing “Berlin” in the city textbox', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).getByRole('textbox');
      await user.type(citySearchInput, "Berlin");
    });

    and('the list of suggested cities is showing', () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBeGreaterThan(0);
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
      const user = userEvent.setup();
      await user.click(suggestionListItems[0]);
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      expect(citySearchInput.value).toBe(suggestionListItems[0].textContent);
    });

    and('the user should receive a list of upcoming events in that city', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const allEvents = await getEvents();
      const filteredEvents = allEvents.filter(
        (event) => event.location === suggestionListItems[0].textContent
      );
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(filteredEvents.length);
      });
    });
  });
});