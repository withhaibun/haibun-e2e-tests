
Feature: A form and counter

    Backgrounds: service/xss

   Serve files from test
    Accept next dialog to clicked
    On the xss webpage
    Dialog "clicked" message not set

    Concat xss and ?;alert('hi') as exploit
    On the exploit webpage
    Dialog "clicked" message says "hi"