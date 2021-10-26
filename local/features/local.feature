
Feature: A form and counter

    Backgrounds: service/local

    On the form webpage
    Serve files from test
    Start test route at /count
    When I input "hello" for input
    And I click the button Submit
    Then the URI should start with counter URI