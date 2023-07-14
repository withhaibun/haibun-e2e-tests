
Feature: Upload a file, then download it and verify it's the same file

Backgrounds: int/upload-form
    Serve files at /static from "upload"
    Start upload route at "/upload"
    Start download route at "/download"

    Go to the form webpage
    Upload file "files/picture.jpg" using upload chooser
    Click the button Upload

    Should see "Uploaded file"
    Click on "Uploaded file"
    Save download to "/tmp/test-downloaded.jpg"
    Then "files/picture.jpg" is the same as "/tmp/test-downloaded.jpg"



