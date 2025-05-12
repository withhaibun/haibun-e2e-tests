go to the https://github.com/withhaibun/haibun-e2e-tests/blob/main/OVERVIEW.md webpage
press PageDown
press PageDown
resize window to largest dimensions

Haibun is a narrative-driven testing framework that blends prose with executable steps. 
That makes test scenarios both readable by any team member, and precise.
By combining background setup, user actions, and assertions, Haibun facilitates comprehensive and maintainable end-to-end specification, testing, and documentation.

Scenario: Accessibility for web counter test
Backgrounds: service/counter, int/counter

We will test a counter web application by simulating a user interacting with the app and verifying the results at each stage.

First, we set up the backend and user context required for the test.
serve files at /static from "counter"
have a valid random username <username>
start tally route at /count

Go to the counter webpage

We can verify the page is heuristically accessible after every browser action.
After every WebPlaywright, Page is accessible accepting serious 9 and moderate 9

input <username> for user name
click the button Submit

We will now verify that the application processed the input correctly and updated its state.
URI query parameter username is <username>
save URI query parameter username to username parameter
URI starts with counter URI
should see <username>
should see username parameter
cookie userid is <username>

The URI is correct and the cookie is properly set.

Looks good to me!
pause for 10s
