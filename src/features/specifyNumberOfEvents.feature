Feature: Specify Number of Events
  As a user
  I want to be able to specify the number of events displayed
  So that I can control how many events I see at a time

  Scenario: User sees a default number of events
    Given the user has not specified the number of events
    When the user views the event list
    Then the default number of events should be displayed

  Scenario: User can change the number of events displayed
    Given the user is on the events page
    When the user enters a number into the event limit input field
    Then the event list should update to show the specified number of events