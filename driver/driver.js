/*
      Anthony Krivonos
      Producer Request Automator
      10/03/2017
      /driver/driver.js
*/

// Imports
const webdriverio = require('webdriverio');

// Config
const OPTIONS = { desiredCapabilities: { browserName: 'firefox' } };

// Client Class

function Client (url, username = null, password = null) {
      console.log("Created new Driver Client");
      var env = this, authUrl;

      // Authentication
      if (username && password) authUrl = `${url.substring(0, url.indexOf('://') + 3)}${username}:${password}@${url.substring(url.indexOf('://') + 3)}`;

      return webdriverio.remote(OPTIONS).init().url(authUrl || url);
}

module.exports = {
      Client
};
