Feature: Authentication

    Scenario: setup
        Set Resource Server to http://localhost:8123
        Set Resources Path to "/api/resources"
        Set Resource Path to "/api/resource"
        Concat Resource Server and Resources Path as Resources API
        Set Profile Path to "/me"
        Concat Resource Path and "/:id" as Resource Delete Route
        Concat Resource Server and "/static/rest.html" as REST Home

        Start check auth route at Profile Path
        Start auth resources get route at Resources Path
        Start auth resource get route at Resource Path
        Start auth resource delete route at Resource Delete Route

        Concat Resource Server and Profile Path as Profile API
        Concat Resource Server and Resource Path as Resource API

        Set OK to 200
        Set Unauthorized to 401

        Serve files at /static from "rest"
        Make auth scheme basic

    Scenario: Fail authentication 
        Go to the REST Home webpage
        Make an HTTP GET to Profile API
        HTTP status is Unauthorized

    Scenario: Pass authentication 
        use Authorization Basic header with foo, bar
        Go to the REST Home webpage
        Make an HTTP GET to Profile API
        HTTP status is OK

    Scenario: Filter list of resources
        Make an HTTP GET to Resources API
        HTTP status is OK
        JSON response length is 3
        Filter JSON response by "name" matching "Include"
        Filtered response length is 2
        For each filtered id, make REST DELETE to Resource API yielding status 204
        Make an HTTP GET to Resources API
        JSON response length is 1
