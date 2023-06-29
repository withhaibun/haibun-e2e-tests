
# Reviews

This creates a review.html file for every execution member in its directory, then verify it exists.

    create found reviews
    storage entry ./capture/default/__test/loop-1/seq-0/featn-1/mem-0/review.html exists

Create an index of all found reviews in the root directory, then verify it exists.

    create found index
    storage entry ./capture/reviews.html exists

Copy the reviews to the publish location.

    publish found reviews
    storage entry files/published/capture/default/__test/loop-1/seq-0/featn-1/mem-0/review.html exists

# Dashboard

(Re-)create a page that finds all existing reviews and displays them, then verify it exists.

    create dashboard page
    storage entry ./files/published/index.html exists

Finds any executions, and publishes them to a directory where the dashboard page can find them.

    publish dashboard review link
    storage entry ./files/published/reviews/ exists
    storage entry ./files/published/reviews/__test.json exists

# Browser access

Backgrounds: service

Start up a server so we can verify everything from a browser.

    serve files at /published from published

Start by accessing the dasboard.

    go to the dashboard webpage
    pause for 30s

It contains an indexes of found reviews. Select one.

    see reviews link
    click the link reviews 

Now on an index of found reviews. Select one.

    see review link

Now on an individual review, with a timeline and video.

    click the link review 
    see step-current
    see video


