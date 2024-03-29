
# History

Verify a history of all found reviews is in the root directory
    storage entry ./reviews/tracks/__test-tracksHistory.json exists

# Reviews pages

Verify a page that found all existing reviews displays them
    storage entry ./reviews/dashboard.html exists
    storage entry ./reviews/reviewer.html exists

# Browser access

Backgrounds: service

Start up a server so we can verify everything from a browser.
    index files at /tracks from published/tracks
    index files at / from published

First check to see the reviews are being indexed.
    go to the tracks webpage
    see tracks history

Access the reviews.
    go to the dashboard webpage
    See "Reviews"

It contains an indexes of found reviews. Select one.
#    See "Feature Result Index"
    See "local a11y"
    click "local a11y"

Now on an individual review, with a timeline and video.
    see step-current
    see video

# Failure report

This report was generated by a11y-fail.
#    extract HTML report from failures.json to files/publish/failures.html
#    storage entry failures.html exists
