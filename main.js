
// import Finput from './src/finput.js';

var element = document.getElementById('number-input');

new Finput(element, {
  valueStep: 100,
  // currency: '$',
  delimiterDeleteStrategy: 'DELETE_NUMBER'
});
