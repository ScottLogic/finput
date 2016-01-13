
module.exports = {

  /**
   * Just wait for page to load
   */
  'Load page' : function (client) {
    client.page.finput()
      .navigate()
      .waitForElementVisible('@finput', 100);
  },

  /**
   * PARTIAL FORMATTING (Whilst input is focused) TESTS
   */
  'Enter and format' : function (client) {
    client.page.finput()
      .navigate()
      // Value - 100
      .setValue('@finput', '100')
      .assert.value('@finput', '100')
      // Value - 1,000
      .setValue('@finput', '0')
      .assert.value('@finput', '1,000')
      // Value - 100,000
      .setValue('@finput', '00')
      .assert.value('@finput', '100,000')
      // Value - 1,000,000
      .setValue('@finput', '0')
      .assert.value('@finput', '1,000,000');
  },
  'Delete and format' : function(client) {
    client.page.finput()
      .navigate()
      .setValue('@finput', '1,000,000')
      .assert.value('@finput', '1,000,000')
      // .sendKeys('@finput', '5')

      // Value - 100,000
      .caretLeft('@finput')
      .backspace('@finput', 1)
      .click('@other_input')
      .assert.value('@finput', '100,000')
      // Value - 100,000
      .backspace('@finput', 3)
      .assert.value('@finput', '100');

  },

  // END
  'End': function(client) {
    client.end();
  }
};
