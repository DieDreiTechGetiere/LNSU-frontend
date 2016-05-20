/**
 * setup:
 * 
 * download latest selenium server .jar file
 * npm install -g nightwatch
 * npm install -g chromedriver  (firefox comes per default with selenium)
 * 
 * 
 * 
 * start selenium:
 * cd/to/selenium.jar
 * java -jar selenium-server-standalone-{VERSION}.jar
 *
 *
 * start tests
 * cd/to/nightwatch.js
 * (node) nightwatch
 * 
 * or to use different browser/environment
 * nightwatch -e chrome
 *
 */

module.exports = {
  'trying to log in' : function (browser) 
  {
    browser
      .url('http://lnsu-frontend.local')
      .waitForElementVisible('#signinView', 1000)
      .setValue('#login_name', 'niklas')
      .setValue('#password', 'maier')
      .click('input[type=submit]')
      .click('.button')
      .waitForElementVisible('#dashboardView', 10000)
      .assert.urlEquals('http://lnsu-frontend.local/#dashboard');
  },


  'dashboard specific tests as none admin user': function(browser) 
  {
    browser
      .assert.cssClassNotPresent('.logo_flipper', "admin")
      .moveToElement('.logo_flipper',2,2, function() {
          browser.assert.cssClassNotPresent('.logo_flipper', "hoverLogo")
       })
       .pause(500);
  },


  'logout as none admin - relogin as admin user': function(browser) 
  {
    browser
      .pause(300)
      .click(".profile_picture")
      .waitForElementVisible('#signinView', 5000)
      .setValue('#login_name', 'h')
      .setValue('#password', 'h')
      .click('input[type=submit]')
      .click('.button')
      .waitForElementVisible('#dashboardView', 10000)
      .assert.urlEquals('http://lnsu-frontend.local/#dashboard')
      .assert.cssClassPresent('.logo_flipper', "admin")
      .moveToElement('.logo_flipper',20,20, function() {
          browser.pause(300);
          browser.assert.attributeEquals(".logo_flipper", "class", "logo_flipper admin hoverLogo");
      });
  },

  'dashboard specific admin tests (admin section)': function(browser) 
  {
    browser
      .pause(1000)
      .click('.admin_link')
      .click('.admin_link')
      .waitForElementVisible("#adminView", 5000);
      
    browser.assert.urlEquals('http://lnsu-frontend.local/#dashboard/admin');
    browser.expect.element('.admin_region').to.have.css('top').which.equals('50px').before(1200);
    browser.expect.element(".inactive_user").to.have.attribute("data-userid");
    browser.click(".inactive_user");
    browser.assert.attributeEquals(".inactive_user", "class", "inactive_user activate");
    browser.pause(300);
    //2px solid #bc4a77
    browser.expect.element('.inactive_user.activate').to.have.css('outlineColor').which.equals('rgba(188, 74, 119, 1)');
    browser.pause(300);
    browser.click(".close");
    browser.expect.element('#adminView').to.not.be.present.before(1200);
  },

  'dashboard playersearch tests': function(browser) 
  {
    browser.expect.element('.play_btn').to.be.present;
    browser.click(".play_btn");
    browser.assert.attributeEquals(".play_bg", "class", "play_bg animating");
    browser.pause(500);
    browser.click(".play_btn");
    browser.assert.attributeEquals(".play_bg", "class", "play_bg");
    browser.pause(500);
  },
  
  'reload when already logged in and test if you jump immediately to #dashboard': function(browser) 
  {
    browser
      .url('http://lnsu-frontend.local')
      .waitForElementVisible('#dashboardView', 1000)
      .assert.urlEquals('http://lnsu-frontend.local/#dashboard')
      .pause(200);
  },
  
  'user finds a match': function(browser) 
  {
    //create a game in DB
    browser.expect.element('.play_btn').to.be.present.before(500);
    browser
      .click(".play_btn")
      .pause(200);
    //reload and find previously created game
    browser
      .url('http://lnsu-frontend.local')
      .waitForElementVisible('#playerSearchView', 1000)
      .click(".play_btn")
      .waitForElementVisible('#matchView', 1000)
      .assert.urlEquals('http://lnsu-frontend.local/#match');
  },
  
  'tests for placement-phase explain overlay': function(browser) 
  {
    browser.expect.element('#overlay_region').to.have.css('display').which.equals('block').before(300);
    browser.expect.element("#howToPlay").to.be.present;
    browser.click(".overlay_close_icon");
    browser.expect.element("#howToPlay").to.not.be.present.before(200);
    browser.expect.element('#overlay_region').to.have.css('display').which.equals('none').before(300);
  },
  
  'drag and drop a ship onto the grid (valid)': function(browser) 
  {
    browser
      .moveToElement("#ship_4",  5,  5)
      .mouseButtonDown(0)
      .moveToElement("#gridView",  300,  500) // Move to offset position of 200(x) 600(y)
      .mouseButtonUp(0)
      
    browser.expect.element("#ship_4").to.have.css("top").which.equals("450px").before(200);
    browser.expect.element("#ship_4").to.have.css("left").which.equals("-630px").before(200);
  },
  
  'drag and drop a ship outside of the grid (not valid)': function(browser) 
  {
    browser
      .moveToElement('#ship_3',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  -61,  -61)
      .mouseButtonUp(0)
      
    browser.expect.element("#ship_3").to.have.css("top").which.equals("30px").before(200);
    browser.expect.element("#ship_3").to.have.css("left").which.equals("-30px").before(200);
  },
  
  'trying to turn a ship and turn back': function(browser) 
  {
    browser
      .moveToElement('#ship_9',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  120,  120) // Move to offset position of 200(x) 600(y)
      .mouseButtonUp(0)
      .moveToElement('#ship_9',  5,  5)
      .mouseButtonClick('right')
      
    browser.expect.element("#ship_9").to.have.css("width").which.equals("60px").before(200);
    browser.expect.element("#ship_9").to.have.css("height").which.equals("180px").before(200);
    browser.expect.element("#ship_9").to.have.css("top").which.equals("90px").before(200);
    browser.expect.element("#ship_9").to.have.css("left").which.equals("-810px").before(200);
    
    browser
      .moveToElement('#ship_9',  5,  5)
      .mouseButtonClick('right')
    
    browser.expect.element("#ship_9").to.have.css("width").which.equals("180px").before(200);
    browser.expect.element("#ship_9").to.have.css("height").which.equals("60px").before(200);
    browser.expect.element("#ship_9").to.have.css("top").which.equals("90px").before(200);
    browser.expect.element("#ship_9").to.have.css("left").which.equals("-810px").before(200);
  },
  
  'ship validation, turn ship into another and expect it to shift back to its original position': function(browser)
  {
    browser
      .moveToElement('#ship_10',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  120,  240)
      .mouseButtonUp(0)
      .moveToElement('#ship_9',  5,  5)
      .mouseButtonClick('right')
    
    browser.expect.element("#ship_9").to.have.css("width").which.equals("180px").before(600);
    browser.expect.element("#ship_9").to.have.css("height").which.equals("60px").before(600);
    browser.expect.element("#ship_9").to.have.css("top").which.equals("270px").before(700);
    browser.expect.element("#ship_9").to.have.css("left").which.equals("-30px").before(700);
  }, 
  
  'ship validation, place ship half inside the grid, half outside the grid and expect it to shift back': function(browser)
  {
    browser
      .moveToElement('#ship_9',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  610,  310) 
      .mouseButtonUp(0)
      
    browser.expect.element("#ship_9").to.have.css("top").which.equals("270px").before(700);
    browser.expect.element("#ship_9").to.have.css("left").which.equals("-30px").before(700);
  },
  
  'ship validation, turn a valid ship outside the grid': function(browser)
  {
    browser
      .moveToElement('#ship_10',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  125,  550)
      .mouseButtonUp(0)
      .moveToElement('#ship_10',  5,  5)
      .mouseButtonClick('right')
    
    browser.expect.element("#ship_10").to.have.css("top").which.equals("390px").before(700);
    browser.expect.element("#ship_10").to.have.css("left").which.equals("-30px").before(700);
    browser.expect.element("#ship_10").to.have.css("width").which.equals("240px").before(600);
    browser.expect.element("#ship_10").to.have.css("height").which.equals("60px").before(600);
  },
  
  'ship validation, trying to place one ship over the other': function(browser)
  {
    browser
      .moveToElement('#ship_4',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  542,  122) 
      .mouseButtonUp(0)
      .moveToElement('#ship_3',  5,  5)
      .mouseButtonDown(0)
      .moveToElement('#gridView',  542,  122)
      .mouseButtonUp(0)
    
    browser.expect.element("#ship_3").to.have.css("top").which.equals("-30px").before(700);
    browser.expect.element("#ship_3").to.have.css("left").which.equals("-390px").before(700);
  },
    
  'placement phase, click save ships button before all ships are placed and expect warning overlay': function(browser)
  {
    browser.click(".save_ships");
    browser.expect.element("#overlay_region").to.have.css("display").which.equals("block").before(200);
    browser.expect.element("#placeAllShips").to.be.present.before(100);
    browser.click(".overlay_close_icon");
    browser.expect.element("#placeAllShips").to.not.be.present.before(100);
    browser.expect.element("#overlay_region").to.have.css("display").which.equals("none").before(200);
  },
  
  'trying to leave #placements/#match route, and expect warning overlay that you are about to leave your match': function(browser)
  {
    browser.execute(function () {
      window.history.back();
    });
    
    browser.expect.element("#overlay_region").to.have.css("display").which.equals("block").before(200);
    browser.expect.element("#leaveMatchWarning").to.be.present.before(100);
    browser.click(".interrupt");
    browser.expect.element("#leaveMatchWarning").to.not.be.present.before(100);
    browser.expect.element("#overlay_region").to.have.css("display").which.equals("none").before(200);
    
    //browser.pause(100000);
    
    browser.end();
  }
};