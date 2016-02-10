
// import finput from './src/finput.js';

var element = document.getElementById('number-input');

element.addEventListener('keydown', function() {
  console.log("KEYED DOWN before");
});


window.destroy = finput(element, {
  thousands: '.',
  decimal: ','
});


// destroy();
