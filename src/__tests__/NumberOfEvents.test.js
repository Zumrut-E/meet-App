// NumberOfEvents.test.js
import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
  });

  test("number of events has the role of textbox", () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("ensures the default value of textbox is 32", () => {
    expect(NumberOfEventsComponent.getByRole("textbox")).toHaveValue(32);
  });

  test("textbox value changes according to what user types", async () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    const user = userEvent.setup();
    await user.clear(numberOfEvents);
    await user.type(numberOfEvents, "10");
    expect(numberOfEvents).toHaveValue(10);
  });

  test("shows an error if user enters a number less than 1", async () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    const user = userEvent.setup();
    await user.clear(numberOfEvents);
    await user.type(numberOfEvents, "0");

    expect(NumberOfEventsComponent.getByText("Please enter a number between 1 and 32.")).toBeInTheDocument();
    expect(numberOfEvents).toHaveValue(0);
  });

  test("shows an error if user enters a number greater than 32", async () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    const user = userEvent.setup();
    await user.clear(numberOfEvents);
    await user.type(numberOfEvents, "40");

    expect(NumberOfEventsComponent.getByText("Please enter a number between 1 and 32.")).toBeInTheDocument();
    expect(numberOfEvents).toHaveValue(40);
  });

  test("shows an error if input is empty", async () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    const user = userEvent.setup();
    await user.clear(numberOfEvents);

    expect(NumberOfEventsComponent.getByText("Please enter a number between 1 and 32.")).toBeInTheDocument();
    expect(numberOfEvents).toHaveValue(null); // empty input is null for number type
  });
});