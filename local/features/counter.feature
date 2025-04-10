
Scenario: A form and counter
    Backgrounds: service/counter, int/counter

    have a valid random username <username>

    Then serve files at /static from "counter"
    And start tally route at /count
    After every WebPlaywright, pause for 1s
    
    Go to the counter webpage
    When I input <username> for user name
    And I click the button Submit

    Then the URI query parameter username is <username>
    Then save URI query parameter username to username parameter
    Then the URI starts with counter URI
    And I should see <username>
    And I should see username parameter
    And the cookie userid is <username>
