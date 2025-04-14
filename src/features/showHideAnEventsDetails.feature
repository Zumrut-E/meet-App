Feature: Show and Hide Event Details
  As a user
  I want to be able to show and hide event details
  So that I can view more information only when needed

  Scenario: Show event details
    Given the user is on the events list page
    When the user clicks on the "Show Details" button for an event
    Then the event details should be displayed

  Scenario: Hide event details
    Given the user has expanded the details of an event
    When the user clicks on the "Hide Details" button
    Then the event details should be hidden
