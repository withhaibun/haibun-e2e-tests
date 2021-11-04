
Feature: A form and counter

    Backgrounds: service/local

    When I have a valid random username <username>

    Serve files from test
    Start test route at /count
    On the form webpage
    When I input <username> for input
    And I click the button Submit
    Then the URI should start with counter URI
    And I should see <username>
    And the cookie userid should be <username>
