# React exercises for MANGO interview process


## Description
This are the two exercises, for the MANGO interview process.

The exercise consist of a custom drag and drop slider for selecting price ranges. The first one accepts a minimum and maximum value. The second one accepts an array of the fixed available values.

The min/max values and the array of fixed values are fetched from a custom mock service (mockable.io).

This is a React.js application created from scratch, using babel as the transpiler and webpack as the bundler.
The application uses css modules to style the react components.
For unit tests is using Jest with testing library and for Functional tests (end-to-end tests) is using Playwright.

## SETUP
With nodejs and npm installed.
just run `npm i`.
To also setup the end-to-end tests run `npx playwright install`.
To start the application just run: `npm start`. It will redirect you to http://localhost:8080/
The first exercise will be displayed on any route except the one for exercise two.
In order to see the second exercise, just change the URL for http://localhost:8080/exercise2.

## TEST
In order to run the Unit Tests, just run `npm run test` and all test suites will run.

To run the end-to-end tests on two separated terminals, run `npm run test:functional:play`.

Or if a specific terminal is needed, start the server with `npm run dev` in one terminal and run `npm run test:functional` in another terminal.

## Author
David Julian Spiess
