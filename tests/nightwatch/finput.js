
const INPUT = '#number-input';
module.exports = {

  /**
   * Just wait for page to load
   */
  'Load page' : function (browser) {
    browser
      .url(__dirname + '\\..\\..\\index.html')
      .waitForElementVisible(INPUT, 100)
  },

  /**
   * Entering data tests
   */
   'Enter valid numbers' : function (browser) {
     browser
       .url(__dirname + '\\..\\..\\index.html')
       // Value - 100
       .setValue(INPUT, '100')
       .assert.value(INPUT, '100')
       // Value - 1,000
       .setValue(INPUT, '0')
       .assert.value(INPUT, '1,000')
       // Value - 100,000
       .setValue(INPUT, '00')
       .assert.value(INPUT, '100,000')
       // Value - 1,000,000
       .setValue(INPUT, '0')
       .assert.value(INPUT, '1,000,000')


       .end();
   },
};
