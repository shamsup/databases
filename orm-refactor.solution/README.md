# ORM Refactor

This directory contains the solution for the ORM refactored version of chatterbox server. Only two files are modified in this solution:

        controllers/index.js
        db/index.js

In order to run your server from this directly from this directory, you must first prepare it:

        npm run prepare

This copies the files `server/app.js` and `server/routes.js` from the `server` directory to here. Once prepared, the server can be run in the usual way:

        npm start
