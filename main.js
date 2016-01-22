
// import Finput from './src/finput.js';

var element = document.getElementById('number-input');

element.addEventListener('keydown', function() {
  console.log("KEYED DOWN before");
});


var myFinput = new finput(element, {
});

element.addEventListener('keydown', function() {
  console.log("KEYED DOWN after");
});
element.addEventListener('input', function(val) {
  console.log("Changed to:" + val);
});

setInterval(function() {
  console.log(myFinput.value);
}, 500)
