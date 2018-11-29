finput  
![Travis build status](https://travis-ci.org/ScottLogic/finput.svg?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
======

A vanilla-JS financial amount input control. Supports the following features:

* auto-formatting
* prevents invalid input whether typed, dragged or pasted
* 'k', 'm', 'b', etc. multiplier keys

Required Browser Features
-------------------------

The below table lists features that `finput` requires in order to function properly. If you wish to use `finput` with a browser that does not support a required feature then using the suggested polyfill may help. Note that there may be more appropriate polyfills than the ones listed.

| Required Feature | Suggested Polyfill |
|-|-|
| [KeyboardEvent.key](https://caniuse.com/#feat=keyboardevent-key) | [keyboardevent-key-polyfill](https://www.npmjs.com/package/keyboardevent-key-polyfill) |
| [Symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) | [babel-polyfill](http://babeljs.io/docs/usage/polyfill)

Usage
-----
See an example finput [here](http://scottlogic.github.io/finput)

#### Install package
`npm install finput`

#### Initialise input
To initialise the finput, simply pass the element and any options into the finput constructor.
An object is returned which allows you to interact with the finput API.

Options
-----

##### scale
Type: `Number`  
Default: `2`

Maximum number of decimal digits the value can take

##### range
Type: `string`  
Default: `ALL`

The possible range of values that the value can take

Possible Values:  
- `'ALL'`: Number can take any value  
- `'POSITIVE'`: Number can only be positive

##### fixed
Type: `Boolean`  
Default: `true`  
If true, after focus is lost value is formatted to *scale* number of decimal places

##### thousands
Type: `string`  
Default: `,`  
The character used to separate thousands in the formatted value.
`E.g. 1,000`

##### decimal
Type: `string`  
Default: `.`  
The character used for the decimal point

##### shortcuts
Type: `Object { character: multiplier }`  
Default: `{
  'k': 1000,
  'm': 1000000,
  'b': 1000000000
}`  
An object mapping of shortcuts that the user can use to quickly enter common values.
E.g. with the default shortcuts, typing `k` will multiply the number value by 1000

##### onInvalidKeyCallback
Type: `Function(e)`  
Default: `() => {}`  
A callback function that is fired each time a invalid key is pressed.
the callback is called with the [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) object that was raised on keydown.

##### onFocusCallback
Type: `Function(e)`  
Default: `undefined`  
A callback function that is fired each time the input is focussed.
the callback is called with the `Event` object.

the function used needs to return an object with a start and end value, a numerical
representation of the postions to select. 

`{
  start: 0,
  end: 1
}`

setting both values to 0 or failing to return both values will disable selecting functionality

API
--------------------

The following properties are exposed on the returned finput instance:

##### options
Retrieves the options on the input

##### rawValue
Retrieves the raw value of the input (numerical)

#### value
Retrieves the formatted value of the input (string)

The following functions are exposed on the returned finput instance:

##### setOptions
Sets the options on the input
* `options` New options to set. Copied before being set.

Note that `setOptions` supplements the current options rather than replacing. 
```
element.setOptions({ thousands: '.' });
element.setOptions({ decimal: ',' });
```
The above therefore results in the following `options`:
```
{
  thousands: '.',
  decimal: ','
} 
```
##### setValue
Sets the value, fully formatted, for the input
 * `val` New value to set
 * `notNull` When true, restricts setting the value if it is null.

##### setRawValue
Sets and formats the value for the input
 * `val` New value to set
 
##### removeListeners
Removes finputs listeners from the provided element, returning it to a standard native control

Developing
----------

Install dependencies:
- `npm install`

Adding dependencies:
- Do not commit `yarn.lock`
- Do commit `package-lock.json`

Run dev server:
- `npm start`

Building Library
----------------
- `npm run build:dev` - Builds a development friendly version of the application
- `npm run build:prod` - Builds a minified version of the application
- `npm run compile` - Compiles typescript dependency-free version of library

Running tests
-------------

Execute the tests locally:

- `npm test`

This takes care of doing the following:
- Updating webdriver server
- Starting background webdriver server
- Starting background web server
- Starting tests
- Shutting down webdriver server, webserver and tests

The tests can be run for CI using:
- `npm run test:ci`

This is the same as `npm test` but it does not update or start webdriver. We assume that CI/Browserstack takes care of webdriver for us.

Releasing
---------

[semantic-release](https://github.com/semantic-release/semantic-release) is used with Travis CI to perform releases on merged PRs to `master` branch.

Commit messages must follow [AngularJS Commit Message Conventions](https://github.com/semantic-release/semantic-release#default-commit-message-format) for `semantic-release` to correctly choose the next version.

If the Travis CI build for a new release is successful, it is published to npm.
`./lib/finput.ts` is used by npm installs, and `./dist/finput.min.js` is 
automatically served by [UNPKG](https://unpkg.com/) CDN at `https://unpkg.com/finput@latest/dist/finput.min.js` to directly load finput 
in a browser environment.
