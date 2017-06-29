finput
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
The function returned is the cleanup function which removes all the added finput listeners from the input,
making it act like the default browser input once again.

```javascript
var destroy = finput(element, options);
destroy();  // Stops finput behaviour
```

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

##### invalidKeyCallback
Type: `Function(invalidKeyInfo)`  
Default: `() => {}`  
A callback function that is fired everytime a invalid key is pressed.
the callback is called with the `invalidKeyInfo` object.

`{
  event: KeyboardEvent,
  keyName: "f",
  code: 70
}`

##### onFocusinCallback
Type: `Function(e)`  
Default: `undefined`  
A callback function that is fired everytime the input is brought into focus.
the callback is called with the `Event` object.

the function used needs to return an object with a start and end value, a numerical
representation of the postions to select. 

`{
  start: 0,
  end: 1
}`

setting both values to 0 or failing to return both values will disable selecting functionality

Accessing input value
---------------------

The formatted value (the inputs value) and raw numeric value can be access directly on the dom element
as follows:  
**Formatted value** - `element.value` _(the normal input value)_  
**Raw numeric value** - `element.rawValue`


This function removes all the event listeners, making the input behaviour like the default browser
input once again.

API
--------------------

The following functions are exposed on the `element` for direct, controlled manipulation of the input value.

##### setValue
Sets the value, fully formatted, for the input
 * `val` New value to set
 * `notNull` When true, restricts setting the value if it is null.

##### setRawValue
Sets and formats the value for the input
 * `val` New value to set

Developing
----------

Install dependencies: 
- `npm install -g grunt-cli`
- `npm install`

Run dev server:
- `grunt serve`

Running tests
-------------

Build and run the server -

`grunt serve`

##### WITH browserstack

Set browserstack config

- Copy `config.example.json` to a new file: `config.json`
- Update the correct browserstack information

Execute the tests -

`grunt test:browserstack`

##### WITHOUT browserstack

Install and run an instance of webdriver e.g. -

`npm run webdriver update`
`npm run webdriver start`

Execute the tests -

`npm run test`
