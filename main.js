
// import finput from './src/finput.js';

var element = document.getElementById('number-input');

element.addEventListener('keydown', function() {
  console.log("KEYED DOWN before");
});


window.destroy = new window.finput(element, {});

element.addEventListener('keydown', function() {
  console.log("KEYED DOWN after");
});
element.addEventListener('input', function(val) {
  console.log("Changed to:" + val);
});

// destroy();
