import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let allEvents;
  
  beforeEach(async () => {
    // Mock fetching the events
    allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
  });

  test('renders event location', () => {
    expect(screen.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event details button with the title "Show Details"', () => {
    const showDetailsButton = screen.queryByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
  });

  test('details are hidden by default', () => {
    // The details should not be visible initially
    const eventDetails = screen.queryByText(allEvents[0].description); // Assuming the description is the event details
    expect(eventDetails).not.toBeInTheDocument();
  });

  test('shows event details when "Show Details" button is clicked', async () => {
    const showDetailsButton = screen.queryByText('Show Details');
    
    // Simulate a user click on the "Show Details" button
    await userEvent.click(showDetailsButton);

    // After the button click, event details should be visible
    const eventDetails = screen.queryByText(allEvents[0].summary); // Assuming the description is the event details
    await waitFor(() => expect(eventDetails).toBeInTheDocument());

    // Ensure the button text changes to "Hide Details"
    expect(showDetailsButton).toHaveTextContent('Hide Details');
  });

  test('hides event details when "Hide Details" button is clicked', async () => {
    const showDetailsButton = screen.queryByText('Show Details');

    // First, show the details
    await userEvent.click(showDetailsButton);

    // After showing details, click the button again to hide details
    await userEvent.click(showDetailsButton);

    // Event details should be hidden after clicking "Hide Details"
    const eventDetails = screen.queryByText(allEvents[0].description);
    await waitFor(() => expect(eventDetails).not.toBeInTheDocument());

    // Ensure the button text changes back to "Show Details"
    expect(showDetailsButton).toHaveTextContent('Show Details');
  });
});

