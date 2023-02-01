
Feature: A form and counter

    Backgrounds: service/local, int/upload-form
    Start upload route at "/upload"
    show mounts

    Then serve files from test
    
    On the form webpage
    Upload file "files/picture.jpg" using upload chooser
    # Click the button Upload
    pause for 1000s
