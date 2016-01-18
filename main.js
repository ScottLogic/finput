
import Finput from './src/finput.js';

var element = document.getElementById('number-input');

var myFinput = new Finput(element, {
  valueStep: 100,
  currency: '$',
  delimiterDeleteStrategy: 'SKIP'
});

console.log(Finput);
console.log(myFinput);
