go to the https://github.com/withhaibun/haibun-e2e-tests/blob/main/OVERVIEW.md webpage
press PageDown
press PageDown

resize window to largest dimensions

Haibun is a narrative-driven testing framework that blends prose with executable steps for easy to understand and precise end-to-end tests.

go to the "https://raw.githubusercontent.com/withhaibun/haibun-e2e-tests/refs/heads/main/walkthrough/features/walkthrough.feature#:~:text=walkthrough.feature%20webpage-,Scenario" webpage
By combining background setup, user actions, and assertions, Haibun facilitates comprehensive and maintainable end-to-end specification, testing, and documentation, including walkthroughs like this one.

Scenario: Accessibility for web counter test
Backgrounds: service/counter, int/counter

go to the https://github.com/withhaibun/haibun-web-accessibility-axe webpage

We can verify the page is heuristically accessible after every browser action.
After every WebPlaywright, Page is accessible accepting serious 9 and moderate 9

serve files at /static from "counter"
start tally route at /count
Go to the counter webpage
We will test a counter web application by simulating a user interacting with an app, verifying the results for each step.
First, we set up the backend and user context required for the test, with a generated username.
have a valid random username <username>

Now we'll interact with the browser.
input <username> for user name
click the button Submit

We can verify that the application processed the input correctly and updated its state.
URI query parameter username is <username>
save URI query parameter username to username parameter
URI starts with counter URI
should see <username>
should see username parameter
cookie userid is <username>

The URI is correct and the cookie is properly set.

Looks good to me!
