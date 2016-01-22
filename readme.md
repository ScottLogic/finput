finput
======

A vanilla-JS financial amount input control. Supports the following features -

* auto-formatting
* prevents invalid input whether typed, dragged or pasted
* 'k', 'm', 'b', etc. multiplier keys

Usage
-----
See an example finput [here](http://alisd23.github.io/finput)

### Install package
`npm install finput`

### Initialise input
To initialise the finput, simply pass the element and any options into the finput constructor.

```javascript
var myInput = finput(element, options)
```

### Options

#### scale
Type: `Number`  
Default: `2`

Maximum number of decimal digits the value can take

#### range
Type: `Number`  
Default: `ALL`

The possible range of values that the value can take

Possible Values:  
- `'ALL'`: Number can take any value  
- `'POSITIVE'`: Number can only be positive

#### fixed
Type: `Boolean`  
Default: `true`  
If true, after focus is lost value is formatted to *scale* number of decimal places

#### thousands
Type: `string`  
Default: `,`  
The character used to separate thousands in the formatted value.
`E.g. 1,000`

#### decimal
Type: `string`  
Default: `.`  
The character used for the decimal point

#### shortcuts
Type: `Object { character: multiplier }`  
Default: `{
  'k': 1000,
  'm': 1000000,
  'b': 1000000000
}`  
An object mapping of shortcuts that the user can use to quickly enter common values.
E.g. with the default shortcuts, typing `k` will multiply the number value by 1000


### Functions
The object returned when initialising the finput contains a cleanup function called `destroy`.
For example:  

```javascript
var myInput = finput(element, options);
myInput.destroy()
```

This function removes all the event listeners, making the input behaviour like the default browser
input once again.


Install Dependencies
--------------------

`npm install -g grunt-cli`
`npm install`

Developing
----------

`grunt serve`

Running tests
-------------

Build and run the server -

`grunt serve`

#### WITH browserstack

Set browserstack config

- Copy `config.example.json` to a new file: `config.json`
- Update the correct browserstack information

Execute the tests -

`grunt test:browserstack`

#### WITHOUT browserstack

Install and run an instance of webdriver e.g. -

`npm run webdriver update`
`npm run webdriver start`

Execute the tests -

`npm run test`
