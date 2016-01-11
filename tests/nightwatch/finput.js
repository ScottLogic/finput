
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
   * Entering data tests
   */
  'Enter valid numbers' : function (client) {

    client.page.finput()
      .navigate()
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

    client.end();
  },
};
