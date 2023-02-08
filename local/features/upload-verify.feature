
Feature: Upload a file, then download it and verify it's the same file

Backgrounds: int/service/local, int/upload-form, int/service/upload
    
    On the form webpage
    Upload file "files/picture.jpg" using upload chooser
    Click the button Upload

    Should see "Uploaded file"
    Click on "Uploaded file"
    Save download to "/tmp/test-downloaded.jpg"
    Then "files/picture.jpg" is the same as "/tmp/test-downloaded.jpg"



