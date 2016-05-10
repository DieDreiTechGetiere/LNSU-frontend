module.exports = {
  'try to log in' : function (browser) {
    browser
      .url('http://lnsu-frontend.local')
      .waitForElementVisible('#signinView', 1000)
      .setValue('#login_name', 'niklas')
      .setValue('#password', 'maier')
      .click('input[type=submit]')
      .click('.button')
      .waitForElementVisible('#dashboardView', 10000)
      .assert.urlEquals('http://lnsu-frontend.local/#dashboard')
  },
  
  
  'dashboard specific tests as none admin user': function(browser) {
    browser
      .assert.cssClassNotPresent('.logo_flipper', "admin")
      .moveToElement('.logo_flipper',2,2, function() {
          browser.assert.cssClassNotPresent('.logo_flipper', "hoverLogo")
       })
       .pause(500)
  },
  
  
  'logout as none admin - relogin as admin user': function(browser) {
    browser
      .click(".profile_picture")
      .waitForElementVisible('#signinView', 5000)
      .setValue('#login_name', 'h')
      .setValue('#password', 'h')
      .click('input[type=submit]')
      .click('.button')
      .waitForElementVisible('#dashboardView', 10000)
      .assert.urlEquals('http://lnsu-frontend.local/#dashboard')
      .assert.cssClassPresent('.logo_flipper', "admin")
      .moveToElement('.logo_flipper',2,2, function() {
          browser.assert.cssClassPresent('.logo_flipper', "hoverLogo")
      })
  },
  
  'dashboard specific admin tests (admin section)': function(browser) {
    browser
      .pause(1000)
      .click('.admin_link')
      .click('.admin_link')
      .waitForElementVisible("#adminView", 5000)
      .pause(1100);
      
    browser.expect.element('.admin_region').to.have.css('top').which.equals('50px');
    browser.click(".close");
    browser.expect.element('#adminView').to.not.be.present.before(1200);
    browser.end();
  }
};