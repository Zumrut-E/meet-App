import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event details button with the title "Show Details"', () => {
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });

  test('details are hidden by default', () => {
    // The details should not be visible initially
    const eventDetails = screen.queryByTestId('event-details');
    expect(eventDetails).not.toBeInTheDocument();
  });

  test('shows event details when "Show Details" button is clicked', async () => {
    const showDetailsButton = screen.getByText('Show Details');

    // Simulate a user click on the "Show Details" button
    await userEvent.click(showDetailsButton);

    // After the button click, event description should be visible
    const eventDetails = screen.getByTestId('event-details');
    expect(eventDetails).toBeInTheDocument();
    // expect(eventDetails).toHaveTextContent(allEvents[0].description);
    expect(eventDetails.textContent.replace(/\s+/g, " ").trim())
  .toBe(allEvents[0].description.replace(/\s+/g, " ").trim());


    // Ensure the button text changes to "Hide Details"
    expect(showDetailsButton).toHaveTextContent('Hide Details');
  });

  test('hides event details when "Hide Details" button is clicked', async () => {
    const showDetailsButton = screen.getByText('Show Details');

    // First, show the details
    await userEvent.click(showDetailsButton);
    expect(screen.getByTestId('event-details')).toBeInTheDocument();

    // After showing details, click the button again to hide details
    await userEvent.click(showDetailsButton);

    // Event details should be hidden after clicking "Hide Details"
    expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();

    // Ensure the button text changes back to "Show Details"
    expect(showDetailsButton).toHaveTextContent('Show Details');
  });
});

