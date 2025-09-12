
Scenario: After-every

Tests accessibility after browser action.

Backgrounds: service/counter, int/counter
    serve files at /static from "counter"
    have a valid random username <username>

    start tally route at /count
    
    After every WebPlaywright, Page is accessible accepting serious 9 and moderate 9
    Go to the counter webpage
    input <username> for user name
    click Submit

    URI query parameter username is <username>
    save URI query parameter username to username parameter
    URI starts with counter URI
    should see <username>
    should see username parameter
    cookie userid is <username>
