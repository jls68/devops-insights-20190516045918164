
(function () {

	'use strict';

	var webdriver = require('selenium-webdriver');
	var By = require('selenium-webdriver').By;
	var until = require('selenium-webdriver').until;
	var assert = require('assert');
	var sauceLabs = require('saucelabs');
    
	var SAUCELABSURL = 'http://ondemand.saucelabs.com:80/wd/hub';
	var DEMODRAURL = 'https://demodratest.mybluemix.net/#/';

	var driver = new webdriver.Builder().
        			usingServer(SAUCELABSURL).
        			withCapabilities(
        				{
        					browserName: 'Firefox',
        					platform: 'Windows XP',
        					name: 'Current Weather Report check',
        					tags: ["demodra"],
        					build: '1.1.0',
        					username: process.env.SAUCE_USERNAME,
        					accessKey: process.env.SAUCE_ACCESS_KEY
    					}
    				).build();

  var saucelab = new sauceLabs({
          username: process.env.SAUCE_USERNAME,
          password: process.env.SAUCE_ACCESS_KEY
        });

	describe('Test current weather report', function() {

    before(function(done) {
      driver.get(DEMODRAURL);
      done();
    });

		it("check report title", function(done) {
      driver.get(DEMODRAURL).then(function() {
        driver.getTitle().then(function(title) {
          assert.equal(title, 'DemoDRA - Current Weather');
          done();
        });
      });
    });

    it("Check for town4 element", function(done) {
      driver.isElementPresent(webdriver.By.id('town4')).then(function(present) {
        assert.equal(present, true);
        done();
      });
    });

    it("Check for Weather text", function(done) {
      driver.findElement(webdriver.By.id('weather')).getText().then(function(text) {
        assert.equal(text, "Weather");
        done();
      });
    });

    it("Enter city name and check output - 1", function(done) {
      driver.findElement(webdriver.By.id('town1')).sendKeys('Auckland');
      driver.findElement(webdriver.By.id('town1city')).getText().then(function(text) {
        assert.equal(text, ' Auckland');
        done();
      });
    });

    it("Enter city name and check output - 2", function(done) {
      driver.findElement(webdriver.By.id('town4')).sendKeys('Taupo');
      driver.findElement(webdriver.By.id('town4city')).getText().then(function(text) {
        assert.equal(text, ' Taupo');
        done();
      });
    });

    after(function(done) {
      driver.getSession().then(function(session) {
        var jobId = session.getId();
        //console.log(jobId);
        driver.quit();
        saucelab.stopJob(jobId, {}, function(){});
        done();
      });
    });

	});;
}());
