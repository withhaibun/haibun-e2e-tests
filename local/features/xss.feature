
Feature: Check against URI xss exploit

    Backgrounds: service/xss

    Serve files from "xss"
    Accept next dialog to clicked
    go to the xss webpage
    Dialog "clicked" message not set

    Concat xss and ?;alert('hi') as exploit
    Go to the exploit webpage
    Dialog "clicked" message says "hi"