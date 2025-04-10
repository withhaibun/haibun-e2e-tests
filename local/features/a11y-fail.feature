Scenario: Test accessibility failure

Background features are loaded for the environment the test is running.

Backgrounds: int/a11y
    Serve files from "a11y"

Files crucial for accessibility checks are served for the automated testing process.

    Go to the test webpage
    
The test navigates to the webpage, where the automated accessibility evaluation will take place.

The accessibility settings are strict, allowing no serious or moderate issues to pass the test. The test should fail because the axe tool detected more than zero serious accessibility issues.  It also found more than zero moderate issues.

Refer to the failure HTML report for details.

Page is accessible accepting serious 0 and moderate 0