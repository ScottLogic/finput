# finput

A vanilla-JS financial amount input control. Supports the following features -

* auto-formatting
* prevents invalid input whether typed, dragged or pasted
* 'k', 'm', 'b', etc. multiplier keys

## Install Dependencies

`npm install -g grunt-cli`
`npm install`

## Developing

`grunt serve`

## Running tests

Build and run the server -

`grunt serve`

### WITH browserstack

Set browserstack config

- Copy `config.example.json` to a new file: `config.json`
- Update the correct browserstack information

Execute the tests -

`grunt test:browserstack`

### WITHOUT browserstack

Install and run an instance of webdriver e.g. -

`npm run webdriver update`
`npm run webdriver start`

Execute the tests -

`npm run test`
