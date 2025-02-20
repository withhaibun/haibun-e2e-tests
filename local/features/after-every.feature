Feature: Test accessibility failure

Background features are loaded for the environment the test is running.

Backgrounds: int/a11y
    serve files at /static from "counter"

    After every WebPlaywright, Page is accessible accepting serious 0 and moderate 0

    Go to the test webpage
    
    And start tally route at /count
    
    Go to the form webpage
    When I input <username> for user name
    And I click the button Submit

    Then the URI query parameter username is <username>
    Then save URI query parameter username to username parameter
    Then the URI starts with counter URI
    And I should see <username>
    And I should see username parameter
    And the cookie userid is <username>
