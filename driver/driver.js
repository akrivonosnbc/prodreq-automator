/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /driver/driver.js
*/

// Imports
const webdriverio = require('webdriverio');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;

chai.use(chaiWebdriver(webdriverio));

// Config
const OPTIONS = { desiredCapabilities: { browserName: 'chrome' } };
//const URL = "https://stgconnect.inbcu.com/sites/bcast_prodreq/";
const URL = "https://qatest.stgconnect.inbcu.com/sites/bcast_prodreq/Pages/producer-dashboard.aspx";

// Client Class
function Client (url = null, username = null, password = null) {
      if (url == null) url = URL;
      console.log(`Created new Driver Client with URL ${url}`);
      var env = this, authUrl;

      // Authentication
      if (username && password) authUrl = `${url.substring(0, url.indexOf('://') + 3)}${username}:${password}@${url.substring(url.indexOf('://') + 3)}`;

      return webdriverio.remote(OPTIONS).init().url(authUrl || url);
}

module.exports = {
      Client
};
