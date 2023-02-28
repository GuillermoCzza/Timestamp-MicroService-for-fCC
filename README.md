# Timestamp Microservice

Node.js application that serves a webpage when GETting the root ("/"), or the inputted date as a UNIX timestamp and as a string date (both as fields in a json) when GETting "/api/:date?/". The requested date may be a valid date string or a UNIX timestamp, and if left empty, it will default to the current time.

In order to choose the port, you must fill it out in the .env file. It's 3000 by default.
 
Made from freeCodeCamp's boilerplate code for the Timestamp Microservice project (https://github.com/freeCodeCamp/boilerplate-project-timestamp/).

(Frontend is unmodified from the one provided by freeCodeCamp for testing)
