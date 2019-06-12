# nuts-ehr-demo

a [Sails v1](https://sailsjs.com) application

Application to play with the [Nuts framwork](www.nuts.nl)

It uses a fhir database which you can start with docker:

`docker run --rm -p 13000:3000 -p 15432:5432 fhirbase/fhirbase:latest`

Start the server with

`node app.js`

and visit it in your browser at `http://localhost:1337`
