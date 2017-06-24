
var element = document.getElementById('number-input');

element.addEventListener('keydown', function() {
  console.log("KEYED DOWN before");
});


window.destroy = finput(element, {
  thousands: '.',
  decimal: ',',
  invalidKeyCallback: (invalidKeyInfo) => {
    console.log({message:"Invalid keypress", invalidKeyInfo});
  },
  onFocusinCallback: (e) => {
    return {start: 0, end:1}
  }
});


// destroy();
