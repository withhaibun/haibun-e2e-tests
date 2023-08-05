
# Reviews

This creates a review.html file for every execution member in its directory, then verify it exists.

    create found reviews
    storage entry ./capture/default/__test/loop-1/seq-0/featn-1/mem-0/review.html exists

Create an index of all found reviews in the root directory, then verify it exists.

    create found index
    storage entry ./files/published/reviews.html exists

Copy the reviews to the publish location.

    publish found reviews
    storage entry ./files/published/capture/default/__test/loop-1/seq-0/featn-1/mem-0/review.html exists

Publish the reviews dashboard link.

    publish reviews dashboard link
    
Verifies dashboard review links exist.

    storage entry ./files/published/reviews/ exists
    storage entry ./files/published/reviews/__test-reviews.json exists

# Dashboard

(Re-)create a page that finds all existing reviews and displays them, then verify it exists.

    create dashboard page
    storage entry ./files/published/index.html exists

# Browser access

Backgrounds: service

Start up a server so we can verify everything from a browser.

    index files at /reviews from published/reviews
    serve files at /published from published

First check to see the reviews are being indexed.
    go to the reviews webpage
    see review link

Access the dashboard.
    go to the dashboard webpage

It contains an indexes of found reviews. Select one.
#    See "Feature Result Index"
    click "Feature Result Index"

Now on an index of found reviews. Select one.

    see "local xss"
    click by text "Check against URI xss exploit"

Now on an individual review, with a timeline and video.

    see step-current
    see video


