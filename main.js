
import Finput from './src/finput.js';

const element = document.getElementById('number-input');

const finput = new Finput(element, {
  valueStep: 100
});

console.log(finput.element);
