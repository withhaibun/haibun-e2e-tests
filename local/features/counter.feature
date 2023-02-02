
Feature: A form and counter

    Backgrounds: service/local, int/counter

    When I have a valid random username <username>

    Then serve files at /static from test
    And start tally route at /count
    Then show mounts
    
    On the form webpage
    When I input <username> for input
    And I click the button Submit

    Then the URI query parameter username is <username>
    Then save URI query parameter username to username parameter
    Then the URI should start with counter URI
    And I should see <username>
    And I should see username parameter
    And the cookie userid should be <username>
