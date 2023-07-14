
Feature: A popup window

    Backgrounds:  int/popup

    serve files from "popup"
    
    Go to the test webpage
    click the link open

    pause until current tab is 2
    on tab 2
    be on the popped up webpage
    see "Congratulations"

