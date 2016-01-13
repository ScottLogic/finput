
var finputCommands = {
  backspace: function(element, count) {
    var B = this.api.Keys['BACK_SPACE'];
    return this.sendKeys(
      element,
      Array(count || 1).map(function() { return B; })
    );
  },
  caretRight: function(element, count) {
    var R = this.api.Keys['RIGHT_ARROW'];
    return this.sendKeys(
      element,
      Array(count || 1).map(function() { return R; })
    );
  },
  caretLeft: function(element, count) {
    var L = this.api.Keys['LEFT_ARROW'];
    return this.sendKeys(
      element,
      Array(count || 1).map(function() { return L; })
    );
  }
};

module.exports = {
  url:  __dirname + '\\..\\..\\..\\index.html',
  elements: {
    finput: {
      selector: '#number-input'
    },
    other_input: {
      selector: '#text-numbers'
    }
  },
  commands: [finputCommands]
}
