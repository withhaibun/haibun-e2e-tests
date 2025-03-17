Feature: Authentication

    Scenario: setup
        Set Resource Server to http://localhost:8123
        Set Profile Path to "/me"
        Set Token Path to "/token"
        Set Resources Path to "/api/resources"
        Set Resource Path to "/api/resource"
        Concat Resource Path and "/:id" as Resource Delete Route
        Set Logout Path to "/logout"

        Start check auth token route at Profile Path
        Start create auth token route at Token Path
        Start logout auth token route at Logout Path
        Start resources route at Resources Path
        Start resource get route at Resource Path
        Start resource delete route at Resource Delete Route

        Concat Resource Server and Token Path as Authorization Server
        Concat Resource Server and Profile Path as Profile API
        Concat Resource Server and Resources Path as Resources API
        Concat Resource Server and Resource Path as Resource API
        Concat Resource Server and Resource Delete Path as Resource Delete API
        Concat Resource Server and "/logout?post_logout_redirect_uri=http://locahost:8123/loggedOut" as Logout

        Set OK to 200
        Set Unauthorized to 401

        Serve files at /static from "rest"
        Go to the http://localhost:8123/static/rest.html webpage

    Scenario: Fail authentication 
        Make an HTTP GET to Profile API
        HTTP status is Unauthorized

    Scenario: Check pre-existing authentication token
        Set testtoken to "test-token"
        Change server auth token to testtoken
        Make Authorization Bearer token testtoken
        Make an HTTP GET to Resources API
        HTTP status is OK

    Scenario: Create authentication token
        Request OAuth 2.0 access token from Authorization Server
        HTTP status is OK
        HTTP response property "access_token" is "newToken"
        Make an HTTP GET to Profile API
        HTTP status is OK

    Scenario: Logout authentication token
        Perform OAuth 2.0 logout from Logout
        Make an HTTP GET to Profile API
        HTTP status is Unauthorized

    Scenario: Filter list of resouces
        Request OAuth 2.0 access token from Authorization Server
        HTTP status is OK
        Make an HTTP GET to Resources API
        JSON response length is 3
        Filter JSON response by "name" matching "Include"
        Filtered response length is 2
        For each filtered id, make REST DELETE to Resource API yielding status 204
        Make an HTTP GET to Resources API
        JSON response length is 1

