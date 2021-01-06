### Simple Validation API with Express and JWT
I'm working on this simple API for User/Email Verification for private routes, using Express as Backend Server, mongoose as DataSchema for MongoDB.
Joi as a third party validation (yes, I haven't writed my own validation)
And last but not least JWT for login credential.

#Update
Done, updated the JWT token creation and implementation. Gonna re-upload a next version to revoke token auth on click or on destroyed.
Possibly gonna use this api server on another proyect as a backend api.

#15/12/2020
Added the JWT Expiration time, but still haven't added a /logout route to remove the header auth-token.

#6/1/2021
Added the Scrums branch to keep track of the routes on the Proyect.
•Added the routes
    ◘/api/teams
    ◘/api/blockers
•Fixed the merge fuck-up on the main, maybe I missed something and I fuck one of the branch, Will check back later.
•Still pending to work on the autentification methods to log-in/out.

#December 1, 2020.